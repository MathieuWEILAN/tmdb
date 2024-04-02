import { Movie, TVShow, TypeOfObj } from "@/models/types";
import Image from "next/image";
import Rating from "../Rating";
import LikeIcon from "@/assets/icons/LikeIcon";
import Link from "next/link";

const CardMovie: React.FC<{ item: Movie | TVShow; type: TypeOfObj }> = ({
  item,
  type,
}) => {
  return (
    <Link
      href={{
        pathname: `/${type}/${item.id}`,
      }}
      className="rounded-lg box-shadow-2 min-w-[180px] max-w-[180px] h-[400px] flex flex-col relative cursor-pointer scale-95 hover:scale-100 transition-transform ease-in bg-zinc-50"
    >
      {/* <LikeIcon className="absolute top-[10px] left-[10px]" item={item} /> */}
      {item?.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
          alt=""
          width={100}
          height={100}
          className="object-contain object-center h-72 w-full rounded-tl-xl rounded-tr-xl bg-black"
        />
      ) : (
        <div className="h-72 w-full bg-stone-950 rounded-tl-xl rounded-tr-xl"></div>
      )}

      <div className="h-full w-full py-1 px-2.5 flex flex-col justify-between rounded-br-xl">
        <div>
          <Rating
            rate={item?.vote_average}
            className="absolute -top-[20px] -right-[20px]"
          />
          <h3 className="text-base font-bold">
            {item?.title || item?.original_name || item?.name}
          </h3>
          <span className="text-sm italic">
            {item?.release_date ||
              item?.first_air_date ||
              item.known_for_department}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default CardMovie;
