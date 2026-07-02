import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";import UploadSection from "./components/ UploadSection.jsx";
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
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("Please upload an audio file first.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

setTimeout(() => {
  const fakeResult = {
    prediction: "Fake Audio",
    confidence: "94%",
    riskScore: "High",
    transcript:
      "Hello, this audio appears to contain synthesized speech characteristics with unnatural transitions and spectral inconsistencies.",
    warning:
      "Potential synthetic speech patterns detected. Review the transcript and risk indicators before making a final judgment.",
  };

  const realResult = {
    prediction: "Real Audio",
    confidence: "88%",
    riskScore: "Low",
    transcript:
      "This recording appears natural, with consistent speech flow and no obvious signs of synthetic generation.",
    warning:
      "No major deepfake indicators detected in this sample. Continue reviewing context if needed.",
  };

  setResult(Math.random() > 0.5 ? fakeResult : realResult);
  setIsAnalyzing(false);
}, 2000);



 



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
        />

        <ResultsSection result={result} isAnalyzing={isAnalyzing} />

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}