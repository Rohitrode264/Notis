import { fetchGnews } from "./India/gnews";
import { fetchNewsData } from "./India/newsData";
import { fetchCurrents } from "./India/currentApi";
import { NewsArticle } from "./India/gnews";
import dotenv from 'dotenv';
dotenv.config();
import { summarizeAndPrioritize } from "../gemini/processor";
import { fetchGlobalGnews } from "./Global/globalGnews";
import { fetchGlobalNewsData } from "./Global/globalNewsData";
import { fetchGlobalCurrents } from "./Global/globalCurrentApi";
import { fetchCaGnews } from "./Current-Affairs(India)/CaGnews";

export const aggregateNewsForIndia = async (): Promise<NewsArticle[]> => {
  const [gnews, newsData] = await Promise.all([
    fetchGnews(),
    fetchNewsData(),
  ]);
  const allNews = [...gnews, ...newsData];
  const response = await summarizeAndPrioritize(allNews);
  return response;
}

export const aggregateGlobalNews = async (): Promise<NewsArticle[]> => {
    const [gnews, newsData] = await Promise.all([
      fetchGlobalGnews(),
      fetchGlobalNewsData(),
    ])

    const allGlobalNews = [...gnews, ...newsData];
    const response = await summarizeAndPrioritize(allGlobalNews);
    return response;
  
  
}

export const aggregateCurrentAffairs = async (): Promise<NewsArticle[]> => {
  const [gnews] = await Promise.all([
    fetchCaGnews()
  ]);

  const allCurrentAffairs = [...gnews];
  const response = await summarizeAndPrioritize(allCurrentAffairs);
  return response;
};
