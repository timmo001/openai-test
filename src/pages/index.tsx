import Head from "next/head";

import styles from "@/styles/Main.module.css";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>OpenAI Test</title>
        <meta name="description" content="OpenAI Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section></section>
      </main>
    </>
  );
}
