import axios from "axios";
import { NewsArticle } from "./gnews";

export const fetchCurrents = async ():Promise<NewsArticle[]>=>{
    const apiKey=process.env.CURRENTS_API_KEY;
    const url=`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&country=IN`;
    const {data}=await axios.get(url);
    return (data.news || []).map((a:any)=>({
        title:a.title,
        description:a.descriton,
        url:a.url,
        publishedAt:a.publishedAt,
        source:a.source
    }));
};