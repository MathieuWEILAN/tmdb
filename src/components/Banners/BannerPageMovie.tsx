import {
  MovieDetails,
  CastMemberListing,
  VideosListing,
  TypeOfObj,
  CastMember,
  CrewMember,
} from "@/models/types";
import Image from "next/image";
import Tag from "../Tag";
import {
  getTextColor,
  getYear,
  convertMinutesToHoursMinutes,
} from "../../lib/utils";
import Rating from "../Rating";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";
import BannerVideo from "./BannerVideo";
import BasicButton from "../Button/BasicButton";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
const BannerPageMovie = ({
  movie,
  credits,
  videos,
  type,
  cast,
  crew,
}: {
  movie: MovieDetails | null;
  credits: CastMemberListing;
  videos?: VideosListing;
  type: TypeOfObj;
  cast?: CastMember[];
  crew?: CrewMember[];
}) => {
  const [colorBg, setColorBg] = useState<string>("");
  const [colorText, setColorText] = useState<boolean>(false);
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const { locale } = useRouter();
  useEffect(() => {
    const bannerId = `banner-image-${movie?.id}`;
    const fac = new FastAverageColor();
    fac
      .getColorAsync(window.document.getElementById(bannerId))
      .then((color) => {
        setColorBg(color.hex.replace(/"/g, ""));
        const textColor = getTextColor(color.hex.replace(/"/g, ""));
        setColorText(textColor);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [movie]);

  const director = crew?.filter((c) => c?.job === "Director")[0];
  let video = videos?.results.find(
    (video) => video.name === "Official Trailer"
  );
  if (!video) {
    video = videos?.results[0];
  }

  return (
    <div
      className={`banner w-full h-auto md:h-[600px] relative md:m-0 ${
        colorText ? "text-white" : "text-stone-950"
      }`}
    >
      {/* BACKGROUND */}
      <div
        style={{ backgroundColor: colorBg }}
        className={`h-full w-full bg-[${colorBg}] pt-36`}
      >
        {movie?.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt=""
            width={1000}
            height={800}
            className={`absolute inset-0 w-full h-full top-0 object-cover object-center opacity-10`}
          />
        )}
        <div
          className={`w-full h-full md:h-[600px] top-[140px] md:top-0 md:absolute`}
        >
          <div className="container mx-auto w-full h-full md:py-10 flex flex-col md:flex-row items-center">
            {/* PARTIE GAUCHE */}
            <Image
              id={`banner-image-${movie?.id}`}
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt=""
              width={400}
              height={800}
              className="w-40 md:w-96 h-64 md:h-full object-cover object-center rounded-xl mx-4"
            />
            {/* PARTIE DROITE */}
            <div className="w-full mt-4 md:mt-0 px-4 md:px-0 md:px-5 lg:pl-10 justify-center space-y-2.5 flex flex-col">
              <div className="w-full overflow-auto flex no-scrollbar z-10 md:z-0">
                {movie?.genres.map((name) => {
                  return (
                    <Tag
                      key={name.id}
                      name={name.name}
                      id={name.id}
                      className={
                        colorText ? "border-white" : "border-stone-950"
                      }
                    />
                  );
                })}
              </div>
              <div className="flex space-x-2.5 items-center md:items-end">
                <h1 className="text-2xl md:text-[40px] font-bold">
                  {type === TypeOfObj.MOVIE
                    ? movie?.title
                    : movie?.original_name}
                </h1>
                {type === TypeOfObj.MOVIE && (
                  <span className="text-lg md:text-[40px]">
                    ({" "}
                    {getYear(
                      type === TypeOfObj.MOVIE
                        ? movie?.release_date
                        : movie?.first_air_date
                    )}
                    )
                  </span>
                )}
              </div>
              <span className="text-sm">
                {wording(locale, "release_date")}:
                {type === TypeOfObj.MOVIE
                  ? movie?.release_date
                  : movie?.first_air_date}
                - {wording(locale, "runtime")} :
                {convertMinutesToHoursMinutes(movie?.runtime || 0)}
              </span>
              <div className="flex items-center">
                <Rating
                  rate={movie?.vote_average}
                  className={`${
                    colorText ? "border-white" : "border-stone-950"
                  } bg-opacity-60`}
                />
                <span className="text-sm ml-2.5">
                  ({movie?.vote_count} {wording(locale, "votes")})
                </span>
              </div>
              {movie?.tagline && (
                <q className="italic opacity-70">{movie?.tagline}</q>
              )}
              <h3 className="text-xl font-bold">
                {wording(locale, "synopsis")}
              </h3>
              <p className="">{movie?.overview}</p>
              {movie?.homepage && (
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2.5">
                  <h3 className="text-lg font-bold">
                    {wording(locale, "official_site")} :
                  </h3>
                  <a
                    href={movie?.homepage}
                    className="hover:underline font-normal line-clamp-1 md:line-clamp-none z-10 md:z-0"
                    target="_blank"
                  >
                    {movie?.homepage}
                  </a>
                </div>
              )}
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2.5">
                <h3 className="text-lg font-bold">
                  {wording(locale, "realisator")} :
                </h3>
                <span className="font-normal">{director?.name}</span>
              </div>
              {videos && (
                <div className="w-full flex items-center justify-center md:justify-end z-10 md:z-0">
                  <BasicButton
                    onClick={() => {
                      setIsPlayed(true);
                    }}
                    className={colorText ? "border-white" : "border-stone-950"}
                  >
                    {wording(locale, "watch_trailer")}
                  </BasicButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPlayed && videos && (
        <BannerVideo
          video={video}
          isPlayed={isPlayed}
          setIsPlayed={setIsPlayed}
        />
      )}
    </div>
  );
};

export default BannerPageMovie;
