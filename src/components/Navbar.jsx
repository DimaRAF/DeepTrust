export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-wide">
          <span className="text-white">Deepfake</span>{" "}
          <span className="text-indigo-400">Audio Detector</span>
        </div>

        <div className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#hero" className="hover:text-white">Home</a>
          <a href="#upload" className="hover:text-white">Upload</a>
          <a href="#results" className="hover:text-white">Results</a>
          <a href="#how-it-works" className="hover:text-white">How it works</a>
        </div>
      </div>
    </nav>
  );
}