import axios from "axios";
import { NewsArticle } from "./gnews";

export const fetchNewsData= async ():Promise<NewsArticle[]>=>{
    const apiKey=process.env.NEWS_DATA_API_KEY;
    const url=`https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&page=1`;
    const {data}=await axios.get(url);
    return (data.results || []).map((a:any)=>({
        title:a.title,
        descirption:a.descirption,
        url:a.url,
        publishedAt:a.pubDate,
        sourse:a.source_id
    }));
};