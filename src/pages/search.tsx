import type { GetServerSideProps } from "next";
import { createCategory } from "@/lib/utils";
import { MovieListing, Movie, PersonType, TVShow } from "@/models/types";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import CardMovie from "@/components/Cards/CardMovie";
import { useRouter } from "next/router";
import { wording } from "@/lib/utils";
useRouter;
type SearchProps = {
  results: MovieListing;
  query: string;
};

const SearchPage: React.FC<SearchProps> = ({ results, query }) => {
  const [resultsPage, setResultsPage] = useState<MovieListing | undefined>(
    undefined
  );

  const { locale } = useRouter();
  useEffect(() => {
    setResultsPage(results);
  }, [results]);
  const url = `https://api.themoviedb.org/3/search/multi?query=${query.toLowerCase()}&include_adult=false&language=${locale}`;
  return (
    <section className="container mx-auto">
      <h2 className="my-10">
        {wording(locale, "your_research")} :
        <q className="font-normal">{query}</q>
        <span className="italic font-normal text-2xl">
          ({resultsPage?.total_results} {wording(locale, "results")})
        </span>
      </h2>

      <div className="flex flex-wrap w-full gap-5 justify-start">
        {resultsPage?.results.map((item: Movie | PersonType | TVShow) => {
          return (
            <CardMovie
              key={item.id}
              item={item}
              type={item.media_type}
              idItem={item.id}
            />
          );
        })}
      </div>

      <Pagination
        infos={results}
        query={query}
        setResults={setResultsPage}
        url={url}
      />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.search;
  const { locale } = context;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let results;
  try {
    let url = `https://api.themoviedb.org/3/search/multi?query=${query.toLowerCase()}&include_adult=false&language=${locale}`;
    const response = await fetch(url, options);
    results = await response.json();
  } catch (error) {
    console.log(error);
  }

  return { props: { results, query } };
};

export default SearchPage;
