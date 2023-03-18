// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { ListModelsResponse } from "openai/dist/api";

import { openAIAPI } from "@/utils/openapi";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ListModelsResponse>
) {
  // OpenAI API call and response
  res.status(200).json((await openAIAPI.listModels()).data);
}
