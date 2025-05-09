import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    gnewsApiKey: process.env.GNEWS_API_KEY,
    newsDataApiKey: process.env.NEWS_DATA_API_KEY,
    currentsApiKey: process.env.CURRENTS_API_KEY,
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT || 3000
}; 

export const BASE_URL= `http://localhost:${process.env.PORT}`;
console.log(process.env.PORT);