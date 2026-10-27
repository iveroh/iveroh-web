const FPL_API = "https://fantasy.premierleague.com/api";

const positionNames = {
    1: "GKP",
    2: "DEF",
    3: "MID",
    4: "FWD",
};

async function getJson(path) {
    const response = await fetch(`${FPL_API}${path}`);
    if (!response.ok) throw new Error(`FPL responded with ${response.status}.`);
    return response.json();
}

export default async function handler(request, response) {
    const entryId = process.env.FPL_ENTRY_ID;

    if (!entryId) {
        return response.status(500).json({ error: "FPL team ID has not been configured." });
    }

    try {
        const bootstrap = await getJson("/bootstrap-static/");
        const currentEvent = bootstrap.events.find((item) => item.is_current)
            ?? bootstrap.events.find((item) => item.is_next)
            ?? [...bootstrap.events].reverse().find((item) => item.finished);

        if (!currentEvent) throw new Error("No Fantasy Premier League gameweek is available.");

        const requestedId = Number.parseInt(String(request.query?.event ?? ""), 10);
        const isPastRequest = Number.isInteger(requestedId) && requestedId >= 1 && requestedId < currentEvent.id;
        const event = isPastRequest ? bootstrap.events.find((item) => item.id === requestedId) : currentEvent;

        const [entry, history, picksData, liveData, fixtures] = await Promise.all([
            getJson(`/entry/${entryId}/`),
            getJson(`/entry/${entryId}/history/`),
            getJson(`/entry/${entryId}/event/${event.id}/picks/`),
            getJson(`/event/${event.id}/live/`),
            getJson(`/fixtures/?event=${event.id}`),
        ]);

        const playersById = new Map(bootstrap.elements.map((player) => [player.id, player]));
        const teamsById = new Map(bootstrap.teams.map((team) => [team.id, team]));
        const liveById = new Map(liveData.elements.map((player) => [player.id, player]));
        const minutesOf = (pick) => liveById.get(pick.element)?.stats.minutes ?? 0;
        const hasFinishedFixtures = (pick) => fixtures
            .filter((fixture) => fixture.team_h === playersById.get(pick.element).team || fixture.team_a === playersById.get(pick.element).team)
            .every((fixture) => fixture.finished || fixture.finished_provisional);

        const picks = [...picksData.picks].sort((first, second) => first.position - second.position);
        const nominalCaptain = picks.find((pick) => pick.is_captain);
        const nominalVice = picks.find((pick) => pick.is_vice_captain);
        // The vice-captain only takes over once the captain's fixtures are over and he never played.
        const captainMissed = nominalCaptain && nominalVice && minutesOf(nominalCaptain) === 0 && hasFinishedFixtures(nominalCaptain);
        const effectiveCaptain = captainMissed ? nominalVice : nominalCaptain;
        const captainMultiplier = picksData.active_chip === "3xc" ? 3 : 2;

        const players = picks.map((pick, index) => {
            const player = playersById.get(pick.element);
            const club = teamsById.get(player.team);
            const stats = liveById.get(pick.element)?.stats ?? {};
            const isCaptain = pick === effectiveCaptain;
            const isStarter = index < 11;
            const multiplier = isCaptain && isStarter ? captainMultiplier : 1;
            const isViceCaptain = captainMissed ? pick === nominalCaptain : pick === nominalVice;

            return {
                id: player.id,
                code: player.code,
                name: player.web_name,
                position: positionNames[player.element_type],
                clubId: player.team,
                clubName: club.name,
                clubShortName: club.short_name,
                clubCode: club.code,
                points: (stats.total_points ?? 0) * multiplier,
                totalPoints: player.total_points,
                minutes: stats.minutes ?? 0,
                goals: stats.goals_scored ?? 0,
                assists: stats.assists ?? 0,
                isCaptain,
                isViceCaptain,
                multiplier,
            };
        });

        const gameweekRank = history.current.find((item) => item.event === event.id)?.rank ?? null;
        const entryHistory = picksData.entry_history;

        response.setHeader(
            "Cache-Control",
            isPastRequest || event.finished ? "s-maxage=3600, stale-while-revalidate=86400" : "s-maxage=60, stale-while-revalidate=300",
        );
        return response.status(200).json({
            gameweek: event.id,
            currentGameweek: currentEvent.id,
            teamName: entry.name,
            managerName: `${entry.player_first_name} ${entry.player_last_name}`.trim(),
            activeChip: picksData.active_chip,
            averageScore: event.average_entry_score ?? null,
            highestScore: event.highest_score ?? null,
            summary: {
                points: entryHistory.points,
                totalPoints: entryHistory.total_points,
                overallRank: entryHistory.overall_rank,
                gameweekRank,
                transfers: entryHistory.event_transfers,
                transferCost: entryHistory.event_transfers_cost,
                benchPoints: entryHistory.points_on_bench,
                value: entryHistory.value / 10,
                bank: entryHistory.bank / 10,
            },
            chips: history.chips.map((chip) => ({ name: chip.name, gameweek: chip.event })),
            startingXI: players.slice(0, 11),
            bench: players.slice(11),
        });
    } catch (error) {
        console.error("Unable to load FPL team", error);
        return response.status(502).json({ error: "Fantasy Premier League data is temporarily unavailable." });
    }
}
