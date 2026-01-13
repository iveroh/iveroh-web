import {
  SiTypescript,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiVite,
  SiAdobepremierepro,
  SiNextdotjs,
  SiLinux,
} from "react-icons/si";

export default function TechLogosScroll() {
  const logos = [
    { name: "TypeScript", icon: SiTypescript },
    { name: "GitHub", icon: SiGithub },
    { name: "CSS3", icon: SiCss3 },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "React", icon: SiReact },
    { name: "HTML5", icon: SiHtml5 },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Vite", icon: SiVite },
    { name: "Adobe Premiere Pro", icon: SiAdobepremierepro },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Linux", icon: SiLinux },
  ];

  // Duplicate logos twice for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <style>{`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-100% / 2));
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            display: flex;
            width: fit-content;
            will-change: transform;
          }
          .tech-logo {
            flex-shrink: 0;
            margin: 0 2rem;
            display: flex;
            align-items: center;
          }
          .tech-logo svg {
            color: rgb(59, 130, 246);
            opacity: 0.9;
          }
        `}</style>

        <div className="animate-scroll items-center">
          {duplicatedLogos.map((logo, index) => {
            const IconComponent = logo.icon;
            return (
              <div key={index} className="tech-logo">
                <IconComponent size={64} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}