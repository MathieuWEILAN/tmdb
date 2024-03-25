import { Movie } from "@/models/types";
import Image from "next/image";
import Tag from "../Tag";
import { convertToPercentage } from "../../lib/utils";
import Rating from "../Rating";
import Link from "next/link";

const Banner = ({ movie }: { movie: Movie | null }) => {
  return (
    <div className="banner w-full h-[600px] relative">
      <div className="absolute z-10 h-80 w-96 bg-stone-950 bg-opacity-80 text-white p-6 rounded-xl bottom-[20px] left-[20px] flex flex-col justify-between">
        <div className="">
          {movie?.genre_name?.map((name) => {
            return <Tag key={name.id} name={name.name} id={name.id} />;
          })}
          <Rating
            rate={movie?.vote_average}
            className="absolute -top-[20px] -right-[20px]"
          />
          <h2 className="h-auto mt-2.5">{movie?.title}</h2>
          <span className="text-sm">{movie?.release_date}</span>
        </div>
        <p className="mt-2.5 h-auto line-clamp-3">{movie?.overview}</p>
        <Link
          href={{ pathname: `film/${movie?.id}` }}
          className="w-full text-right mt-2.5"
        >
          En savoir plus
        </Link>
      </div>

      {movie?.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt=""
          width={1000}
          height={800}
          className="w-full h-full object-cover object-center"
        />
      )}
    </div>
  );
};

export default Banner;
