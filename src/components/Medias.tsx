import { VideosListing, ImagesListing, VideoPreview } from "@/models/types";
import { useState } from "react";
import BannerVideo from "../components/Banners/BannerVideo";
const Media = ({
  videos,
  images,
}: {
  videos: VideosListing;
  images: ImagesListing;
}) => {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const [selected, setSelected] = useState<VideoPreview | null>(null);
  const handleVideo = (video: VideoPreview) => {
    setSelected(video);
    setIsPlayed(true);
  };
  return (
    <article className="w-full my-10">
      <h2 className="container mx-auto w-full mb-5">Videos</h2>
      <div className="container mx-auto w-full flex flex-nowrap overflow-auto no-scrollbar">
        {videos.results.slice(0, 5).map((video) => {
          return (
            <div
              key={video.id}
              className="w-96 h-60 rounded-lg overflow-hidden mx-1 shrink-0 relative"
              onClick={() => handleVideo(video)}
            >
              <iframe
                className="w-full h-full inset-0 "
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                onClick={() => handleVideo(video)}
              ></iframe>
              <div
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                onClick={() => handleVideo(video)}
              ></div>
            </div>
          );
        })}
      </div>

      {isPlayed && videos && (
        <BannerVideo
          video={selected}
          isPlayed={isPlayed}
          setIsPlayed={setIsPlayed}
        />
      )}
    </article>
  );
};
export default Media;
