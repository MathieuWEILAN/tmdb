import type { GetServerSideProps } from "next";
import { createCategory } from "@/lib/utils";
import { MovieListing, Movie, TypeOfObj } from "@/models/types";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import CardMovie from "@/components/Cards/CardMovie";
import SeeMoreButton from "@/components/Button/SeeMoreButton";
type SearchProps = {
  results: MovieListing;
  query: string;
};

const SearchPage: React.FC<SearchProps> = ({ results, query }) => {
  const [resultsPage, setResultsPage] = useState<MovieListing | undefined>(
    undefined
  );
  useEffect(() => {
    setResultsPage(results);
  }, [results]);
  const url = `https://api.themoviedb.org/3/search/movie?query=${query.toLowerCase()}&include_adult=false&language=${
    lang.id
  }`;

  console.log(resultsPage);
  return (
    <section className="container mx-auto">
      <h2 className="my-10">
        Votre recherche : <q className="font-normal">{query}</q>{" "}
        <span className="italic font-normal text-2xl">
          ({resultsPage?.total_results} Résultats trouvés)
        </span>
      </h2>

      <div className="flex flex-wrap w-full gap-5 justify-start">
        {resultsPage?.results.map((movie: Movie, index: number) => {
          return (
            <CardMovie
              key={movie.id}
              movie={movie}
              type={movie.title ? TypeOfObj.MOVIE : TypeOfObj.TV}
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
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let responseJson;
  let categoriesObj;
  let results;
  try {
    let url = `https://api.themoviedb.org/3/search/movie?query=${query.toLowerCase()}&include_adult=false&language=${
      lang.id
    }&page=1`;

    const response = await fetch(url, options);

    responseJson = await response.json();
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    categoriesObj = await response1.json();
    const categories = categoriesObj?.genres;
    results = createCategory(responseJson, categories);
    results.results.filter((cat) => cat.original_language === "fr");
  } catch (error) {
    console.log(error);
  }

  return { props: { results, query } };
};

export default SearchPage;
