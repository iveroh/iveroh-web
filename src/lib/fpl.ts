export type FantasyPosition = "GKP" | "DEF" | "MID" | "FWD";

export interface FantasyPlayer {
    id: number;
    code: number;
    name: string;
    position: FantasyPosition;
    clubId: number;
    clubName: string;
    clubShortName: string;
    clubCode: number;
    points: number;
    totalPoints: number;
    minutes: number;
    goals: number;
    assists: number;
    isCaptain: boolean;
    isViceCaptain: boolean;
    multiplier: number;
}

export interface FantasyChip {
    name: string;
    gameweek: number;
}

export interface FantasyTeamData {
    gameweek: number;
    currentGameweek: number;
    teamName: string;
    managerName: string;
    activeChip: string | null;
    averageScore: number | null;
    highestScore: number | null;
    summary: {
        points: number;
        overallRank: number;
        gameweekRank: number | null;
        transfers: number;
        transferCost: number;
        benchPoints: number;
        totalPoints: number;
        value: number;
        bank: number;
    };
    season: {
        totalPoints: number;
        overallRank: number;
    };
    chips: FantasyChip[];
    startingXI: FantasyPlayer[];
    bench: FantasyPlayer[];
}

const CURRENT_PHOTO_URL = "https://resources.premierleague.com/premierleague25/photos/players/110x140";
const LEGACY_PHOTO_URL = "https://resources.premierleague.com/premierleague/photos/players/110x140";

// The Premier League moves player photos to a new folder each season and doesn't backfill
// new signings, so try the current location first and the legacy one second.
export function getPlayerPhotoUrls(code: number): string[] {
    return [`${CURRENT_PHOTO_URL}/${code}.png`, `${LEGACY_PHOTO_URL}/p${code}.png`];
}

export const CHIP_LABELS: Record<string, string> = {
    wildcard: "Wildcard",
    freehit: "Free Hit",
    bboost: "Bench Boost",
    "3xc": "Triple Captain",
    manager: "Assistant Manager",
};

export async function fetchFantasyTeam(signal?: AbortSignal, gameweek?: number): Promise<FantasyTeamData> {
    const query = gameweek ? `?event=${gameweek}` : "";
    const response = await fetch(`/api/fpl-team${query}`, { signal });

    if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to load the FPL team.");
    }

    return response.json() as Promise<FantasyTeamData>;
}
