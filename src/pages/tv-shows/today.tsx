import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import { TVShowListing, Genre, TypeOfObj } from "@/models/types";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import { useState } from "react";
import { FilterProvider } from "@/contexts/FilterContext";

const inter = Inter({ subsets: ["latin"] });

type TodayTVProps = {
  airing_today: TVShowListing;
  categoriesArray: Genre[];
};

const TodayTVPage: React.FC<TodayTVProps> = ({
  airing_today,
  categoriesArray,
}) => {
  const [resultsPage, setResultsPage] = useState<TVShowListing>(airing_today);
  const [contents, setContents] = useState<any>(airing_today.results);
  const [page, setPage] = useState<number>(1);
  const url = `https://api.themoviedb.org/3/tv/airing_today?language=en-US`;

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
            type={TypeOfObj.TV}
          />
        </section>
      </main>
    </FilterProvider>
  );
};

export default TodayTVPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let airing_today;
  let categoriesObj;
  let categoriesArray;
  try {
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      options
    );

    const response3 = await fetch(
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
      options
    );

    categoriesObj = await response1.json();
    airing_today = await response3.json();

    const categories = categoriesObj?.genres;
    categoriesArray = categoriesObj?.genres;
    airing_today = createCategory(airing_today, categories);
  } catch (error) {
    console.log(error);
  }

  return { props: { airing_today, categoriesArray } };
};
