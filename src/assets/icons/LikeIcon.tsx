import { UserContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";
import { Movie } from "@/models/types";
const LikeIcon = ({
  className,
  onClick,
  movie,
}: {
  className?: string;
  onClick?: any;
  movie?: Movie;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { handleFavorite, favorites } = useContext(UserContext);
  const handleClick = () => {
    setIsLiked(!isLiked);
    handleFavorite(movie);
  };
  const checkIsLiked = () => {
    const find = favorites.find((f) => f.id === movie?.id);
    return find ? true : false;
  };
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill={checkIsLiked() ? "red" : "white"}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${
        checkIsLiked()
          ? "scale-105 transition-transform ease-in-out"
          : "scale-90"
      } cursor-pointer`}
      onClick={handleClick}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
        stroke={checkIsLiked() ? "red" : "white"}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default LikeIcon;
