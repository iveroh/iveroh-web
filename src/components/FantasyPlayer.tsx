import { useState } from "react";
import type { FantasyPlayer as FantasyPlayerData } from "../lib/fpl";
import { getPlayerPhotoUrls } from "../lib/fpl";

interface FantasyPlayerProps {
    player: FantasyPlayerData;
}

export default function FantasyPlayer({ player }: FantasyPlayerProps) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const photoUrls = getPlayerPhotoUrls(player.code);
    const photoUrl = photoUrls[photoIndex];
    const marker = player.isCaptain ? "C" : player.isViceCaptain ? "V" : null;
    const didNotPlay = player.minutes === 0;

    return (
        <article
            title={`${player.name} (${player.clubName}) - ${player.points} pts, ${player.minutes} min, ${player.goals} G, ${player.assists} A`}
            className="relative flex min-w-0 w-12 flex-col items-center text-center text-[8px] font-bold leading-none text-brand-dark sm:w-16 sm:text-[10px]"
        >
            {marker && (
                <span className="absolute -left-1 top-0 z-10 grid size-4 place-items-center rounded-full border border-white bg-brand-accent text-[9px] text-white shadow sm:size-5 sm:text-[10px]">
                    {marker}
                </span>
            )}
            <div className="grid h-[3.25rem] w-10 place-items-end sm:h-[4.5rem] sm:w-14">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={player.name}
                        loading="lazy"
                        draggable={false}
                        onError={() => setPhotoIndex((index) => index + 1)}
                        className="h-full w-full object-contain object-bottom drop-shadow-md"
                    />
                ) : (
                    <span
                        aria-label={`${player.name} (no photo available)`}
                        className="mb-1 grid size-9 place-items-center self-center rounded-full border-2 border-white bg-brand text-[10px] text-white sm:size-12 sm:text-sm"
                    >
                        {player.clubShortName}
                    </span>
                )}
            </div>
            <span className="w-full truncate rounded-t-sm bg-white px-1 py-0.5 shadow-sm">{player.name}</span>
            <span className={`w-full rounded-b-sm px-1 py-0.5 text-white ${didNotPlay ? "bg-gray-500" : "bg-brand-dark"}`}>
                {player.points}
            </span>
        </article>
    );
}
