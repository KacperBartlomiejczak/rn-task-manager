export default function Header() {
  return (
    <div className="text-center py-6 animate-in fade-in zoom-in duration-700 slide-in-from-top-4">
      <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-3 tracking-tight">
        <span className="text-gradient">Start Your Day</span> &{" "}
        <br className="md:hidden" />
        <span className="text-white drop-shadow-lg">Be Productive</span>
      </h1>
      <p className="text-gray-400 font-light md:text-xl max-w-lg mx-auto leading-relaxed">
        Track your progress and build consistent habits in style.
      </p>
    </div>
  );
}
