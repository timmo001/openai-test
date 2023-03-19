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
          "You are an assistant who always responds in a sarcastic manner.",
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
    // Send the message to the server
    const message: ChatCompletionRequestMessage = {
      role: "user",
      content: (event.target as HTMLFormElement).message.value,
    };
    setMessages([...messages, message]);
    sendMessages([...messages, message]);
    // Clear the input
    (event.target as HTMLFormElement).message.value = "";
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
        <section>
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? styles.messageTo
                  : message.role === "assistant"
                  ? styles.messageFrom
                  : styles.messageSystem
              }>
              <p>{message.content}</p>
            </div>
          ))}
        </section>
        <section className={styles.messageInputContainer}>
          <form
            className={styles.messageInputForm}
            onSubmit={addMessageAndSend}>
            <input
              className={styles.messageInput}
              type="text"
              id="message"
              name="message"
              placeholder="Type your message here..."
            />
            <button className={styles.messageInputSubmit} type="submit">
              Send
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
