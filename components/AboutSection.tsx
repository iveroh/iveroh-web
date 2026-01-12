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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                  className="rounded-xl shadow-lg object-cover w-full h-auto"
                />
              </AnimatedContent>
              <AnimatedContent
                direction="vertical"
                distance={50}
                duration={0.8}
                ease="power3.out"
              >
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6 cursor-default">
                    {title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed cursor-default">
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
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6 cursor-default">
                    {title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed cursor-default">
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
                  className="rounded-xl shadow-lg object-cover w-full h-auto"
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
      title: "My Story",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga provident quidem error quaerat, ex laboriosam non aspernatur, consectetur qui eaque repellendus est sed quia earum alias? Alias cum voluptatibus quos vero deserunt dolorem nostrum et iste?",
      imageUrl: "/creator1.jpg",
      imageAlt: "My Story",
    },
    {
      imagePosition: "right" as const,
      title: "My Experience",
      content:
        "Voluptas velit magnam dolore hic numquam deserunt expedita fuga vitae est facere, ipsum, ex quas temporibus aperiam porro totam animi excepturi necessitatibus omnis. Dolor illum iure nam, dignissimos nostrum soluta, sint quas iusto, minus deserunt molestiae.",
      imageUrl: "/creator1.jpg",
      imageAlt: "My Experience",
    },
    {
      imagePosition: "left" as const,
      title: "My Skills",
      content:
        "Repellendus rerum et praesentium mollitia iste fugit inventore debitis similique, molestias, aspernatur ut fugiat laudantium quidem reprehenderit dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla voluptatum quos eum, quia incidunt dolores facilis.",
      imageUrl: "/creator1.jpg",
      imageAlt: "My Skills",
    },
    {
      imagePosition: "right" as const,
      title: "My Work",
      content:
        "Consectetur adipisicing elit. Fuga provident quidem error quaerat, ex laboriosam non aspernatur, consectetur qui eaque repellendus est sed quia earum alias? Alias cum voluptatibus quos vero deserunt dolorem nostrum et iste voluptas velit magnam dolore.",
      imageUrl: "/creator1.jpg",
      imageAlt: "My Work",
    },
    {
      imagePosition: "left" as const,
      title: "My Vision",
      content:
        "Hic numquam deserunt expedita fuga vitae est facere, ipsum, ex quas temporibus aperiam porro totam animi excepturi necessitatibus omnis. Dolor illum iure nam, dignissimos nostrum soluta, sint quas iusto, minus deserunt molestiae autem ipsum similique blanditiis.",
      imageUrl: "/creator1.jpg",
      imageAlt: "My Vision",
    },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <ContentSection key={index} {...section} />
      ))}
    </>
  );
}
