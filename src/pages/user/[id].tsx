import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import SliderCategorie from "@/components/SliderCategorie";
import { useRouter } from "next/router";
import { wording } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  TypeOfObj,
  Movie,
  TVShowDetails,
  MovieDetails,
  MovieListing,
  ReviewsListing,
  CastMemberListing,
  ImagesListing,
  VideosListing,
  KeywordsType,
} from "@/models/types";

import { slugify, createCategory } from "@/lib/utils";

import React from "react";
import Image from "next/image";

type UserProps = {
  userFav: MovieDetails[];
};
const UserPage: React.FC<UserProps> = ({ userFav }) => {
  const { data: session, status } = useSession();
  const { locale } = useRouter();

  if (status !== "authenticated") {
    return <div>Veuillez vous connecter</div>;
  }
  return (
    <section className="flex flex-col h-auto w-full">
      <h1>
        {wording(locale, "welcome")}
        {session?.user?.name}
      </h1>
      <div>
        <h2>{wording(locale, "favorites")}</h2>
        <div className="w-full flex flex-wrap">
          {userFav.map((item, i) => {
            return <div key={item.id}>{item.title}</div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let userFav;
  try {
    const session = await getSession({ req: context.req });
    if (!session) {
      throw new Error("Vous devez être connecté.");
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
    });

    const movieDetailsRequests = favorites.map(async (fav) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${fav.idMovie}?language=${locale}`,
        options
      );
      const data = await response.json();
      return data;
    });

    userFav = await Promise.all(movieDetailsRequests);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { userFav },
  };
};
