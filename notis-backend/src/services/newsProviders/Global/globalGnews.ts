import axios from "axios";
import { config } from "../../../config/env";
import { title } from "process";
import { NewsArticle } from "../India/gnews";

export const fetchGlobalGnews= async():Promise<NewsArticle[]>=>{
    const apiKey=config.gnewsApiKey;
    const url=`https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&max=10`;
    const {data}=await axios.get(url);
    return data.articles.map((a:any)=>({
        title:a.title,
        description:a.description || '',
        url:a.url,
        publishedAt:a.publishedAt,
        source:a.source.name || 'Gnews'
    }));
};