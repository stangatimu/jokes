import Head from "next/head";
import JokesList from "@ui/templates/home";
import { useGetJokeQuery } from "@/services";
import { useRouter } from "next/router";
import { parseParam } from "@/utils";
import JokeDetail from "@/components/templates/joke";

export default function Joke() {
  const router = useRouter();
  const { joke } = router.query as Record<string, string>;
  const { isLoading, data } = useGetJokeQuery({
    joke: joke,
  });

  return (
    <>
      <Head>
        <title>Jokes</title>
        <meta name="description" content="Jokes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <JokeDetail joke={data} loading={isLoading} />
      </main>
    </>
  );
}
