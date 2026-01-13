/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

function ProjectCard({
  title,
  description,
  imageUrl,
  imageAlt,
  technologies,
  liveLink,
  githubLink,
}: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => liveLink && window.open(liveLink, '_blank')}
      style={{ minHeight: "500px" }}
    >
      {/* Image Container */}
      <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.4s ease-out",
          }}
        />
        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: isHovered ? 0.6 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        {/* Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-6">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-yellow-500 text-white p-3 rounded-full"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(0)",
                transition: "all 0.3s ease",
              }}
            >
              <ExternalLink size={24} />
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-700 text-white p-3 rounded-full"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(0)",
                transition: "all 0.3s ease 0.1s",
              }}
            >
              <Github size={24} />
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col h-64">
        <h3
          className="text-xl font-bold mb-2"
          style={{
            color: isHovered ? "#0084ff" : "#1f2937",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 flex-1 overflow-hidden line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const projects: ProjectProps[] = [
    {
      title: "My Portfolio Website",
      description:
        "My personal portfolio website showcasing my projects, skills, and experiences. Built with React, Next.js, and Tailwind CSS",
      imageUrl:
        "https://i.imgur.com/9eMMjcV.png",
      imageAlt: "My portfolio website",
      technologies: ["React", "Next.js", "Node.js", "Tailwind CSS", "Vercel"],
      liveLink: "https://ryze-web.vercel.app/",
      githubLink: "https://github.com/iveroh/iveroh-web",
    },
    {
      title: "Ryze Marketing",
      description:
        "Buisness website for a markerting startup called Ryze. Built with React, Node.js, and Tailwind CSS to create a modern and responsive design.",
      imageUrl:
        "https://i.imgur.com/zT7KjdD.png",
      imageAlt: "E-Commerce Platform",
      technologies: ["React", "Next.js", "Node.js", "Tailwind CSS", "Vercel", "Amazon SES"],
      liveLink: "https://iveroh-web.vercel.app/",
      githubLink: "https://github.com/iveroh/ryze-web",
    },
  ];

  return (
    <section id="portfolio" className="w-full py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-600 cursor-default border-b-5 border-blue-500 inline-block pb-1 mb-5">
            Portfolio
          </h1>
          <p className="text-lg text-slate-600">
            Projects I&apos;ve built and shipped
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
