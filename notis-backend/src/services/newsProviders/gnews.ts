import axios from "axios";
import { title } from "process";

export interface NewsArticle{
    title:string;
    description:string;
    url:string;
    publihsedAt:string;
    source:string;
}

export const fetchGnews= async():Promise<NewsArticle[]>=>{
    const apiKey=process.env.GNEWS_API_KEY;
    const url=`https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&country=in&max=10`;
    const {data}=await axios.get(url);
    return data.articles.map((a:any)=>({
        title:a.title,
        description:a.description || '',
        url:a.url,
        publishedAt:a.publishedAt,
        source:a.source || 'Gnews'
    }));
};