import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import { MovieListing } from "@/models/types";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import { useState } from "react";
import { FilterProvider } from "../contexts/FilterContext";

const inter = Inter({ subsets: ["latin"] });

type PopularProps = {
  popular: MovieListing;
};

const PopularPage: React.FC<PopularProps> = ({ popular }) => {
  const [resultsPage, setResultsPage] = useState<MovieListing>(popular);
  const [contents, setContents] = useState<any>(popular.results);
  const [page, setPage] = useState<number>(1);

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US`;

  const handlePageClick = async () => {
    const response = await fetch(`/api/tmdbapi?name=${url}&page=${page + 1}`);
    const newResponse = await response.json();
    if (newResponse.results.length === 0) return;
    setResultsPage(newResponse);
    setContents([...contents, ...newResponse.results]);
    setPage(page + 1);
    return newResponse;
  };

  console.log("POPULAR", contents, page, resultsPage, popular);
  return (
    <FilterProvider value={contents}>
      <main
        className={`flex min-h-screen flex-col justify-between ${inter.className} w-full`}
      >
        <section className="mb-8">
          <SliderCategorie
            // arrayContents={contents}
            handlePageClick={handlePageClick}
          />
        </section>
      </main>
    </FilterProvider>
  );
};

export default PopularPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let popular;
  let categoriesObj;
  try {
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    const response3 = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    categoriesObj = await response1.json();
    popular = await response3.json();

    const categories = categoriesObj?.genres;

    popular = createCategory(popular, categories);
  } catch (error) {
    console.log(error);
  }

  return { props: { popular } };
};
