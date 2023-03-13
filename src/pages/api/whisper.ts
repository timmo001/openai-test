// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

type Data = {
  name: string;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await axios.post<any>(
    "https://api.openai.com/v1/audio/transcriptions",
    req.body,
    {
      headers: {
        Authorization: `Bearer ${configuration.apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  res.status(200).json(response.data);
}
