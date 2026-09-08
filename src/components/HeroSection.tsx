import { useRef, useState } from "react";
import CommitActivity from "./CommitActivity";

const BACKGROUND_VIDEOS = ["/video/mountains-1.mp4"];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    const nextIndex = (videoIndex + 1) % BACKGROUND_VIDEOS.length;
    setVideoIndex(nextIndex);
    videoRef.current?.load();
    videoRef.current?.play();
  };

  return (
    <section className="h-screen w-full overflow-hidden text-white -z-2 flex flex-col justify-center items-center">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-1 h-full w-full object-cover grayscale opacity-20"
        src={BACKGROUND_VIDEOS[videoIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
      />
      <div className="h-24 inset-12 absolute flex flex-row justify-between items-center">
        <a href="" className="font-kudryashev-headline text-4xl transition-colors duration-300 hover:text-brand-accent">PROJECTS</a>
        <a href="" className="font-kudryashev-headline text-4xl transition-colors duration-300 hover:text-brand-accent">ABOUT ME</a>
        <a href="" className="font-kudryashev-headline text-4xl transition-colors duration-300 hover:text-brand-accent">FPL TEAM</a>
        <a href="" className="font-kudryashev-headline text-4xl transition-colors duration-300 hover:text-brand-accent">VIDEOS</a>

      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div className="flex justify-left">
            <h2 className="font-kudryashev-headline text-2xl">
              -
            </h2>
          </div>
          <img src="/photo/profile-photo.jpeg" alt="Iver Oprand Heggelund" className="flex justify-center items-center rounded-full w-100 h-100 border-4 border-brand-dark"/>
          <div className="flex justify-start">
            <div>
              <p className="text-lg font-kudryashev-headline text-center">My GitHub Activity for {new Date().getFullYear()}</p>
              <CommitActivity username="iveroh" />
            </div>
          </div>
        </div>
        <h1 className="font-kudryashev-headline text-4xl mt-4">Iver Oprand Heggelund</h1>
        <h3 className="font-kudryashev-headline text-2xl">Informatics Master's student.</h3>
        <h4 className="font-kudryashev-headline text-xl">Specialization in interaction design, gaming, and learning technology.</h4>
      </div>
    </section>
  );
}
