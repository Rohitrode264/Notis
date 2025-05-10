import { NewsArticle } from '../newsProviders/India/gnews';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config/env';

export interface SummarizedArticle extends NewsArticle {
  summary: string;
}

const client = new GoogleGenerativeAI(config.googleApiKey || '');

/**
 * @param articles 
 * @returns 
 */
export const summarizeAndPrioritize = async (
  articles: NewsArticle[]
): Promise<SummarizedArticle[]> => {
  const itemsText = articles.map((a, idx) =>
    `${idx + 1}. title: ${a.title}
description: ${a.description}
source: ${a.source}
url: ${a.url}`
  ).join('\n\n');

  const prompt = [
    'You are a news aggregation assistant named Notis, built to deliver diverse, relevant, and insightful news summaries to users.',
    '',
    'Your task is as follows:',
    '1. Analyze the list of news articles provided below.',
    '2. Group similar or overlapping articles together into distinct topics.',
    '3. For each group, select one representative article that best covers the story.',
    '4. Ensure your final selection:',
    '   - Contains 10–15 diverse news stories across various topics (e.g., world events, politics, technology, science, health, etc.).',
    '   - Avoids overrepresentation of a single subject or region (i.e., no topic monopoly).',
    '   - Reflects multiple priority levels, including major global headlines and important but less-publicized updates.',
    '   - Excludes promotional or clickbait content, even if it\'s recent.',
    '',
    '5. Prioritize the selected articles based on:',
    '   - Actual importance and relevance to the public.',
    '   - Timeliness — give preference to recent news only when it has substantial weight or impact.',
    '   - Informational value — prioritize what users should genuinely know.',
    '',
    '6. For each chosen article, write a rich, concise, and fact-based summary (max 70 words).',
    '   - If the original article description is too short, vague, or uninformative, research additional context online and enrich the summary.',
    '   - The goal is to make the summary detailed enough that users would prefer reading Notis over visiting the full article.',
    '',
    '7. Return ONLY a valid JSON array, wrapped in triple backticks (```), with no extra text.',
    '',
    '8. If the source name is not available never return undefined analyze the source link and add the source name',
    '',
    'Each object in the JSON array must include:',
    '- title: string — the article\'s headline',
    '- summary: string — your enriched and concise summary',
    '- url: string — the original article URL',
    '- source: string — the source name',
    '',
    'Articles:',
    itemsText
  ].join('\n');

  try {
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = response.text();
    const jsonMatch = output.match(/```json\n([\s\S]*?)```/);

    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Gemini response.');
    }

    const parsed = JSON.parse(jsonMatch[1]) as SummarizedArticle[];
    return parsed;
  } catch (error: any) {
    console.error('Gemini summarization/prioritization failed:', error.message);
    return [];
  }
};
