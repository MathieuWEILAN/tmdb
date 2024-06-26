import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import { MovieListing, Genre, TypeOfObj } from "@/models/types";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import { useState } from "react";
import { FilterProvider } from "../../contexts/FilterContext";

const inter = Inter({ subsets: ["latin"] });

type PopularProps = {
  popular: MovieListing;
  categoriesArray: Genre[];
  locale: string;
};

const PopularPage: React.FC<PopularProps> = ({
  popular,
  categoriesArray,
  locale,
}) => {
  const [resultsPage, setResultsPage] = useState<MovieListing>(popular);
  const [contents, setContents] = useState<any>(popular.results);
  const [page, setPage] = useState<number>(1);
  const url = `https://api.themoviedb.org/3/movie/popular?language=${locale}`;

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
          <SliderCategorie
            handlePageClick={handlePageClick}
            type={TypeOfObj.MOVIE}
          />
        </section>
      </main>
    </FilterProvider>
  );
};

export default PopularPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let popular;
  let categoriesObj;
  let categoriesArray;
  try {
    const response1 = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=${locale}`,
      options
    );

    const response3 = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=${locale}&page=1`,
      options
    );

    categoriesObj = await response1.json();
    popular = await response3.json();

    const categories = categoriesObj?.genres;
    categoriesArray = categoriesObj?.genres;
    popular = createCategory(popular, categories);
  } catch (error) {
    console.log(error);
  }

  return { props: { popular, categoriesArray } };
};
