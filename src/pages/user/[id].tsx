import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { wording } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CardMovie from "@/components/Cards/CardMovie";
import { useSession } from "next-auth/react";
import { MovieDetails, TypeOfObj } from "@/models/types";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useEffect } from "react";

type UserProps = {
  userFav: MovieDetails[];
};
const UserPage: React.FC<UserProps> = ({ userFav }) => {
  const { data: session, status } = useSession();
  const { favorites } = useContext(UserContext);
  const { locale } = useRouter();
  console.log("USER PAGE FAVORITES", favorites);
  if (status !== "authenticated") {
    return <div>Veuillez vous connecter</div>;
  }
  useEffect(() => {}, [favorites]);

  return (
    <section className="flex flex-col h-auto w-full">
      <h1>
        {wording(locale, "welcome")}
        {session?.user?.name}
      </h1>
      <div>
        <h2>{wording(locale, "favorites")}</h2>
        <div className="w-full flex flex-wrap">
          {favorites.map((item, i) => {
            return (
              <CardMovie
                key={item.id}
                item={item}
                type={TypeOfObj.MOVIE}
                idItem={item.idItem}
              />
            );
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
        `https://api.themoviedb.org/3/movie/${fav.idItem}?language=${locale}`,
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
