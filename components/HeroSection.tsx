"use client";

import TechLogosScroll from "./TechLogosScroll";
import Plasma from "./ui/Plasma";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-screen h-screen overflow-hidden border-b-2" id="home">
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
        <div className="relative flex flex-col items-center justify-between h-full py-8 md:py-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-center flex-1">
            {/* Left Side - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pr-12 mb-6 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-600 mb-4 cursor-default">
                Welcome to my website!
              </h1>
              <h2 className="text-xl sm:text-2xl text-slate-600 cursor-default">
                Discover my story and portfolio.
              </h2>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:flex w-1/2 justify-center mb-10">
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
          
          {/* Tech Logos */}
          <div className="w-full max-w-6xl mx-auto px-4 pb-4 md:pb-8">
            <TechLogosScroll />
          </div>
        </div>
      </div>
    </section>
  );
}