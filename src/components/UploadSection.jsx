import { Upload, FileAudio, X, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadSection({
  selectedFile,
  isAnalyzing,
  onFileChange,
  onAnalyze,
  onResetFile,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const fakeEvent = {
      target: {
        files: [file],
      },
    };

    onFileChange(fakeEvent);
  };

  return (
    <section
      id="upload"
      className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-indigo-500/5"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Upload Audio</h2>
        <p className="mt-1 text-sm text-slate-400">
          Supported: MP3, WAV, FLAC, M4A, OGG, WEBM
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-3xl border border-dashed p-8 text-center transition md:p-10 ${
          isDragging
            ? "border-indigo-400 bg-indigo-500/10"
            : "border-white/10 bg-[#0b1020]"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
            <Upload size={28} />
          </div>

          <p className="mt-5 text-lg font-semibold text-white">
            {isDragging ? "Drop your file here" : "Drag & drop your audio file"}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            or click below to browse from your device
          </p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <FileAudio size={18} />
            Choose Audio File
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="audio/*"
            onChange={onFileChange}
            className="hidden"
          />

          {!selectedFile && (
            <p className="mt-4 text-sm text-slate-500">
              No file selected yet
            </p>
          )}

          {selectedFile && (
            <div className="mt-5 w-full max-w-xl rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-left">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-indigo-300">
                    Selected file
                  </p>
                  <p className="mt-1 truncate font-medium text-white">
                    {selectedFile.name}
                  </p>
                </div>

                <button
                  onClick={onResetFile}
                  type="button"
                  className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  title="Remove file"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Upload an audio clip, then run the model to view prediction,
          confidence, transcript, and risk indicators.
        </p>

        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Audio"
          )}
        </button>
      </div>
    </section>
  );
}