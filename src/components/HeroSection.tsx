import { useRef } from "react";
import CommitActivity from "./CommitActivity";
import NavigationBar from "./NavigationBar";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play();
  };

  return (
    <section className="h-screen w-full overflow-hidden text-white -z-2 flex flex-col justify-center items-center">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-1 h-full w-full object-cover grayscale opacity-40"
        src="/video/water-1.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
      />
      <NavigationBar />
      <h1 className="font-kudryashev-headline text-4xl mb-4">Iver Oprand Heggelund</h1>
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
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
      <h3 className="font-kudryashev-headline text-2xl">Informatics Master's student.</h3>
      <h4 className="font-kudryashev-headline text-xl">Specialization in interaction design, gaming, and learning technology.</h4>
      </div>
    </section>
  );
}
