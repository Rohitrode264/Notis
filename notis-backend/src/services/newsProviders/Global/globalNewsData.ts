import axios from "axios";
import { NewsArticle } from "../India/gnews";
import { config } from "../../../config/env";

export const fetchGlobalNewsData= async ():Promise<NewsArticle[]>=>{
    const apiKey=config.newsDataApiKey;
    const url=`https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in&language=en`;
    const {data}=await axios.get(url);
    // console.log(data);
    return (data.results || []).map((a:any)=>({
        title:a.title,
        description:a.description,
        url:a.source_url,
        publishedAt:a.pubDate,
        sourse:a.source_name
    }));
};