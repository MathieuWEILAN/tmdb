import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import { TVShowListing, Genre, TypeOfObj } from "@/models/types";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import { useState } from "react";
import { FilterProvider } from "@/contexts/FilterContext";

const inter = Inter({ subsets: ["latin"] });

type OnTheAirProps = {
  on_the_air: TVShowListing;
  categoriesArray: Genre[];
};

const OnTheAirPage: React.FC<OnTheAirProps> = ({
  on_the_air,
  categoriesArray,
}) => {
  const [resultsPage, setResultsPage] = useState<TVShowListing>(on_the_air);
  const [contents, setContents] = useState<any>(on_the_air.results);
  const [page, setPage] = useState<number>(1);
  const url = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US`;

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

export default OnTheAirPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let on_the_air;
  let categoriesObj;
  let categoriesArray;
  try {
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      options
    );

    const response3 = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      options
    );

    categoriesObj = await response1.json();
    on_the_air = await response3.json();

    const categories = categoriesObj?.genres;
    categoriesArray = categoriesObj?.genres;
    on_the_air = createCategory(on_the_air, categories);
  } catch (error) {
    console.log(error);
  }

  return { props: { on_the_air, categoriesArray } };
};
