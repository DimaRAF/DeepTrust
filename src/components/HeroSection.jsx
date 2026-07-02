export default function HeroSection() {
  return (
    <section className="pt-10">
      <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-indigo-300">
        AI Forensics • Hackathon Demo
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
        <span className="text-white">Deepfake</span>{" "}
        <span className="text-indigo-400">Audio Detector</span>
      </h1>

      <p className="mt-6 max-w-2xl text-slate-300 leading-7">
        Upload any audio file. Our model analyzes speech patterns and synthetic
        artifacts to detect whether the audio is real or AI-generated.
      </p>
    </section>
  );
}