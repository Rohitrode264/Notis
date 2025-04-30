import { NewsArticle } from '../newsProviders/gnews';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface SummarizedArticle extends NewsArticle {
  summary: string;
}

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

/**
 * @param articles 
 * @returns 
 */
export const summarizeAndPrioritize = async (
  articles: NewsArticle[]
): Promise<SummarizedArticle[]> => {
  const itemsText = articles.map((a, idx) =>
    `${idx + 1}. Title: ${a.title}
Description: ${a.description}
Source: ${a.source}
URL: ${a.url}`
  ).join('\n\n');

  const prompt = `You are a news aggregation assistant. Your task is to:
1. Analyze the following list of news articles.
2. Group similar articles together.
3. Choose one representative article from each group.
4. Prioritize and select the top 10–15 most important articles across all topics.
5. For each of these, write a concise summary (max 70 words).
6. Return ONLY a JSON array. Wrap the JSON output in triple backticks (\`\`\`).
Each JSON object must include: title, summary, url, and source.

Articles:
${itemsText}`;

  try {
    const model = client.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();
    const jsonMatch = output.match(/```json\n([\s\S]*?)```/);

    if (!jsonMatch) throw new Error('Failed to extract JSON from Gemini response.');

    const parsed = JSON.parse(jsonMatch[1]) as SummarizedArticle[];
    return parsed;
  } catch (error) {
    console.error('Gemini summarization/prioritization failed:', error);
    return [];
  }
};
