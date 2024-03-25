import { Movie } from "@/models/types";
import Image from "next/image";
import Rating from "../Rating";
import LikeIcon from "@/assets/icons/LikeIcon";
import Link from "next/link";
const CardMovie: React.FC<{ movie: Movie }> = ({ movie }) => {
  const href = `/film/${movie.id}`;
  return (
    <Link
      href={{ pathname: `/film/${movie.id}` }}
      className="rounded-lg shadow-xl w-52 h-[400px] flex flex-col relative cursor-pointer scale-95 hover:scale-100 transition-transform ease-in"
    >
      <LikeIcon className="absolute top-[10px] left-[10px]" />
      {movie?.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt=""
          width={100}
          height={100}
          className="object-cover object-center h-72 w-full rounded-tl-xl"
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
          <h3 className="text-base font-bold">{movie?.title}</h3>
          <span className="text-sm italic">{movie?.release_date}</span>
        </div>
      </div>
    </Link>
  );
};
export default CardMovie;
