import { GetServerSideProps } from "next";
import CardCast from "@/components/Cards/CardCast";
import BannerVideo from "@/components/Banners/BannerVideo";
import BannerPageMovie from "@/components/Banners/BannerPageMovie";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
import CardMovie from "@/components/Cards/CardMovie";
import Filmography from "@/components/Filmography";
import TVShowgraphy from "@/components/TVShowgraphy";
import Carousel from "@/components/Carousel";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import IMDBIcon from "@/assets/icons/IMDBIcon";
import XIcon from "@/assets/icons/XIcon";
import TikTokIcon from "@/assets/icons/TikTokIcons";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import {
  TypeOfObj,
  PersonDetails,
  PersonCredits,
  SocialMediasType,
  ImagesListing,
  CastMemberListing,
  Movie,
} from "@/models/types";

import React, { useState } from "react";
import Image from "next/image";

type PersonProps = {
  personData: PersonDetails;
  credits: PersonCredits;
  images: ImagesListing;
  medias: SocialMediasType;
  tv_credits: CastMemberListing;
  movie_credits: CastMemberListing;
};
const PersonPage: React.FC<PersonProps> = ({
  personData,
  credits,
  images,
  medias,
  tv_credits,
  movie_credits,
}) => {
  const [isMore, setIsMore] = useState<boolean>(false);

  const { locale } = useRouter();
  console.log("PERSON", personData);
  console.log("CREDITS", credits);
  const type = personData.known_for_department;

  let bestFilms: Movie[] = [];
  if (type === "Acting") {
    bestFilms = movie_credits.cast
      .filter((item: Movie) => item.order === 0)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  } else {
    bestFilms = movie_credits.crew
      .filter((item: Movie) => item.job === "Director")
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  }

  return (
    <section className="flex flex-col h-auto w-full container mx-auto my-10 px-4 md:px-0">
      <div className="w-full flex items-center flex-col md:items-start md:flex-row space-x-5 mt-32 md:mt-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${personData.profile_path}`}
          alt={personData.name}
          width={150}
          height={400}
          className="h-96 w-fit object-cover object-center rounded-lg"
        />
        <div className="!ml-0 md:!ml-4 mt-4">
          <div className="flex space-x-2.5 items-center">
            {medias.facebook_id && <FacebookIcon path={medias.facebook_id} />}
            {medias.instagram_id && (
              <InstagramIcon path={medias.instagram_id} />
            )}
            {medias.imdb_id && <IMDBIcon path={medias.imdb_id} />}
            {medias.twitter_id && <XIcon path={medias.twitter_id} />}
            {medias.youtube_id && <YoutubeIcon path={medias.youtube_id} />}
            {medias.tiktok_id && <TikTokIcon path={medias.tiktok_id} />}
          </div>
          <div className="">
            <h1 className="text-2xl md:text-[50px] !my-5 md:my-5 font-bold flex flex-col">
              {personData.name}
            </h1>
            <span className="font-normal italic text-lg">
              ({personData.known_for_department})
            </span>
          </div>
          <div className="flex items-center">
            {/* <p>{wording(locale, "born")}</p> */}
            <p>
              {personData.birthday} - &nbsp;
              {personData.deathday && `- ${personData.deathday}`}
            </p>
            <i>{personData.place_of_birth}</i>
          </div>
          <h3 className="font-bold text-3xl">{wording(locale, "biography")}</h3>
          <div className="flex flex-col justify-between">
            <p className={`${isMore ? "" : "line-clamp-6"} mt-2.5`}>
              {personData.biography}
            </p>
            <button
              onClick={() => setIsMore(!isMore)}
              className="hover:underline w-fit mt-2.5 self-end"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="my-10 w-full">
          <h3 className="text-3xl font-bold">{wording(locale, "known_for")}</h3>
          <div className="flex overflow-auto no-scrollbar py-5 space-x-4">
            {bestFilms.map((item: Movie) => {
              return (
                <CardMovie item={item} key={item.id} type={TypeOfObj.MOVIE} />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-x-2">
          {type === "Acting" && movie_credits.cast.length > 0 && (
            <Filmography movies={movie_credits.cast} type={type} />
          )}

          {type === "Acting" && tv_credits.cast.length > 0 && (
            <TVShowgraphy tvShows={tv_credits.cast} type={type} />
          )}
          {type !== "Acting" && movie_credits.crew.length > 0 && (
            <Filmography movies={movie_credits.crew} type={type} />
          )}
          {type !== "Acting" && tv_credits.crew.length > 0 && (
            <TVShowgraphy tvShows={tv_credits.crew} type={type} />
          )}
        </div>
        {images.profiles?.length > 0 && (
          <Carousel arrayImages={images.profiles} />
        )}
      </div>
    </section>
  );
};

export default PersonPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const personId = context.query.id;
  const { locale } = context;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  let personData;
  let credits;
  let images;
  let medias;
  let tv_credits;
  let movie_credits;
  try {
    const response = await fetch(
      `
    https://api.themoviedb.org/3/person/${personId}?language=${locale}`,
      options
    );

    const response2 = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?language=${locale}`,
      options
    );

    const response3 = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/images`,
      options
    );
    const response4 = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/external_ids?language=${locale}&page=1`,
      options
    );
    const response5 = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=${locale}&page=1`,
      options
    );
    const response6 = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/tv_credits?language=${locale}&page=1`,
      options
    );

    personData = await response.json();
    credits = await response2.json();
    images = await response3.json();
    medias = await response4.json();
    movie_credits = await response5.json();
    tv_credits = await response6.json();
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      personData,
      credits,
      images,
      medias,
      tv_credits,
      movie_credits,
    },
  };
};
