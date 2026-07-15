import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import UploadSection from "./components/UploadSection.jsx";
import ResultsSection from "./components/ResultsSection.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setResult(null);
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload an audio file first.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const text = await response.text();
console.log("Backend response:", text);

const data = JSON.parse(text);

console.log(data);

setResult({
  prediction: data.prediction,
  confidence: `${data.confidence}%`,
  riskScore: data.prediction === "Fake" ? "High" : "Low",
  transcript: "No transcript available.",
  warning:
    data.prediction === "Fake"
      ? "Potential AI-generated audio detected."
      : "No significant AI indicators detected.",
});


} catch (error) {
  console.error(error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(String(error));
  }
} finally {
  setIsAnalyzing(false);
}
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <HeroSection />

        <UploadSection
          selectedFile={selectedFile}
          isAnalyzing={isAnalyzing}
          onFileChange={handleFileChange}
          onAnalyze={handleAnalyze}
          onResetFile={handleResetFile}
        />

        <ResultsSection
          result={result}
          isAnalyzing={isAnalyzing}
        />

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
