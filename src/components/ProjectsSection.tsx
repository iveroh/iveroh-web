import { useEffect, useRef, useState } from "react";

interface Project {
  title: string;
  type: string;
  description: string;
  image: string;
  href: string;
  technologies: string[];
}

const projects: Project[] = [
  { title: "Rollcall Event", type: "Bachelor project", description: "Event management prototype for safe execution of corporate trips and events.", image: "/photo/projects/rollcall-event.png", href: "https://github.com/iveroh/rollcall-event", technologies: [] },
  { title: "Pintrest", type: "Course project", description: "A social media platform for sharing and celebrating your drinking sessions with friends.", image: "/photo/projects/pintrest.png", href: "https://github.com/iveroh/pintrest", technologies: [] },
  { title: "Iveroh-web", type: "Hobby project", description: "The website you are currently looking at. Display of my projects, interests and experience.", image: "/photo/projects/iveroh-web.png", href: "https://iverheggelund.no", technologies: [] },
  { title: "Animythos", type: "Hobby project", description: "Liberary of animated backgrounds for react applications", image: "/photo/projects/animythos.png", href: "https://github.com/iveroh/animythos", technologies: [] },
  { title: "IT3212 Data Powered Software", type: "Course project", description: "Data analysis, preprocessing, image processing, and machine-learning models", image: "/photo/projects/data-powered-software.png", href: "https://github.com/iveroh/it3212-data-powered-software", technologies: [] },
  { title: "TPD4168 Game Design", type: "Course project", description: "Currently under construction. Game created in Blender and Unity 3D", image: "", href: "https://github.com/iveroh/TPD4168-Game-Design", technologies: [] },
  { title: "", type: "", description: "", image: "", href: "", technologies: [] },
  { title: "", type: "", description: "", image: "", href: "", technologies: [] },
];

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed] as const;
}

const revealClasses = (revealed: boolean) =>
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
  }`;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, revealed] = useRevealOnce<HTMLElement>();
  const delay = { transitionDelay: revealed ? `${(index % 4) * 90}ms` : "0ms" };
  const isEmpty = !project.title;

  if (isEmpty) {
    return (
      <article
        ref={ref}
        style={delay}
        aria-hidden="true"
        className={`flex min-h-96 items-center justify-center rounded-2xl border-2 border-dashed border-brand-light/40 bg-white/40 ${revealClasses(revealed)}`}
      >
        <span className="font-kudryashev-headline text-sm font-bold uppercase tracking-[0.3em] text-brand/40">
          Coming soon
        </span>
      </article>
    );
  }

  const content = (
    <>
      <div className="relative h-48 w-full overflow-hidden bg-brand-dark">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-dark to-brand-light font-kudryashev-headline text-6xl font-bold text-white/80">
            {project.title.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        {project.type && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark backdrop-blur">
            {project.type}
          </span>
        )}
        {project.href && (
          <span className="absolute right-4 top-4 flex h-9 w-9 -translate-x-2 translate-y-2 items-center justify-center rounded-full bg-brand-accent text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
            <ArrowIcon />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-kudryashev-headline text-2xl font-bold leading-tight text-black">
          <span className="bg-linear-to-r from-brand-light to-brand-light bg-[length:0%_2px] bg-bottom-left bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px] motion-reduce:transition-none">
            {project.title}
          </span>
        </h3>
        {project.description && <p className="text-sm leading-relaxed text-brand-dark/80">{project.description}</p>}
        {project.technologies.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full bg-brand-dark/10 px-3 py-1 text-xs font-medium text-brand-dark transition-colors duration-300 group-hover:bg-brand-light/20"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  const cardClasses = `group flex min-h-96 flex-col overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-sm transition-[translate,scale,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:border-brand-light hover:shadow-2xl hover:shadow-brand-dark/20 focus-visible:-translate-y-2 focus-visible:scale-[1.03] focus-visible:border-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100`;

  return (
    <article ref={ref} style={delay} className={revealClasses(revealed)}>
      {project.href ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className={`${cardClasses} h-full`}>
          {content}
        </a>
      ) : (
        <div className={`${cardClasses} h-full`}>{content}</div>
      )}
    </article>
  );
}

export default function ProjectSection() {
  const [headerRef, headerRevealed] = useRevealOnce<HTMLDivElement>();

  return (
    <section
      id="projects"
      className="relative z-20 flex min-h-screen w-full flex-col items-center gap-12 bg-gray-50 px-4 pb-24 pt-28 text-brand-dark md:gap-16 md:px-8 md:pt-30"
    >
      <div ref={headerRef} className={`flex flex-col items-center gap-4 ${revealClasses(headerRevealed)}`}>
        <h2 className="font-kudryashev-headline text-4xl font-bold text-black md:text-5xl">PROJECTS</h2>
        <span
          className={`h-1 rounded-full bg-brand-accent transition-[width] delay-300 duration-700 ease-out motion-reduce:transition-none ${
            headerRevealed ? "w-24" : "w-0"
          }`}
        />
      </div>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}