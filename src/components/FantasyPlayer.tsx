import type { FantasyPlayer as FantasyPlayerData } from "../lib/fpl";

interface FantasyPlayerProps {
    player: FantasyPlayerData;
}

const KIT_COLORS: Record<number, string> = {
    1: "#ef0107",
    2: "#1f6f4a",
    3: "#6cabdd",
    4: "#0044aa",
    5: "#034694",
    6: "#003399",
    7: "#c8102e",
    8: "#ffcd00",
    9: "#e30613",
    10: "#da020e",
    11: "#e31b23",
    12: "#ffffff",
    13: "#2d5f9e",
    14: "#d00027",
    15: "#6c1d45",
    16: "#fdb913",
    17: "#0053a0",
    18: "#000000",
    19: "#d71920",
    20: "#1b458f",
};

export default function FantasyPlayer({ player }: FantasyPlayerProps) {
    const marker = player.isCaptain ? "C" : player.isViceCaptain ? "V" : null;

    return (
        <article className="relative flex min-w-0 w-12 flex-col items-center text-center text-[8px] font-bold leading-none text-brand-dark sm:w-16 sm:text-[10px]">
            {marker && (
                <span className="absolute -left-1 -top-1 grid size-4 place-items-center rounded-full bg-brand-dark text-[9px] text-white">
                    {marker}
                </span>
            )}
            <div
                aria-label={`${player.clubName} kit`}
                className="h-9 w-8 border-2 border-white shadow-sm sm:h-12 sm:w-10"
                style={{
                    backgroundColor: KIT_COLORS[player.clubId] ?? "#44a1a4",
                    clipPath: "polygon(22% 0, 38% 9%, 62% 9%, 78% 0, 100% 24%, 81% 42%, 75% 100%, 25% 100%, 19% 42%, 0 24%)",
                }}
            />
            <span className="mt-1 w-full truncate bg-white px-1 py-0.5">{player.name}</span>
            <span className="w-full bg-brand-dark px-1 py-0.5 text-white">{player.points}</span>
        </article>
    );
}