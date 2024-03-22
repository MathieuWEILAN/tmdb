import Image from "next/image";
import { Inter } from "next/font/google";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { OrganicResult } from "@/models/types";
import SectionCategory from "@/components/SectionCategorie";

const inter = Inter({ subsets: ["latin"] });

type HomeProps = { allFilms: OrganicResult[] };

const Home: React.FC<HomeProps> = ({ allFilms }) => {
  return (
    <main
      className={`flex min-h-screen flex-col justify-between ${inter.className} w-full`}
    >
      {allFilms.map((cat, i) => (
        <SectionCategory
          key={i}
          title={cat.title}
          subtitle={cat?.subtitle}
          array={cat.items}
        />
      ))}
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `${process.env.SERP_API_BASE_URL}&api_key=${process.env.SERP_API_KEY}`;

  const filmsResponse = await fetch(url);
  if (!filmsResponse.ok) {
    throw new Error("Failed to fetch films.");
  }
  const films = await filmsResponse.json();
  const allFilms = films.organic_results;

  return { props: { allFilms } };
};
