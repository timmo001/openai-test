import Head from "next/head";
import axios from "axios";

import styles from "@/styles/Home.module.css";

export default function Home({ apiKey }: { apiKey: string }): JSX.Element {
  async function uploadFile(event) {
    const file = event.target.files[0];
    console.log(file);

    var formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");

    const response = await axios.post<any>(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  return (
    <>
      <Head>
        <title>OpenAI Test</title>
        <meta name="description" content="OpenAI Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section>
          <form
            id="uploadForm"
            encType="multipart/form-data"
            onChange={uploadFile}
          >
            <input type="file" id="file" name="file"></input>
          </form>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      apiKey: process.env.OPENAI_API_KEY,
    },
  };
}
