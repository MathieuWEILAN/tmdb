import { GetServerSideProps } from "next";
import CardCast from "@/components/Cards/CardCast";
import BannerVideo from "@/components/Banners/BannerVideo";
import BannerPageMovie from "@/components/Banners/BannerPageMovie";
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
  Keywords,
} from "@/models/types";
import { slugify, createCategory } from "@/lib/utils";

import React from "react";
import Image from "next/image";

type FilmProps = {
  tvShowData: TVShowDetails;
  recommandations: MovieListing;
  similar: MovieListing;
  reviews: ReviewsListing;
  credits: CastMemberListing;
  images: ImagesListing;
  videos: VideosListing;
  keywords: Keywords;
};
const FilmPage: React.FC<FilmProps> = ({
  tvShowData,
  credits,
  images,
  recommandations,
  reviews,
  similar,
  videos,
  keywords,
}) => {
  return (
    <section className="flex flex-col h-auto w-full">
      <BannerPageMovie
        movie={tvShowData}
        credits={credits}
        videos={videos}
        type={TypeOfObj.TV}
      />
      {/* <div className="flex container mx-auto overflow-auto">
        {credits.cast.slice(0, 10).map((cast) => {
          return <CardCast key={cast.id} cast={cast} />;
        })}
      </div> */}
    </section>
  );
};

export default FilmPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tvId = context.query.id;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  const url = `
    https://api.themoviedb.org/3/tv/${tvId}`;

  let tvShowData;
  let categoriesObj;
  let credits;
  let images;
  let recommandations;
  let reviews;
  let similar;
  let videos;
  let keywords;
  let providers;
  try {
    const response = await fetch(url, options);
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      options
    );

    const response2 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/credits?language=en-US`,
      options
    );
    const response3 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/images`,
      options
    );
    const response4 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=en-US&page=1`,
      options
    );
    const response5 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/reviews?language=en-US&page=1`,
      options
    );
    const response6 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/similar?language=en-US&page=1`,
      options
    );
    const response7 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`,
      options
    );

    const response8 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/keywords`,
      options
    );

    const response9 = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/watch/providers`,
      options
    );

    tvShowData = await response.json();
    categoriesObj = await response1.json();
    credits = await response2.json();
    images = await response3.json();
    recommandations = await response4.json();
    reviews = await response5.json();
    similar = await response6.json();
    videos = await response7.json();
    keywords = await response8.json();
    providers = await response9.json();

    tvShowData = createCategory(tvShowData, categoriesObj.genres);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      tvShowData,
      credits,
      images,
      recommandations,
      reviews,
      similar,
      videos,
      keywords,
      providers,
    },
  };
};
