import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from "react";

interface Project {
  title: string;
  description: string;
  image?: string;
  href?: string;
  technologies?: Technology[];
}

interface Technology {
  name: string;
  href: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    title: "iveroh-web",
    description: "This website.",
    image: "/photo/projects/iveroh-web.png",
    href: "https://github.com/iveroh/iveroh-web",
    technologies: [
      { name: "React", href: "https://react.dev/", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", href: "https://www.typescriptlang.org/", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Vite", href: "https://vite.dev/", icon: "https://cdn.simpleicons.org/vite/646CFF" },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Expo", href: "", icon: "" }
    ],
  },
  {
    title: "rollcall-event",
    description: "Prototype event management system for real-time participant check-in, oversight, and safe execution of corporate trips and events.",
    image: "/photo/projects/rollcall-event.png",
    href: "https://github.com/iveroh/rollcall-event",
    technologies: [
      { name: "React", href: "https://react.dev/", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", href: "https://www.typescriptlang.org/", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    ],
  },
  { title: "", description: "" },
  { title: "", description: "" },
];

export default function ProjectsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isArrowMoving, setIsArrowMoving] = useState(false);
  const offsetRef = useRef(0);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragStartOffset = useRef(0);
  const isHorizontalDrag = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  const arrowTimer = useRef<number | null>(null);
  const isHovered = useRef(false);
  const slides = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const updateDimensions = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const nextVisibleCards = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 5;
      const nextCardWidth = viewport.clientWidth / nextVisibleCards;
      setCardWidth(nextCardWidth);
      offsetRef.current = -nextCardWidth * PROJECTS.length;
      setOffset(offsetRef.current);
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - previousTime;
      previousTime = time;

      if (!isPaused && cardWidth > 0) {
        offsetRef.current = wrapOffset(offsetRef.current - elapsed * 0.035);
        setOffset(offsetRef.current);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [cardWidth, isPaused]);

  const wrapOffset = (value: number) => {
    const setWidth = cardWidth * PROJECTS.length;
    if (setWidth === 0) return value;

    let nextOffset = value;
    while (nextOffset <= -setWidth * 2) nextOffset += setWidth;
    while (nextOffset > -setWidth) nextOffset -= setWidth;
    return nextOffset;
  };

  const move = (direction: number) => {
    const nextOffset = wrapOffset(offsetRef.current - direction * cardWidth);
    setIsPaused(true);
    setIsArrowMoving(true);
    offsetRef.current = nextOffset;
    setOffset(nextOffset);

    if (arrowTimer.current !== null) window.clearTimeout(arrowTimer.current);
    arrowTimer.current = window.setTimeout(() => {
      setIsArrowMoving(false);
      setIsPaused(false);
    }, 550);
  };

  const pauseForInteraction = () => {
    setIsPaused(true);
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
  };

  const resumeAfterInteraction = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);

    if (isHovered.current) return;

    resumeTimer.current = window.setTimeout(() => setIsPaused(false), 800);
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    pauseForInteraction();
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    setIsPaused(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pauseForInteraction();
    setIsDragging(true);
    dragStartX.current = event.clientX;
    dragStartY.current = event.clientY;
    isHorizontalDrag.current = false;
    dragStartOffset.current = offsetRef.current;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const distance = event.clientX - dragStartX.current;
    const verticalDistance = event.clientY - (dragStartY.current ?? event.clientY);

    if (!isHorizontalDrag.current && Math.abs(distance) < 8 && Math.abs(verticalDistance) < 8) return;
    if (!isHorizontalDrag.current) {
      if (Math.abs(verticalDistance) > Math.abs(distance)) return;
      isHorizontalDrag.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    offsetRef.current = wrapOffset(dragStartOffset.current + distance);
    setOffset(offsetRef.current);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    dragStartX.current = null;
    dragStartY.current = null;
    isHorizontalDrag.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resumeAfterInteraction();
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const horizontalDistance = Math.abs(event.deltaX);
    const verticalDistance = Math.abs(event.deltaY);
    const isHorizontalScroll = horizontalDistance > verticalDistance || event.shiftKey;

    if (!isHorizontalScroll) return;

    event.preventDefault();
    pauseForInteraction();
    const distance = event.shiftKey && horizontalDistance === 0 ? event.deltaY : event.deltaX;
    offsetRef.current = wrapOffset(offsetRef.current - distance);
    setOffset(offsetRef.current);
    resumeAfterInteraction();
  };

  return (
    <section id="projects" className="relative flex justify-center z-20 min-h-screen w-full scroll-mt-16 rounded-t-3xl bg-gray-50 py-10 text-brand-dark md:scroll-mt-24">
      <div className="w-full">
        <div className="mb-8 text-center">
          <p className="font-kudryashev-headline text-4xl font-bold text-black">MY PROJECTS</p>
        </div>

        <div className="flex h-150 items-center gap-2 px-3 sm:gap-4 sm:px-6">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous projects"
            className="grid size-9 shrink-0 rounded-full border border-brand-dark text-xl text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
          >
            ←
          </button>
          <div
            ref={viewportRef}
            className={`min-w-0 flex-1 touch-pan-y overscroll-x-contain select-none overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex ${isArrowMoving ? "transition-transform duration-500 ease-out" : ""}`}
              style={{ transform: `translate3d(${offset}px, 0, 0)` }}
            >
              {slides.map((project, index) => {
                const card = (
                  <div className="h-80 max-w-70 overflow-hidden rounded-2xl border-2 border-gray-600 bg-white shadow-sm sm:h-96">
                    <div className="h-2/5 overflow-hidden border-b border-gray-200">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          draggable={false}
                          className="pointer-events-none block size-full select-none object-cover"
                        />
                      )}
                    </div>
                    <div className="flex h-2/3 flex-col justify-start p-4 pb-14 text-left">
                      {project.href ? (
                        <a href={project.href} target="_blank" rel="noreferrer" className="font-kudryashev-headline text-xl font-bold text-brand hover:text-brand-light">{project.title}</a>
                      ) : (
                        <h2 className="font-kudryashev-headline text-xl font-bold text-brand">{project.title}</h2>
                      )}
                      <p className="mt-2 text-sm">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mt-auto flex items-center gap-2 pb-3" aria-label="Technologies used">
                          {project.technologies.map((technology) => (
                            <a
                              key={technology.name}
                              href={technology.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={technology.name}
                              title={technology.name}
                              className="grid size-7 place-items-center p-1"
                            >
                              <img src={technology.icon} alt="" className="size-full" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );

                return (
                <article key={`${project.title}-${index}`} className="shrink-0 px-1.5 sm:px-2" style={{ width: `${cardWidth}px` }}>
                  <div className="relative">
                    {card}
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className=" absolute bottom-3 left-3 rounded-full border-2 border-brand-light px-5 py-1 text-xs font-bold text-brand transition-colors hover:bg-brand-light hover:text-white"
                      >
                        View project
                      </a>
                    )}
                  </div>
                </article>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next projects"
            className="grid size-9 shrink-0 rounded-full border border-brand-dark text-xl text-brand-dark transition-colors hover:bg-brand-dark hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
