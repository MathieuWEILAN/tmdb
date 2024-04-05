import { GetServerSideProps } from "next";
import CardCast from "@/components/Cards/CardCast";
import BannerPageMovie from "@/components/Banners/BannerPageMovie";
import Similar from "@/components/Similar";
import SocialMedias from "@/components/SocialMedias";
import Keywords from "@/components/Keywords";
import Collections from "@/components/Collections";
import ModalProviders from "@/components/ModalProviders";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { UserContext } from "@/contexts/UserContext";

import {
  CrewMember,
  TypeOfObj,
  Movie,
  MovieDetails,
  MovieListing,
  ReviewsListing,
  CastMemberListing,
  ImagesListing,
  VideosListing,
  KeywordsType,
  ProvidersListing,
  SocialMediasType,
  MovieCollection,
} from "@/models/types";
import { slugify, createCategory } from "@/lib/utils";
import Media from "@/components/Medias";

import SectionCategory from "@/components/SectionCategorie";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Reviews from "@/components/Reviews";

type Provider = {
  id: number;
  results: any;
};
type FilmProps = {
  movieData: MovieDetails;
  recommandations: MovieListing;
  similar: MovieListing;
  reviews: ReviewsListing;
  credits: CastMemberListing;
  images: ImagesListing;
  videos: VideosListing;
  keywords: KeywordsType;
  providers: Provider;
  socials: SocialMediasType;
  movieCollection: MovieCollection;
  isFavorite: boolean;
};
const FilmPage: React.FC<FilmProps> = ({
  movieData,
  credits,
  images,
  recommandations,
  reviews,
  similar,
  videos,
  keywords,
  socials,
  movieCollection,
  providers,
  isFavorite,
}) => {
  const { crew, cast } = credits;
  const [isModal, setIsModal] = useState<boolean>(false);
  const { locale } = useRouter();

  let providersResults;
  if (locale === "en-US") {
    providersResults = providers.results.US;
  } else if (locale === "fr-FR") {
    providersResults = providers.results.FR;
  } else if (locale === "es-ES") {
    providersResults = providers.results.ES;
  }
  console.log("PROVIDERS", providersResults, providers);
  return (
    <section className="flex flex-col h-auto w-full">
      <BannerPageMovie
        movie={movieData}
        credits={credits}
        videos={videos}
        type={!movieData.title ? TypeOfObj.TV : TypeOfObj.MOVIE}
        crew={crew}
        cast={cast}
      />
      <div className="flex flex-col  lg:flex-row container mx-auto px-5">
        <div className="flex flex-col w-full lg:w-4/5 order-2 lg:order-1 lg:pr-5">
          <div className="my-10">
            <h2>Casting</h2>
            <div className="mx-auto w-full flex flex-nowrap overflow-auto no-scrollbar">
              {credits.cast.slice(0, 10).map((cast) => {
                return <CardCast key={cast.id} cast={cast} />;
              })}
            </div>
          </div>
          {videos.results.length > 0 && (
            <Media videos={videos} images={images} />
          )}

          {similar?.results.length > 0 && <Similar similars={similar} />}
          {reviews.results.length > 0 && <Reviews {...reviews} />}
          {movieCollection && <Collections {...movieCollection} />}
        </div>

        <aside className="order-1 lg:order-2 w-full lg:w-1/5 p-5 my-10 rounded-xl box-shadow-2 h-auto">
          {socials && <SocialMedias {...socials} />}
          <>
            <h3 className="font-bold mt-5">
              {wording(locale, "release_date")}
            </h3>
            <p>{movieData.release_date}</p>
            <h3 className="font-bold mt-5"> {wording(locale, "revenue")}:</h3>
            <p>{movieData.revenue.toLocaleString(locale)} $</p>
            <h3 className="font-bold mt-5">{wording(locale, "budget")}:</h3>
            <p>{movieData.budget.toLocaleString(locale)} $</p>
          </>
          <Keywords {...keywords} />
        </aside>
      </div>
      {providersResults !== undefined && (
        <button
          onClick={() => {
            setIsModal(!isModal);
          }}
          className="z-50 fixed bottom-[40px] right-[40px] rounded-full py-2 px-4 bg-black text-white"
        >
          {wording(locale, "watch_film")}
        </button>
      )}
      {providersResults !== undefined && (
        <button
          onClick={() => {
            setIsModal(!isModal);
          }}
          className="z-50 fixed bottom-[40px] right-[40px] rounded-full py-2 px-4 bg-black text-white"
        >
          {wording(locale, "watch_film")}{" "}
        </button>
      )}

      {isModal && (
        <ModalProviders setIsModal={setIsModal} providers={providersResults} />
      )}
    </section>
  );
};

export default FilmPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.query.id;
  const locale = context.locale;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  const url = `
    https://api.themoviedb.org/3/movie/${movieId}?language=${locale}`;
  let movieData;
  let categoriesObj;
  let credits;
  let images;
  let recommandations;
  let reviews;
  let similar;
  let videos;
  let keywords;
  let providers;
  let socials;
  let movieCollection;
  let isFavorite = false;
  try {
    const response = await fetch(url, options);
    const response1 = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=${locale}`,
      options
    );

    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${locale}`,
      options
    );
    const response3 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      options
    );
    const response4 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=${locale}&page=1`,
      options
    );
    const response5 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=${locale}&page=1`,
      options
    );
    const response6 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=${locale}&page=1`,
      options
    );
    const response7 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=${locale}`,
      options
    );

    const response8 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/keywords`,
      options
    );

    const response9 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
      options
    );

    const response10 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
      options
    );

    movieData = await response.json();
    categoriesObj = await response1.json();
    credits = await response2.json();
    images = await response3.json();
    recommandations = await response4.json();
    reviews = await response5.json();
    similar = await response6.json();
    videos = await response7.json();
    keywords = await response8.json();
    providers = await response9.json();
    socials = await response10.json();

    // if (movieData?.belongs_to_collection) {
    //   const response11 = await fetch(
    //     `https://api.themoviedb.org/3/collection/${movieData.belongs_to_collection.id}?language=${locale}`,
    //     options
    //   );
    //   movieCollection = await response11.json();
    // }
    const session = await getSession({ req: context.req });
    if (session) {
      const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
      });
      const checkFavorites = favorites.find(
        (favorite: any) => favorite.idMovie === movieData?.id
      );
      if (checkFavorites) {
        console.log("CHECK FAVORITE", checkFavorites);
        isFavorite = true;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      movieData,
      credits,
      images,
      recommandations,
      reviews,
      similar,
      videos,
      keywords,
      providers,
      socials,
      // movieCollection,
      isFavorite,
    },
  };
};
