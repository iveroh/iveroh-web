import React from "react"; 
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
          }
        `}</style>

        <div className="animate-scroll items-center">
          {duplicatedLogos.map((logo, index) => {
            const IconComponent = logo.icon;
            return (
              <div key={index} className="flex shrink-0 mx-8">
                <IconComponent
                  size={64}
                  className="text-blue-500 transition-transform duration-300 opacity-90"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}