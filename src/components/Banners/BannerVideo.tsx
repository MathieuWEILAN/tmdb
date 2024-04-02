import { VideoPreview } from "@/models/types";
import CloseIcon from "@/assets/icons/CloseIcon";

const BannerVideo = ({
  video,
  isPlayed,
  setIsPlayed,
}: {
  video: VideoPreview | null;
  isPlayed?: boolean;
  setIsPlayed?: any;
}) => {
  return (
    <div className="banner w-screen h-screen z-[100] bg-stone-950 fixed top-0 bg-opacity-90 left-0">
      <div className="relative h-full w-full flex items-center justify-center">
        <CloseIcon
          className="absolute top-[30px] right-[30px] cursor-pointer"
          onClick={() => setIsPlayed(false)}
          stroke="white"
        />
        <div className={`h-[300px] md:h-[720px] w-[1080px]`}>
          {isPlayed && video && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
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
