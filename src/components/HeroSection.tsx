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
    <section className="sticky top-0 h-screen w-full overflow-hidden text-white flex flex-col justify-center items-center z-0">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover grayscale opacity-40"
        src="/video/water-1.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
      />
      <h1 className="font-kudryashev-headline text-4xl mb-4">Iver Oprand Heggelund</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div className="flex justify-center items-center">
            <div>
            <h2 className="text-xl font-kudryashev-headline text-center">
              My Top Github Repositories
            </h2>
            <RepositoryDisplay />
            </div>
          </div>
          <a href="https://github.com/iveroh" className="transition-300 transition-transform hover:scale-101">
          <img src="/photo/profile-photo.jpeg" alt="Iver Oprand Heggelund" className="flex justify-center items-center rounded-full w-100 h-100 border-4 border-brand-accent"/>
          </a>
          <div className="flex justify-start">
            <div>
              <p className="text-lg font-kudryashev-headline text-center">My GitHub Activity for {new Date().getFullYear()}</p>
              <CommitActivity username="iveroh" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
      <h3 className="font-kudryashev-headline text-2xl">Informatics Master's student.</h3>
      <h4 className="font-kudryashev-headline text-xl">Specialization in interaction design, gaming, and learning technology.</h4>
      </div>
    </section>
  );
}
