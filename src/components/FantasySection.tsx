import { useEffect, useState } from "react";
import type { FantasyTeamData } from "../lib/fpl";
import { fetchFantasyTeam } from "../lib/fpl";
import FantasyPitch from "./FantasyPitch";
import FantasyPlayer from "./FantasyPlayer";

function formatRank(rank: number) {
    return new Intl.NumberFormat("en-GB").format(rank);
}

export default function FantasySection() {
    const [team, setTeam] = useState<FantasyTeamData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchFantasyTeam(controller.signal)
            .then(setTeam)
            .catch((loadError: unknown) => {
                if (loadError instanceof DOMException && loadError.name === "AbortError") return;
                setError(loadError instanceof Error ? loadError.message : "Unable to load the FPL team.");
            });

        return () => controller.abort();
    }, []);

    return (
        <section id="fpl-team" className="relative z-10 scroll-mt-16 bg-gray-50 px-4 py-10 text-brand-dark md:scroll-mt-24 md:px-8">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-1">
                    <div className="flex justify-center">
                        {team && <p className="text-4xl font-bold font-kudryashev-headline uppercase mb-5">Gameweek {team.gameweek}</p>}
                    </div>
                    {team && (
                        <dl className="flex gap-5 text-sm uppercase justify-between mb-5">
                            <div><dt className=" text-brand">Overall rank</dt><dd className="text-2xl font-bold text-center">{formatRank(team.summary.overallRank)}</dd></div>
                            <div><dt className=" text-brand">Points</dt><dd className="text-2xl font-bold text-center">{team.summary.points}</dd></div>
                            <div><dt className=" text-brand">Transfers</dt><dd className="text-2xl font-bold text-center">{team.summary.transfers}</dd></div>
                        </dl>
                    )}
                </div>

                {team && (
                    <>
                        <FantasyPitch players={team.startingXI} />
                        <div className="border-t-2 border-brand-light mt-5">
                            <div className="flex items-center justify-center mt-2 mb-2">
                                <h2 className="font-kudryashev-headline text-xl font-bold text-black">BENCH</h2>
                            </div>
                            <div className="flex justify-center gap-2 sm:gap-5">
                                {team.bench.map((player) => <FantasyPlayer key={player.id} player={player} />)}
                            </div>
                        </div>
                    </>
                )}

                {!team && !error && <p className="grid aspect-video place-items-center rounded-lg border-2 border-brand-light bg-brand-dark text-lg font-bold text-white">Loading your FPL team...</p>}
                {error && <p className="rounded-lg border-2 border-brand-accent bg-white p-6 text-center font-semibold text-black">{error} Configure <code>FPL_ENTRY_ID</code> in Vercel, then reload this section.</p>}
            </div>
        </section>
    );
}
