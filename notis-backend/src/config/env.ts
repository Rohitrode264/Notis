import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
export const config = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    gnewsApiKey: process.env.GNEWS_API_KEY,
    newsDataApiKey: process.env.NEWS_DATA_API_KEY,
    currentsApiKey: process.env.CURRENTS_API_KEY,
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT || 5000,
    geminiSummarizationApiKey:process.env.GEMINI_SUMMARIZATION_API_KEY
}; 

export const BASE_URL= `http://localhost:${process.env.PORT}`;