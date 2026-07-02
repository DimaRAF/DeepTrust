export default function ResultsSection({ result, isAnalyzing }) {
  if (isAnalyzing) {
    return (
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-8 text-center text-slate-300">
          Analyzing audio...
        </div>
      </section>
    );
  }

  if (!result) return null;

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-2xl font-bold mb-6">Analysis Result</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5 text-left">
          <p className="text-sm text-slate-400">Prediction</p>
          <p className="mt-2 text-2xl font-bold text-red-400">
            {result.prediction}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5 text-left">
          <p className="text-sm text-slate-400">Confidence</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {result.confidence}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5 text-left">
          <p className="text-sm text-slate-400">Risk Score</p>
          <p className="mt-2 text-2xl font-bold text-yellow-400">
            {result.riskScore}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5 text-left md:col-span-2">
          <p className="text-sm text-slate-400">Transcript</p>
          <p className="mt-2 leading-7 text-slate-200">{result.transcript}</p>
        </div>

        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-left md:col-span-2">
          <p className="text-sm font-semibold text-red-300">Warning</p>
          <p className="mt-2 leading-7 text-red-100">{result.warning}</p>
        </div>
      </div>
    </section>
  );
}