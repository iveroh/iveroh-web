import type { FantasyPlayer as FantasyPlayerData, FantasyPosition } from "../lib/fpl";
import FantasyPlayer from "./FantasyPlayer";

interface FantasyPitchProps {
    players: FantasyPlayerData[];
}

const ROWS: Array<{ position: FantasyPosition; top: string }> = [
    { position: "GKP", top: "11%" },
    { position: "DEF", top: "33%" },
    { position: "MID", top: "55%" },
    { position: "FWD", top: "76%" },
];

export default function FantasyPitch({ players }: FantasyPitchProps) {
    return (
        <div className="relative mx-auto min-w-0 w-full max-w-2xl overflow-hidden rounded-lg border-2 border-brand-light shadow-lg sm:border-4">
            <img
                src="/photo/football-pitch.jpg"
                alt="Fantasy football pitch"
                className="relative block h-auto w-full"
            />
            {ROWS.map(({ position, top }) => {
                const rowPlayers = players.filter((player) => player.position === position);

                if (rowPlayers.length === 0) return null;

                return (
                    <div
                        key={position}
                        className="absolute left-[4%] right-[4%] flex min-w-0 justify-around sm:left-[8%] sm:right-[8%]"
                        style={{ top }}
                    >
                        {rowPlayers.map((player) => <FantasyPlayer key={player.id} player={player} />)}
                    </div>
                );
            })}
        </div>
    );
}