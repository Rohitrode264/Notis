import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL, GOOGLE_API_KEY } from "../config/config";
import ActionButton from "./inputs/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const FloatingNewsSummaryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const togglePopup = () => setIsOpen((prev) => !prev);

  const fetchAllNewsData = async () => {
    const [indiaRes, globalRes, currentRes] = await Promise.all([
      axios.get(`${BASE_URL}/NewsBatchForIndia`),
      axios.get(`${BASE_URL}/NewsBatchForGlobe`),
      axios.get(`${BASE_URL}/NewsBatchOfCa`),
    ]);
    if (!indiaRes.data || !globalRes.data || !currentRes.data) {
      throw new Error("Failed to fetch news data");
    }
    return {
      indiaData: indiaRes.data,
      globalData: globalRes.data,
      currentAffairsData: currentRes.data,
    };
  };

  const generateNewsSummary = async (
    indiaData: string,
    globalData: string,
    currentAffairsData: string,
    onStreamChunk?: (textChunk: string) => void
  ): Promise<string> => {
    if (!GOOGLE_API_KEY) throw new Error("Missing GOOGLE_API_KEY");

    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a news summarization assistant for a platform called Notis. I will provide you with the full set of raw news data collected from various reliable sources. Your task is to generate a concise 2-minute news summary that covers all the major highlights.

Please structure the output into three distinct sections:

India – Important national news, events, and developments.
Global – Key international headlines that affect the world at large.
Current Affairs – Time-sensitive topics including politics, science, technology, sports, economy, or major public events (both Indian and global if applicable).

Guidelines:
- Use clear and engaging language suitable for a general audience.
- Keep the tone professional yet accessible.
- Prioritize relevance and impact.
- Avoid repetition or overly technical jargon.
- Ensure the entire summary can be read aloud in about 2 minutes.
- End the summary with a short sign-off line like:
“That’s all for today on Notis. Stay informed, stay sharp.”
please don't use any kind of * or # kind of things

Here is the data:

India News:
${indiaData}

Global News:
${globalData}

Current Affairs:
${currentAffairsData}
`;

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let fullText = "";
    let buffer = "";
    let bufferTimeout: ReturnType<typeof setTimeout> | null = null;

    const flushBuffer = () => {
      if (buffer && onStreamChunk) {
        onStreamChunk(buffer);
        buffer = "";
      }
    };

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      buffer += chunkText;

      if (!bufferTimeout) {
        bufferTimeout = setTimeout(() => {
          flushBuffer();
          bufferTimeout = null;
        }, 100);
      }
    }

    flushBuffer();  
    return fullText;
  };

  const handleSummarizeClick = async () => {
    setIsLoading(true);
    setSummary("");

    try {
      const { indiaData, globalData, currentAffairsData } = await fetchAllNewsData();

      const indiaText = indiaData.map((item: any) => item.title || "").join("\n");
      const globalText = globalData.map((item: any) => item.title || "").join("\n");
      const caText = currentAffairsData.map((item: any) => item.title || "").join("\n");

      await generateNewsSummary(indiaText, globalText, caText, (chunk) => {
        setSummary((prev) => (prev || "") + chunk);
      });
    } catch (error) {
      console.error("Error summarizing news:", error);
      setSummary("Failed to generate summary. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const readAloud = () => {
    if (!summary?.trim()) return;
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") {
      alert("Speech Synthesis not supported in your browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    utterance.onend = () => setIsListening(false);
    utterance.onerror = () => setIsListening(false);

    setSpeechUtterance(utterance);
    setIsListening(true);
    window.speechSynthesis.speak(utterance);
  };

  const pauseReading = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.cancel();
      setIsListening(false);
    }
  };

  const resumeReading = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsListening(true);
    }
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-xl flex items-center justify-center transition-transform duration-700 ease-in-out hover:scale-110 hover:shadow-blue-500/50 z-50 cursor-pointer"
      >
        <h2 className="font-bold text-2xl flex justify-center items-center">
          N<span className="text-blue-400">.</span>
        </h2>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-24 right-6 w-80 h-106 bg-[#0b0f19] border border-gray-700 text-white rounded-2xl shadow-xl z-40 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Notis<span className="text-blue-500">.</span> AI
              </h3>
              <button onClick={togglePopup} className="text-xl font-bold hover:text-red-400">
                &times;
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm text-gray-300">
              <p>Don’t have enough time to read articles? Summarize and listen to them.</p>

              {!summary && (
                <ActionButton
                  label={isLoading ? "Summarizing..." : "Summarize News"}
                  onClick={handleSummarizeClick}
                  variant="primary"
                  disabled={isLoading}
                />
              )}

              {summary?.trim() && (
                <>
                  <p className={`whitespace-pre-line transition-all duration-300 ${isLoading ? "blur-sm" : "blur-0"}`}>
                    {summary}
                  </p>
                  {!isListening && !window.speechSynthesis.paused && (
                    <ActionButton label="Listen to News" onClick={readAloud} variant="success" />
                  )}
                  {isListening && (
                    <ActionButton label="Stop" onClick={pauseReading} variant="danger" />
                  )}
                  {!isListening && window.speechSynthesis.paused && (
                    <ActionButton label="Resume" onClick={resumeReading} variant="primary" />
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNewsSummaryButton;
