import { useRef } from "react";
import CommitActivity from "./CommitActivity";
import RepositoryDisplay from "./RepositoryDisplay";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play();
  };

  return (
    <section className="relative top-0 h-screen w-full overflow-hidden text-white flex flex-col justify-center items-center z-0 md:sticky">
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover grayscale opacity-50"
        src="/video/water-1.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
      />
      <div className="relative z-10 flex flex-col items-center">
      <h1 className="font-kudryashev-headline font-bold text-4xl mb-4 text-center">Iver Oprand Heggelund</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div className="justify-center items-center hidden md:flex">
            <div>
            <h2 className="text-xl font-kudryashev-headline font-bold text-center">
              My Top Github Repositories
            </h2>
            <RepositoryDisplay />
            </div>
          </div>
          <a href="https://github.com/iveroh" className="transition-300 transition-transform hover:scale-101 hidden md:inline">
          <img src="/photo/profile-photo.jpeg" alt="Iver Oprand Heggelund" className="flex justify-center items-center rounded-full w-100 h-100 border-3 border-gray-600"/>
          </a>
          <div className="justify-start hidden md:flex">
            <div>
              <p className="text-lg font-kudryashev-headline font-bold text-center">My GitHub Activity for {new Date().getFullYear()}</p>
              <CommitActivity username="iveroh" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
      <h3 className="font-kudryashev-headline font-bold text-2xl text-center">Informatics Master's student.</h3>
      <h4 className="font-kudryashev-headline font-bold text-xl text-center">Specialization in interaction design, gaming, and learning technology.</h4>
      </div>
      </div>
    </section>
  );
}
