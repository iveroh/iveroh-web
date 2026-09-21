const NAV_ITEMS = [
    {
        label: "ABOUT ME",
        href: "",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
        ),
    },
    {
        label: "PROJECTS",
        href: "",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            </svg>
        ),
    },
    {
        label: "FPL TEAM",
        href: "",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 4h10v4a5 5 0 0 1-10 0Z" />
                <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
                <path d="M12 13v4M9 21h6M9.5 17h5l.5 4H9Z" />
            </svg>
        ),
    },
    {
        label: "VIDEOS",
        href: "",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="13" height="12" rx="2" />
                <path d="m16 10 5-3v10l-5-3Z" />
            </svg>
        ),
    },
];

export default function NavigationDesktop() {
    return (
        <div className="h-16 md:h-24 inset-x-6 md:inset-x-12 top-0 fixed z-50 flex flex-row justify-between items-center text-white mix-blend-difference">
            {NAV_ITEMS.map(({ label, href, icon }) => (
                <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="font-kudryashev-headline transition-colors duration-300 hover:text-brand-accent"
                >
                    <span className="block md:hidden w-6 h-6">{icon}</span>
                    <span className="hidden md:block text-4xl">{label}</span>
                </a>
            ))}
        </div>
    );
}
