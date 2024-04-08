import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { wording } from "@/lib/utils";
import prisma from "@/lib/prisma";
import CardMovie from "@/components/Cards/CardMovie";
import { useSession, getSession, signIn } from "next-auth/react";
import { MovieDetails, TVShowDetails, TypeOfObj } from "@/models/types";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useEffect } from "react";

type UserProps = {
  userFav: MovieDetails[] | TVShowDetails[];
  userToWatch: MovieDetails[] | TVShowDetails[];
};
const UserPage: React.FC<UserProps> = ({ userFav, userToWatch }) => {
  const { data: session, status } = useSession();
  const { favorites, toWatch } = useContext(UserContext);
  const { locale } = useRouter();
  const handleSignUp = async () => {
    signIn();
  };

  if (status !== "authenticated") {
    return (
      <div className="container mx-auto flex items-center justify-center h-full w-full my-20">
        <button
          onClick={handleSignUp}
          className="border p-4 rounded-xl box-shadow-2 hover:scale-105 transition-transform ease-in-out duration-300"
        >
          Veuillez vous connecter
        </button>
      </div>
    );
  }
  return (
    <section className="flex flex-col h-auto w-full container mx-auto">
      <h1 className="text-[42px] flex items-center my-10 justify-center space-x-4 font-bold">
        {wording(locale, "welcome")}&nbsp;
        {session?.user?.name}
      </h1>
      {/* favorites */}
      {userFav.length > 0 && (
        <div className="my-10">
          <h2>{wording(locale, "favorites")}</h2>
          <div className="w-full flex flex-wrap my-10 gap-4">
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
      )}
      {/* to watch */}
      {userToWatch.length > 0 && (
        <div className="my-10">
          <h2>{wording(locale, "favorites")} A VOIR</h2>
          <div className="w-full flex flex-wrap my-10 gap-4">
            {toWatch.map((item, i) => {
              return (
                <CardMovie
                  key={`to-watch-${item.id}`}
                  item={item}
                  type={TypeOfObj.MOVIE}
                  idItem={item.idItem}
                />
              );
            })}
          </div>
        </div>
      )}
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
  let userFav = [];
  let userToWatch = [];
  try {
    const session = await getSession({ req: context.req });
    if (!session) {
      throw new Error("Vous devez être connecté.");
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
    });
    const toWatch = await prisma.toWatch.findMany({
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

    const movieDetailsRequestsToWatch = toWatch.map(async (fav) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${fav.idItem}?language=${locale}`,
        options
      );
      const data = await response.json();
      return data;
    });

    userFav = await Promise.all(movieDetailsRequests);
    userToWatch = await Promise.all(movieDetailsRequestsToWatch);
  } catch (error) {
    console.log(error);
  }
  return {
    props: { userFav, userToWatch },
  };
};
