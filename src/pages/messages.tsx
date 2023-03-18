import { useState } from "react";
import Head from "next/head";
import type { ChatCompletionRequestMessage } from "openai";

import styles from "@/styles/Main.module.css";

export default function Home(): JSX.Element {
  const [messages, setMessages] = useState<Array<ChatCompletionRequestMessage>>(
    [
      {
        role: "system",
        content:
          "You are an AI assistant for a developer. You are helping them build a new app. They ask you to help them choose a name for their app. You can suggest names and they can accept or reject them. Let's get started!",
      },
    ]
  );

  async function sendMessages(messagesIn: Array<ChatCompletionRequestMessage>) {
    console.log({ messages: messagesIn });
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: messagesIn }),
    });
    if (!response.ok)
      throw new Error(
        `${response.statusText}: ${JSON.stringify(
          await response.json(),
          null,
          2
        )}`
      );
    const data = await response.json();
    setMessages([...messagesIn, data]);
  }

  function addMessageAndSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message: ChatCompletionRequestMessage = {
      role: "user",
      content: (event.target as HTMLFormElement).message.value,
    };
    setMessages([...messages, message]);
    sendMessages([...messages, message]);
  }

  return (
    <>
      <Head>
        <title>Messages | OpenAI Test</title>
        <meta name="description" content="OpenAI Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Messages</h1>
        <section>
          {messages.map((message, index) => (
            <div key={index}>
              <p>{message.role}</p>
              <p>{message.content}</p>
            </div>
          ))}
        </section>
        <section>
          <form onSubmit={addMessageAndSend}>
            <label htmlFor="message">Message</label>
            <input type="text" name="message" />
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
    </>
  );
}
