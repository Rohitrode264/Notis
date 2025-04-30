import { fetchGnews } from "./gnews";
import { fetchNewsData } from "./newsData";
import { fetchCurrents } from "./currentApi";
import { NewsArticle } from "./gnews";
import { summarizeAndPrioritize } from "../gemini/processor";

export const aggregateNews=async(): Promise<NewsArticle[]>=>{
    const [gnews, newsData, currents]=await Promise.all([
        fetchGnews(),
        fetchNewsData(),
        fetchCurrents()
    ]);
    const allNews=[...gnews, ...newsData, ...currents];
    return summarizeAndPrioritize(allNews)
}