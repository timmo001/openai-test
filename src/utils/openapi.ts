import { Configuration, OpenAIApi } from "openai";

export const openAIConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openAIAPI = new OpenAIApi(openAIConfiguration);
