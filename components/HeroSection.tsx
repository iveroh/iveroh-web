"use client"

import { useState } from "react";
import CircularText from "./ui/CircularText";

export default function HeroSection() {

  // const [isLoading, setIsLoading] = useState(true);
  const [showLoaderWrapper, setShowLoaderWrapper] = useState(false);
  const [showContent, setShowContent] = useState(true);

  // Loader wrapper
  setTimeout(() => {
    setShowLoaderWrapper(true);
  }, 1500);

  // HeroSection content
  setTimeout(() => {
    setShowContent(false);
  }, 2500);

  return (
    <section className="w-screen h-screen overflow-hidden bg-blue-950" id="home">
      {/*Loader wrapper */}
      <div className={` bg-blue-950 w-screen h-screen transition-opacity duration-500 ease-out ${showLoaderWrapper ? 'opacity-0' : 'opacity-100'} absolute top-0 left-0 ${showLoaderWrapper ? 'collapse' : 'visible'} flex items-center justify-center ${showLoaderWrapper ? 'z-0' : 'z-50'}`}>
        <CircularText text="IVER*HEGGELUND*" onHover="slowDown" spinDuration={10} />
      </div>
      <div className={`w-screen h-screen overflow-hidden bg-blue-800/20 ${showLoaderWrapper ? 'z-0' : 'z-50'} ${showContent ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <div className="absolute top-5 left-5 wrap-breakword">
          <h1 className="text-white sm:text-6xl text-4xl font-zalando">IVER HEGGELUND</h1>
          <h2 className="text-white sm:text-4xl text-2xl font-zalando">Software Engineer & UI/UX Designer</h2>
        </div>
        <div className="text-2xl font-bold text-white">

        </div>
      </div>
    </section>
  );
}