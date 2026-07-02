export default function HowItWorks() {
  const steps = [
    {
      title: "Upload Audio",
      description:
        "Upload a voice recording or audio sample in supported formats such as WAV, MP3, M4A, or OGG.",
    },
    {
      title: "AI Analysis",
      description:
        "The model analyzes speech patterns, synthetic artifacts, and acoustic fingerprints to detect AI-generated audio.",
    },
    {
      title: "View Results",
      description:
        "Get prediction, confidence score, risk level, transcript, and warning indicators in one dashboard.",
    },
  ];

  return (
    <section id="how-it-works" className="mt-20">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white">How It Works</h2>
        <p className="mt-3 text-slate-400">
          A simple workflow to detect whether an audio clip is real or synthetic.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-slate-400 leading-7">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}