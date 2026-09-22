const REPOS = [
  {
    name: "iveroh/iveroh-web",
    html_url: "https://github.com/iveroh/iveroh-web",
    description: "My portfolio website.",
    language: "TypeScript",
  },
  {
    name: "iveroh/ac-electric-call",
    html_url: "https://github.com/iveroh/ac-electric-call",
    description: "Airconditioning and electrical company website.",
    language: "TypeScript",
  },
  {
    name: "iveroh/rollcall-event",
    html_url: "https://github.com/iveroh/rollcall-event",
    description: "My bachelor's degree project",
    language: "TypeScript",
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export default function RepositoryDisplay() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
      {REPOS.map((repo) => (
        <a
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/60 border border-gray-600 rounded-md p-4 flex flex-col gap-2 transition-colors duration-300 hover:border-brand-light"
        >
          <div className="flex justify-between items-start gap-25">
            <span className="text-lg text-brand-light hover:underline">{repo.name}</span>
            <span className="text-xs border border-gray-400 rounded-full px-2 py-0.5 text-gray-400">Public</span>
          </div>
          <p className="text-sm text-white min-h-10">{repo.description}</p>
          <div className="flex items-center gap-4 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b949e" }}
              />
              {repo.language}
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}
