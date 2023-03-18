// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { ChatCompletionRequestMessage } from "openai";

import { openAIAPI } from "@/utils/openapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  // Check if the request body is valid
  if (!req.body) {
    res.status(400).json({ error: "Bad Request", details: "body is missing" });
    return;
  }

  // Check if the request body has the messages property
  if (!("messages" in req.body)) {
    res
      .status(400)
      .json({ error: "Bad Request", details: "messages property is missing" });
    return;
  }

  // Log the request body
  console.log(req.body);

  // Get the messages from the request body
  const { messages } = req.body as {
    messages: Array<ChatCompletionRequestMessage>;
  };

  // OpenAI API call
  const chatCompletion = await openAIAPI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  const chatMessage = chatCompletion.data.choices[0].message;

  // Log the chat message
  console.log(chatMessage);

  // Return the chat message
  res.status(200).json(chatMessage);
}
