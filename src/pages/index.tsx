import Image from "next/image";
import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { Movie, MovieListing, Categories, Genre } from "@/models/types";
import SectionCategory from "@/components/SectionCategorie";
import BasicButton from "@/components/Button/BasicButton";
import { headers } from "next/headers";
import SliderCategorie from "@/components/SliderCategorie";
import { createCategory } from "@/lib/utils";
import { KeyObjectType } from "crypto";
const inter = Inter({ subsets: ["latin"] });

type HomeProps = {
  nowPlaying: MovieListing;
  categories: Categories[];
  popular: MovieListing;
  topRated: MovieListing;
};

const Home: React.FC<HomeProps> = ({
  popular,
  nowPlaying,
  topRated,
  categories,
}) => {
  return (
    <main
      className={`flex min-h-screen flex-col justify-between ${inter.className} w-full`}
    >
      <section className="mb-10">
        <h2 className="text-center">Actuellemment à l'affiche</h2>
        <SliderCategorie array={nowPlaying.results} />
      </section>
      <section className="mb-10">
        {" "}
        <h2 className="text-center">Les films les plus populaires</h2>
        <SliderCategorie array={popular.results} />
      </section>
      <section className="mb-10">
        {" "}
        <h2 className="text-center">Les films les mieux notés</h2>
        <SliderCategorie array={topRated.results} />
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let responseJson;
  let nowPlaying;
  let popular;
  let categoriesObj;
  let categories;
  let topRated;
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication",
      options
    );

    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    const response2 = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );

    const response3 = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    const response4 = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );

    responseJson = await response.json();
    categoriesObj = await response1.json();
    nowPlaying = await response2.json();
    popular = await response3.json();
    topRated = await response4.json();

    const categories = categoriesObj?.genres;

    nowPlaying = createCategory(nowPlaying, categories);
    popular = createCategory(popular, categories);
    topRated = createCategory(topRated, categories);
  } catch (error) {
    console.log(error);
  }

  return { props: { nowPlaying, popular, topRated } };
};
