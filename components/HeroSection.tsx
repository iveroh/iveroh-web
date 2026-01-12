"use client";

import Plasma from "./ui/Plasma";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {/* Animation */}
        <div className="absolute inset-0">
          <Plasma
            color="#00a8e8"
            speed={0.6}
            direction="pingpong"
            scale={0.8}
            opacity={0.5}
            mouseInteractive={false}
          />
        </div>
        {/* Content */}
        <div className="relative flex items-center justify-center h-full">
          <div className="w-full max-w-7xl mx-auto px-8 flex items-center">
            {/* Left Side - Text */}
            <div className="w-1/2 pr-12">
              <h1 className="text-5xl font-bold text-slate-600 mb-4 cursor-default">
                Welcome to my website
              </h1>
              <h2 className="text-2xl text-slate-600 cursor-default">
                Discover my story and portfolio as a passionate developer.
              </h2>
            </div>

            {/* Right Side - Image */}
            <div className="w-1/2 flex justify-center hover:scale-103 transition-transform duration-300">
              <Image
                src="/creator1.jpg"
                alt="Iver Oprand Heggelund"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
