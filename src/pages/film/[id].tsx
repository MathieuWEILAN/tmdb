import { GetServerSideProps } from "next";
import CardCast from "@/components/Cards/CardCast";
import BannerVideo from "@/components/Banners/BannerVideo";
import BannerPageMovie from "@/components/Banners/BannerPageMovie";
import {
  Movie,
  MovieDetails,
  MovieListing,
  ReviewsListing,
  CastMemberListing,
  ImagesListing,
  VideosListing,
} from "@/models/types";
import { slugify, createCategory } from "@/lib/utils";

import SectionCategory from "@/components/SectionCategorie";
import React from "react";
import Image from "next/image";

type FilmProps = {
  movieData: MovieDetails;
  recommandations: MovieListing;
  similar: MovieListing;
  reviews: ReviewsListing;
  credits: CastMemberListing;
  images: ImagesListing;
  videos: VideosListing;
};
const FilmPage: React.FC<FilmProps> = ({
  movieData,
  credits,
  images,
  recommandations,
  reviews,
  similar,
  videos,
}) => {
  return (
    <section className="flex flex-col">
      <BannerPageMovie movie={movieData} credits={credits} videos={videos} />

      <div className="flex container mx-auto">
        {credits.cast.slice(0, 10).map((cast) => {
          return <CardCast key={cast.id} cast={cast} />;
        })}
      </div>
    </section>
  );
};

export default FilmPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.query.id;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  const url = `
    https://api.themoviedb.org/3/movie/${movieId}`;

  let movieData;
  let categoriesObj;
  let credits;
  let images;
  let recommandations;
  let reviews;
  let similar;
  let videos;
  try {
    const response = await fetch(url, options);
    const response1 = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      options
    );
    const response3 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      options
    );
    const response4 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      options
    );
    const response5 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
      options
    );
    const response6 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      options
    );
    const response7 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
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

    movieData = createCategory(movieData, categoriesObj.genres);
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
    },
  };
};
