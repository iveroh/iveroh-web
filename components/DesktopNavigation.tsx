export default function DesktopNavigation() {
  const link =
    "px-10 py-4 text-xl bg-white text-yellow-500 font-bold rounded-2xl shadow-lg cursor-pointer " +
    "whitespace-nowrap " +
    "transition-transform transition-colors duration-200 ease-out " +
    "transform-gpu will-change-transform [backface-visibility:hidden] " +
    "hover:bg-gray-50 hover:scale-[1.05]";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          inline-flex flex-nowrap items-center gap-6
          bg-gray-50 rounded-2xl p-3 px-7 shadow-lg
          max-w-[calc(100vw-2rem)] overflow-x-hidden
        "
      >
        <a className={link}>HOME</a>
        <a className={link}>WHO AM I?</a>
        <a className={link}>WHY HIRE ME?</a>
      </div>
    </nav>
  );
}
