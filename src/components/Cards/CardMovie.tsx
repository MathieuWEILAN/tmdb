import { Movie, TVShow, PersonType, TypeOfObj } from "@/models/types";
import Image from "next/image";
import Rating from "../Rating";
import LikeIcon from "@/assets/icons/LikeIcon";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
const CardMovie: React.FC<{
  item: Movie | TVShow | PersonType;
  type: TypeOfObj;
  idItem: number;
}> = ({ item, type, idItem }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  let title;
  let releaseDate;
  let picture;
  let rating;
  if (type === "movie") {
    item = item as Movie;
    title = item.title;
    releaseDate = item.release_date;
    picture = item.poster_path;
    rating = item.vote_average;
  } else if (type === "tv") {
    item = item as TVShow;
    title = item.name;
    releaseDate = item.first_air_date;
    picture = item.poster_path;
    rating = item.vote_average;
  } else {
    item = item as PersonType;
    title = item.name;
    releaseDate = item.known_for_department;
    picture = null;
    rating = undefined;
  }
  const { favorites, addFavorite, deleteFavorite } = useContext(UserContext);
  useEffect(() => {
    const find = favorites.find((fav) => fav.idItem === idItem);
    setIsLiked(find ? true : false);
  }, [favorites]);

  return (
    <Link
      href={{
        pathname: `/${type}/${item.id}`,
      }}
      className="rounded-lg box-shadow-2 min-w-[180px] max-w-[180px] h-[400px] flex flex-col relative cursor-pointer scale-95 hover:scale-100 transition-transform ease-in bg-zinc-50"
    >
      <LikeIcon
        className="absolute top-[10px] left-[10px]"
        item={item}
        isLiked={isLiked}
        onClick={
          isLiked
            ? (e: Event) => deleteFavorite(e, item, type, idItem)
            : (e: Event) => addFavorite(e, item, type)
        }
      />
      {picture ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${picture}`}
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
            rate={rating}
            className="absolute -top-[20px] -right-[20px]"
          />
          <h3 className="text-base font-bold">{title}</h3>
          <span className="text-sm italic">{releaseDate}</span>
        </div>
      </div>
    </Link>
  );
};
export default CardMovie;
