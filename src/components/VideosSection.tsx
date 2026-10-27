const VIDEO_ID = "ujkD4SxPKOI";

export default function VideoSection () {
    return (
        <section id="videos" className="relative z-20 flex min-h-screen w-full scroll-mt-4 items-center justify-center bg-gray-50 px-4 py-20 text-brand-dark md:scroll-mt-4 md:px-8">
            <div className="grid w-full max-w-6xl items-center gap-8 md:grid-cols-5 md:gap-12">
                <div className="text-center md:col-span-2 md:text-left">
                    <span className="inline-block rounded-full bg-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Coming soon</span>
                    <h2 className="mt-4 font-kudryashev-headline text-4xl font-bold leading-tight text-black md:text-5xl">MY VIDEOS</h2>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-light md:mx-0" />
                    <p className="mt-5 text-lg leading-relaxed text-brand-dark/80">
                        My own videos are on their way. In the meantime, here is an interesting video you can watch.
                    </p>
                    <a
                        href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-brand-light px-5 py-2 text-sm font-bold uppercase text-brand transition hover:bg-brand-light hover:text-white"
                    >
                        Watch on YouTube <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <figure className="md:col-span-3">
                    <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-brand-light/40 bg-brand-dark shadow-xl">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
                            title="AI Just Crossed the Terrifying Line - Now What? by Kurzgesagt"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="h-full w-full"
                        />
                    </div>
                    <figcaption className="mt-3 text-center text-sm text-brand-dark/60 md:text-left">
                        Kurzgesagt – In a Nutshell: “AI Just Crossed the Terrifying Line - Now What?”
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
