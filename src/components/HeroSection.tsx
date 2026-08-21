export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-start overflow-hidden px-6 pt-20 text-white sm:px-12 sm:pt-24 lg:px-16 lg:pt-24"
      aria-label="Iver Heggelund"
    >
      <img
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/photo/action-photo-7.JPG"
        alt=""
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-xl">
        <h1 className="font-bogart max-w-lg text-6xl leading-[0.92] tracking-tight sm:text-8xl">
          Iver
          <br />
          Heggelund
        </h1>
        <p className="mt-7 text-lg sm:text-xl">Software Engineer</p>
        <a
          className="mt-20 inline-flex h-11 w-36 items-center justify-center border border-white px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-slate-900"
          href="mailto:iveroprandheggelund@gmail.com"
        >
          Email me
        </a>
      </div>
    </section>
  );
}
