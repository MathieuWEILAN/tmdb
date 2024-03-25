import Image from "next/image";
import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { Movie, MovieListing, Categories, Genre } from "@/models/types";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";

const inter = Inter({ subsets: ["latin"] });

type PopularProps = {
  popular: MovieListing;
};

const PopularPage: React.FC<PopularProps> = ({ popular }) => {
  const [resultsPage, setResultsPage] = useState<MovieListing>(popular);

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US`;

  return (
    <main
      className={`flex min-h-screen flex-col justify-between ${inter.className} w-full`}
    >
      <section className="mb-8">
        <SliderCategorie array={resultsPage?.results} />
        <Pagination infos={popular} setResults={setResultsPage} url={url} />
      </section>
    </main>
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