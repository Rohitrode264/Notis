import axios from "axios";
import { NewsArticle } from "./gnews";
import { config } from "../../../config/env";

export const fetchCurrents = async ():Promise<NewsArticle[]>=>{
    const apiKey=config.currentsApiKey;
    const url=`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&country=IN`;
    const {data}=await axios.get(url);
    // console.log(data);
    return (data.news || []).map((a:any)=>({
        title:a.title,
        description:a.descriton,
        url:a.url,
        publishedAt:a.publishedAt,
        source:a.source
    }));
};
