import Head from "next/head";
import JokesList from "@ui/templates/home";
import { useGetJokesQuery } from "@/services";
import { useRouter } from "next/router";
import { parseParam } from "@/utils";



export default function Home() {
  const router = useRouter();
  const { page, perPage } = router.query;
  const { isLoading, data } = useGetJokesQuery({
    limit: parseParam(perPage),
    page: parseParam(page),
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
        <JokesList loading={isLoading} jokes={data} />
      </main>
    </>
  );
}
