import { Movie, TVShow, TypeOfObj } from "@/models/types";
import Image from "next/image";
import Rating from "../Rating";
import LikeIcon from "@/assets/icons/LikeIcon";
import Link from "next/link";

const CardMovie: React.FC<{ movie: Movie | TVShow; type: TypeOfObj }> = ({
  movie,
  type,
}) => {
  const href = `/film/${movie.id}`;
  console.log("CardMovie", movie);
  return (
    <Link
      href={{
        pathname: `/${type === TypeOfObj.MOVIE ? "film" : "tv"}/${movie.id}`,
      }}
      className="rounded-lg shadow-xl w-[180px] h-[400px] flex flex-col relative cursor-pointer scale-95 hover:scale-100 transition-transform ease-in"
    >
      <LikeIcon className="absolute top-[10px] left-[10px]" movie={movie} />
      {movie?.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt=""
          width={100}
          height={100}
          className="object-contain object-center h-72 w-full rounded-tl-xl"
        />
      ) : (
        <div className="h-72 w-full bg-stone-950 rounded-tl-xl"></div>
      )}

      <div className="h-full w-full py-1 px-2.5 flex flex-col justify-between rounded-br-xl">
        <div>
          <Rating
            rate={movie?.vote_average}
            className="absolute -top-[20px] -right-[20px]"
          />
          <h3 className="text-base font-bold">
            {type === TypeOfObj.MOVIE ? movie?.title : movie?.original_name}
          </h3>
          <span className="text-sm italic">
            {type === TypeOfObj.MOVIE
              ? movie?.release_date
              : movie?.first_air_date}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default CardMovie;
