import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import { MovieListing, Genre } from "@/models/types";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import { useState } from "react";
import { FilterProvider } from "../contexts/FilterContext";

const inter = Inter({ subsets: ["latin"] });

type TopRatedProps = {
  top_rated: MovieListing;
  categoriesArray: Genre[];
};

const TopRatedPage: React.FC<TopRatedProps> = ({
  top_rated,
  categoriesArray,
}) => {
  const [resultsPage, setResultsPage] = useState<MovieListing>(top_rated);
  const [contents, setContents] = useState<any>(top_rated.results);
  const [page, setPage] = useState<number>(1);
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US`;

  const handlePageClick = async () => {
    const response = await fetch(`/api/tmdbapi?name=${url}&page=${page + 1}`);
    const newResponse = await response.json();
    if (newResponse.results.length === 0) return;
    setResultsPage(newResponse);
    setContents([...contents, ...newResponse.results]);
    setPage(page + 1);
    return newResponse;
  };

  return (
    <FilterProvider value={contents} categories={categoriesArray}>
      <main
        className={`flex min-h-screen flex-col justify-between ${inter.className} w-full`}
      >
        <section className="mb-8">
          <SliderCategorie handlePageClick={handlePageClick} />
        </section>
      </main>
    </FilterProvider>
  );
};

export default TopRatedPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let top_rated;
  let categoriesObj;
  let categoriesArray;
  try {
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    const response3 = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );

    categoriesObj = await response1.json();
    top_rated = await response3.json();

    const categories = categoriesObj?.genres;
    categoriesArray = categoriesObj?.genres;
    top_rated = createCategory(top_rated, categories);
  } catch (error) {
    console.log(error);
  }

  return { props: { top_rated, categoriesArray } };
};
