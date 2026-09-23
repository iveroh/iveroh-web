export type FantasyPosition = "GKP" | "DEF" | "MID" | "FWD";

export interface FantasyPlayer {
    id: number;
    name: string;
    position: FantasyPosition;
    clubId: number;
    clubName: string;
    points: number;
    totalPoints: number;
    isCaptain: boolean;
    isViceCaptain: boolean;
    multiplier: number;
}

export interface FantasyTeamData {
    gameweek: number;
    summary: {
        points: number;
        overallRank: number;
        transfers: number;
        benchPoints: number;
    };
    startingXI: FantasyPlayer[];
    bench: FantasyPlayer[];
}

export async function fetchFantasyTeam(signal?: AbortSignal): Promise<FantasyTeamData> {
    const response = await fetch("/api/fpl-team", { signal });

    if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to load the FPL team.");
    }

    return response.json() as Promise<FantasyTeamData>;
}