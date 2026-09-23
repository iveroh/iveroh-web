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
        const event = bootstrap.events.find((item) => item.is_current)
            ?? bootstrap.events.find((item) => item.is_next)
            ?? [...bootstrap.events].reverse().find((item) => item.finished);

        if (!event) throw new Error("No Fantasy Premier League gameweek is available.");

        const [picksData, liveData] = await Promise.all([
            getJson(`/entry/${entryId}/event/${event.id}/picks/`),
            getJson(`/event/${event.id}/live/`),
        ]);

        const playersById = new Map(bootstrap.elements.map((player) => [player.id, player]));
        const teamsById = new Map(bootstrap.teams.map((team) => [team.id, team]));
        const liveById = new Map(liveData.elements.map((player) => [player.id, player]));
        const players = picksData.picks
            .sort((first, second) => first.position - second.position)
            .map((pick) => {
                const player = playersById.get(pick.element);
                const club = teamsById.get(player.team);
                const live = liveById.get(pick.element);

                return {
                    id: player.id,
                    name: player.web_name,
                    position: positionNames[player.element_type],
                    clubId: player.team,
                    clubName: club.name,
                    points: live?.stats.total_points ?? 0,
                    totalPoints: player.total_points,
                    isCaptain: pick.is_captain,
                    isViceCaptain: pick.is_vice_captain,
                    multiplier: pick.multiplier,
                };
            });

        response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
        return response.status(200).json({
            gameweek: event.id,
            summary: {
                points: picksData.entry_history.points,
                overallRank: picksData.entry_history.overall_rank,
                transfers: picksData.entry_history.event_transfers,
                benchPoints: picksData.entry_history.points_on_bench,
            },
            startingXI: players.slice(0, 11),
            bench: players.slice(11),
        });
    } catch (error) {
        console.error("Unable to load FPL team", error);
        return response.status(502).json({ error: "Fantasy Premier League data is temporarily unavailable." });
    }
}