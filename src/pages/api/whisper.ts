// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { openAIConfiguration } from "@/utils/openapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // OpenAI API call
  const response = await axios.post<any>(
    "https://api.openai.com/v1/audio/transcriptions",
    req.body,
    {
      headers: {
        Authorization: `Bearer ${openAIConfiguration.apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Return the response
  res.status(200).json(response.data);
}
