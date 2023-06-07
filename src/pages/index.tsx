import Head from "next/head";
import JokesList from "@ui/templates/home";
import { useGetJokesQuery } from "@/services";
import { useRouter } from "next/router";
import { parseParam } from "@/utils";
import { IQuery } from "@/types/jokes";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { page, perPage, sort, order } = router.query as unknown as IQuery;
  const { isLoading, data, refetch } = useGetJokesQuery({
    limit: parseParam(perPage),
    page: parseParam(page),
    sort,
    order,
  });

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, sort, order]);

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
