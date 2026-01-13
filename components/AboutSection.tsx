"use client";

import AnimatedContent from "./ui/AnimatedContent";
import Image from "next/image";

interface ContentSectionProps {
  imagePosition?: "left" | "right";
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
}

function ContentSection({
  imagePosition = "left",
  title,
  content,
  imageUrl,
  imageAlt,
}: ContentSectionProps) {
  return (
    <section className="w-full py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-50">
          {imagePosition === "left" ? (
            <>
              <AnimatedContent
                direction="horizontal"
                distance={-50}
                duration={0.8}
                ease="power3.out"
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="rounded-xl shadow-lg object-cover w-96 h-120"
                />
              </AnimatedContent>
              <AnimatedContent
                direction="vertical"
                distance={50}
                duration={0.8}
                ease="power3.out"
              >
                <div>
                  <h2 className="text-4xl font-bold text-slate-600 mb-6 cursor-default">
                    {title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed cursor-default whitespace-pre-line">
                    {content}
                  </p>
                </div>
              </AnimatedContent>
            </>
          ) : (
            <>
              <AnimatedContent
                direction="vertical"
                distance={50}
                duration={0.8}
                ease="power3.out"
              >
                <div>
                  <h2 className="text-4xl font-bold text-slate-600 mb-6 cursor-default">
                    {title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed cursor-default whitespace-pre-line">
                    {content}
                  </p>
                </div>
              </AnimatedContent>
              <AnimatedContent
                direction="horizontal"
                distance={50}
                duration={0.8}
                ease="power3.out"
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={500}
                  height={500}
                  className="rounded-xl shadow-lg object-cover w-96 h-120"
                />
              </AnimatedContent>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AboutSection() {
  const sections = [
    {
      imagePosition: "left" as const,
      title: "The start of my journey",
      content:
        "My story begins in a small town in the Artic Circle of Norway, Tromsø, where I was born and raised. From a young age, I always enjoyed exploring the world around me and learning new things. With beautiful nature right outside our doorstep, I got a strong connection to the mountains. Hiking, skiing, and outdoor adventures were a big part of my childhood, shaping my love for exploration and resilience.",
      imageUrl: "/creator-small.jpg",
      imageAlt: "My Story",
    },
    {
      imagePosition: "right" as const,
      title: "Teenage Years of Disipline",
      content:
        "During my teenage years, I was dedicated to a career in men's artistic gymnastics. After two national gold medals and several international competitions, this experience taught me the value of discipline, hard work, and perseverance. Balancing rigorous training with academics was challenging, but it instilled in me a strong work ethic and the ability to overcome obstacles. The lessons I learned from gymnastics have stayed with me throughout my life, shaping my approach to challenges and goals.",
      imageUrl: "/creator-gym.jpg",
      imageAlt: "My Experience",
    },
    {
      imagePosition: "left" as const,
      title: "Living free",
      content:
        "However, my connection to nature and desire for freedom led me to make a life-changing decision. At 18, I chose to leave gymnastics behind and embrace a life of travel and exploration. I moved to a small town in western Norway, where I attended Sunnmøre Folkehøgskule, focusing on outdoor life and adventure. This period of my life was transformative, allowing me to connect deeply with nature and discover my true passions. Traveling to new places, meeting diverse people, and experiencing different cultures broadened my horizons and enriched my understanding of the world.",
      imageUrl: "/creator-free.png",
      imageAlt: "Living free",
    },
    {
      imagePosition: "right" as const,
      title: "Study life",
      content:
        "After having a year full of adventures, I realised it was about time to focus on my career and future. I have always had a passion for technology and creativity, which led me to pursue a degree in Information Technology at Norway's University of Science and Technology (NTNU). Here, I am honing my skills in software development, web technologies, and digital innovation. My goal is to combine my love for technology with my creative instincts to build impactful digital experiences. I am excited about the future and the opportunities that lie ahead, eager to contribute to the tech industry and make a difference through my work.",
      imageUrl: "/study-life.jpg",
      imageAlt: "Study life",
    },
    {
      imagePosition: "left" as const,
      title: "Future ambitions",
      content:
        "Looking ahead, I am driven by a vision to create innovative digital solutions that enhance people's lives. I aspire to work with cutting-edge technologies, collaborate with talented individuals, and continuously push the boundaries of what's possible in the tech world. My ambition is to not only excel in my career but also to give back to the community by mentoring aspiring developers and contributing to open-source projects. With a strong foundation built on diverse experiences and a passion for learning, I am excited to embark on this journey and see where it takes me.\n\nThank you for taking the time to read my story.",
      imageUrl: "/future-ambitions.jpeg",
      imageAlt: "Future ambitions",
    },
  ];

  return (
    <section id="about" className="w-full">
      <div className="w-full py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-600 cursor-default border-b-5 border-blue-500 inline-block pb-5">
            My Story
          </h1>
        </div>
      </div>
      {sections.map((section, index) => (
        <ContentSection key={index} {...section} />
      ))}
    </section>
  );
}
