import { Movie, TVShow, PersonType, TypeOfObj } from "@/models/types";
import Image from "next/image";
import Rating from "../Rating";
import LikeIcon from "@/assets/icons/LikeIcon";
import ToWatchIcon from "@/assets/icons/ToWatchIcon";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";

import { useRouter } from "next/router";
const CardMovie: React.FC<{
  item: Movie | TVShow | PersonType;
  type: TypeOfObj;
  idItem: number;
}> = ({ item, type, idItem }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [providers, setProviders] = useState<any>(null);
  let title;
  let releaseDate;
  let picture;
  let rating;
  const { locale } = useRouter();
  if (type === "movie") {
    item = item as Movie;
    title = item.title;
    releaseDate = item.release_date || item.date_release;
    picture = item.poster_path;
    rating = item.vote_average;
  } else if (type === "tv") {
    item = item as TVShow;
    title = item.name;
    releaseDate = item.first_air_date || item.date_release;
    picture = item.poster_path;
    rating = item.vote_average;
  } else {
    item = item as PersonType;
    title = item.name;
    releaseDate = item.known_for_department;
    picture = null;
    rating = undefined;
  }
  const { favorites, addFavorite, deleteFavorite, addToWatch, toWatch } =
    useContext(UserContext);

  useEffect(() => {
    const fetchProviders = async () => {
      let url = `https://api.themoviedb.org/3/movie/${item.id}/watch/providers`;
      const response = await fetch(`/api/tmdbapi?name=${url}`);
      const newResponse = await response.json();
      if (locale === "fr-FR") {
        setProviders(newResponse?.results?.FR);
      }
      if (locale === "en-US") {
        setProviders(newResponse?.results?.US);
      }
      if (locale === "es-ES") {
        setProviders(newResponse?.results?.ES);
      }
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      const find = favorites?.find((fav) => fav.idItem === idItem);
      setIsLiked(find ? true : false);
    } else setIsLiked(false);
  }, [favorites]);

  return (
    <Link
      href={{
        pathname: `/${type}/${item.id}`,
      }}
      className="rounded-lg box-shadow-2 min-w-[180px] max-w-[180px] h-[400px] flex flex-col relative cursor-pointer bg-zinc-50"
    >
      <Rating
        rate={rating}
        className="absolute -top-[20px] -right-[20px] z-10"
      />
      <div className="overflow-hidden w-full h-72 relative rounded-tl-xl rounded-tr-xl">
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
            className="object-cover object-center h-full w-full bg-black scale-100 hover:scale-105 transition-transform ease-in"
          />
        ) : (
          <div className="h-72 w-full bg-stone-950 rounded-tl-xl rounded-tr-xl"></div>
        )}
      </div>

      <div className="w-full flex-1 py-1 px-2.5 flex flex-col justify-between rounded-br-xl relative">
        <div>
          <h3 className="text-base font-bold line-clamp-2">{title}</h3>
          <span className="text-sm italic">{releaseDate}</span>
        </div>
        {providers && (
          <ToWatchIcon
            item={item}
            type={type}
            className="absolute bottom-[10px] right-[10px] z-30"
            onClick={(e: Event) => addToWatch(e, item, type)}
          />
        )}
      </div>
    </Link>
  );
};
export default CardMovie;
