import { useEffect } from "react";

const Video = ({ videoUrl }: { videoUrl: string; mouseOut?: any }) => {
  let newVideoUrl = videoUrl;

  if (videoUrl.includes("youtube")) {
    newVideoUrl = videoUrl + `&autoplay=1`;
  }

  return (
    <div className="relative w-full flex items-start justify-center">
      <iframe
        src={newVideoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-[315px]"
      ></iframe>
      <div className="iframe-overlay w-full h-full absolute top-0 left-0 pointer-events-none"></div>
    </div>
  );
};

export default Video;
