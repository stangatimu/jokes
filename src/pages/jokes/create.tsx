import Head from "next/head";
import CreateJoke from "@ui/templates/joke/create";

export default function Joke() {
  return (
    <>
      <Head>
        <title>New Joke</title>
        <meta name="description" content="Jokes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CreateJoke />
      </main>
    </>
  );
}
