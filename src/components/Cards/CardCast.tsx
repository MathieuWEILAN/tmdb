import { CastMember } from "@/models/types";
import Image from "next/image";
import LikeIcon from "@/assets/icons/LikeIcon";
import Link from "next/link";

const CardCast = ({ cast }: { cast: CastMember }) => {
  const href = `/film/${cast.id}`;
  return (
    <Link
      href={{ pathname: `/film/${cast.id}` }}
      className="shrink-0 rounded-lg box-shadow-2 w-32 h-auto max-h-[300px] my-5 flex flex-col relative cursor-pointer scale-95 hover:scale-100 transition-transform ease-in"
    >
      <LikeIcon className="absolute top-[10px] left-[10px]" />
      {cast?.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${cast?.profile_path}`}
          alt=""
          width={100}
          height={100}
          className="object-cover w-full h-2/3 object-center rounded-tl-xl rounded-tr-xl"
        />
      ) : (
        <div className="h-72 w-full bg-stone-950 rounded-tl-xl"></div>
      )}

      <div className="h-full w-full py-1 px-2.5 flex flex-col justify-between rounded-br-xl">
        <div className="w-full truncate">
          <h3 className="text-base font-bold">{cast?.name}</h3>
          <span className="text-sm italic">{cast?.character}</span>
        </div>
      </div>
    </Link>
  );
};
export default CardCast;
