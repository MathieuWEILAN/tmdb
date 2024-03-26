import { Movie, VideosListing } from "@/models/types";
import Image from "next/image";
import Tag from "../Tag";
import { convertToPercentage } from "../../lib/utils";
import PlayIcon from "@/assets/icons/PlayIcon";
import { useState } from "react";
import CloseIcon from "@/assets/icons/CloseIcon";

const BannerVideo = ({
  videos,
  isPlayed,
  setIsPlayed,
}: {
  videos: VideosListing | null;
  isPlayed?: boolean;
  setIsPlayed?: any;
}) => {
  let trailer = videos?.results.find(
    (video) => video.name === "Official Trailer"
  );
  console.log("CLICK VIDEO");
  if (!trailer) {
    trailer = videos?.results[0];
  }

  return (
    <div className="banner w-screen h-screen z-[100] bg-stone-950 fixed top-0 bg-opacity-90">
      <div className="relative h-full w-full flex items-center justify-center">
        <CloseIcon
          className="absolute top-[30px] right-[30px] cursor-pointer"
          onClick={() => setIsPlayed(false)}
        />
        <div className={`h-[300px] md:h-[720px] w-[1080px]`}>
          {isPlayed && trailer && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover object-center"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerVideo;
