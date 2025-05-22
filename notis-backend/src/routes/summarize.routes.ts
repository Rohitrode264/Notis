import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GOOGLE_API_KEY) {
  console.error("GOOGLE_API_KEY is not set in environment variables");
  throw new Error("GOOGLE_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post("/summarize", async (req:Request, res:Response) => {
  const { newsIndia, newsGlobal, newsCa } = req.body;

  if (!newsIndia || !newsGlobal || !newsCa) {
    console.error("Missing news data:", { newsIndia, newsGlobal, newsCa });
    return res.status(400).json({ error: "Missing news data." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `

            You are a news summarization assistant for a platform called Notis. I will provide you with the full set of raw news data collected from various reliable sources. Your task is to generate a concise 2-minute news summary that covers all the major highlights.

            Please structure the output into three distinct sections:
            first of all greet the user with and tell them somehting like welcome too notis or somthing like that I'll be expecting something better from you to greet user in a very fresh message.
            
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
            "That's all for today on Notis. Stay informed, stay sharp."
            please do not use any kind of special characters to highlight the text just provide formated plain text no need to quote them in any kind of ** or # or anything like that
            here is the data:
            ${newsIndia}
            ${newsGlobal}
            ${newsCa}
            `;

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Successfully received response from Gemini API");

    return res.json({ summary: text });
  } catch (error: any) {
    console.error("Gemini summarization error:", {
      message: error.message,
      status: error.status,
      details: error.details,
      stack: error.stack
    });
    
    // Send a more specific error message
    const errorMessage = error.message || "Failed to summarize news";
    return res.status(500).json({ 
      error: errorMessage,
      details: error.details || "An unexpected error occurred while summarizing the news"
    });
  }
});

export default router;



