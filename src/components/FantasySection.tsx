import { useEffect, useState } from "react";
import type { FantasyTeamData } from "../lib/fpl";
import { CHIP_LABELS, fetchFantasyTeam } from "../lib/fpl";
import FantasyPitch from "./FantasyPitch";
import FantasyPlayer from "./FantasyPlayer";

const numberFormat = new Intl.NumberFormat("en-GB");

function formatNumber(value: number) {
    return numberFormat.format(value);
}

function formatMoney(value: number) {
    return `£${value.toFixed(1)}m`;
}

interface StatProps {
    label: string;
    value: string;
    detail?: string;
    highlight?: boolean;
}

function Stat({ label, value, detail, highlight }: StatProps) {
    return (
        <div className={`rounded-lg border px-2 py-2 text-center shadow-sm sm:px-3 sm:py-3 ${highlight ? "border-brand-dark bg-brand-dark text-white" : "border-brand-light/40 bg-white"}`}>
            <dt className={`text-[10px] font-semibold uppercase tracking-wide sm:text-[11px] ${highlight ? "text-brand-light" : "text-brand"}`}>{label}</dt>
            <dd className={`mt-1 font-bold leading-none ${highlight ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>{value}</dd>
            {detail && <p className={`mt-1 text-[10px] sm:text-[11px] ${highlight ? "text-white/70" : "text-gray-500"}`}>{detail}</p>}
        </div>
    );
}

export default function FantasySection() {
    const [team, setTeam] = useState<FantasyTeamData | null>(null);
    const [selectedGameweek, setSelectedGameweek] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        fetchFantasyTeam(controller.signal, selectedGameweek)
            .then((data) => {
                setTeam(data);
                setError(null);
                setLoading(false);
            })
            .catch((loadError: unknown) => {
                if (loadError instanceof DOMException && loadError.name === "AbortError") return;
                setError(loadError instanceof Error ? loadError.message : "Unable to load the FPL team.");
                setLoading(false);
            });

        return () => controller.abort();
    }, [selectedGameweek]);

    const goToGameweek = (gameweek: number) => {
        if (!team || gameweek < 1 || gameweek > team.currentGameweek) return;
        setSelectedGameweek(gameweek === team.currentGameweek ? undefined : gameweek);
    };

    const pointsDelta = team && team.averageScore !== null ? team.summary.points - team.averageScore : null;
    const isLatest = team ? team.gameweek === team.currentGameweek : true;
    const navButtonClass = "rounded-full border-2 border-brand-light px-3 py-1.5 text-sm font-bold uppercase text-brand transition enabled:hover:bg-brand-light enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:px-4";

    return (
        <section id="fpl-team" className="relative z-20 scroll-mt-16 bg-gray-50 px-4 py-6 text-brand-dark md:scroll-mt-24 md:px-8">
            <div className="mx-auto w-full max-w-4xl">
                {team && (
                    <>
                        <header className="mb-3 text-center">
                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">Fantasy Premier League</p>
                            <h2 className="font-kudryashev-headline text-3xl font-bold uppercase leading-tight">{team.teamName}</h2>
                        </header>
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <button type="button" onClick={() => goToGameweek(team.gameweek - 1)} disabled={team.gameweek <= 1} aria-label="Previous gameweek" className={navButtonClass}>
                                ‹ Prev
                            </button>
                            <div className="text-center">
                                <p className="font-kudryashev-headline text-2xl font-bold uppercase">Gameweek {team.gameweek}</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {!isLatest && (
                                        <button type="button" onClick={() => setSelectedGameweek(undefined)} className="text-xs font-semibold uppercase text-brand-light underline">
                                            Back to latest
                                        </button>
                                    )}
                                    {team.activeChip && (
                                        <span className="rounded-full bg-brand-accent px-2.5 py-0.5 text-xs font-bold uppercase text-white">
                                            {CHIP_LABELS[team.activeChip] ?? team.activeChip}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button type="button" onClick={() => goToGameweek(team.gameweek + 1)} disabled={isLatest} aria-label="Next gameweek" className={navButtonClass}>
                                Next ›
                            </button>
                        </div>

                        <dl className={`mb-3 grid grid-cols-[1fr_1.25fr_1fr] items-center gap-2 transition-opacity sm:gap-3 ${loading ? "opacity-50" : ""}`}>
                            <Stat label="Total points" value={formatNumber(team.summary.totalPoints)} />
                            <Stat
                                label="GW points"
                                value={String(team.summary.points)}
                                detail={pointsDelta !== null ? `${pointsDelta >= 0 ? "+" : ""}${Math.round(pointsDelta)} vs avg ${team.averageScore}` : undefined}
                                highlight
                            />
                            <Stat label="Overall rank" value={formatNumber(team.summary.overallRank)} />
                        </dl>

                        <div className={`transition-opacity ${loading ? "opacity-50" : ""}`}>
                            <FantasyPitch players={team.startingXI} />
                            <div className="mx-auto mt-4 max-w-2xl rounded-lg border border-brand-light/40 bg-white px-2 pb-3 pt-2 shadow-sm">
                                <h3 className="mb-2 text-center font-kudryashev-headline text-xl font-bold text-black">BENCH</h3>
                                <div className="flex justify-center gap-2 sm:gap-5">
                                    {team.bench.map((player) => <FantasyPlayer key={player.id} player={player} />)}
                                </div>
                            </div>
                        </div>

                        <dl className={`mt-6 grid grid-cols-2 gap-3 transition-opacity sm:grid-cols-4 ${loading ? "opacity-50" : ""}`}>
                            <Stat label="GW rank" value={team.summary.gameweekRank ? formatNumber(team.summary.gameweekRank) : "-"} detail={team.highestScore ? `Top score ${team.highestScore}` : undefined} />
                            <Stat label="Transfers" value={String(team.summary.transfers)} detail={team.summary.transferCost > 0 ? `-${team.summary.transferCost} pt hit` : "No hit"} />
                            <Stat label="Bench points" value={String(team.summary.benchPoints)} />
                            <Stat label="Team value" value={formatMoney(team.summary.value)} detail={`${formatMoney(team.summary.bank)} in the bank`} />
                        </dl>

                        {team.chips.length > 0 && (
                            <div className="mt-4 rounded-lg border border-brand-light/40 bg-white p-4 shadow-sm">
                                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-brand">Chips played</h3>
                                <ul className="space-y-1 text-sm">
                                    {team.chips.map((chip) => (
                                        <li key={`${chip.name}-${chip.gameweek}`}>
                                            <button type="button" onClick={() => goToGameweek(chip.gameweek)} className="flex w-full justify-between text-left hover:text-brand-light">
                                                <span className="font-semibold">{CHIP_LABELS[chip.name] ?? chip.name}</span>
                                                <span className="text-gray-500">GW{chip.gameweek}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}

                {!team && !error && <p className="grid aspect-video place-items-center rounded-lg border-2 border-brand-light bg-brand-dark text-lg font-bold text-white">Loading your FPL team...</p>}
                {error && <p className="rounded-lg border-2 border-brand-accent bg-white p-6 text-center font-semibold text-black">{error} Configure <code>FPL_ENTRY_ID</code> in Vercel, then reload this section.</p>}
            </div>
        </section>
    );
}
