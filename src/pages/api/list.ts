// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { ListModelsResponse } from "openai/dist/api";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListModelsResponse>
) {
  const openai = new OpenAIApi(configuration);
  res.status(200).json((await openai.listModels()).data);
}
