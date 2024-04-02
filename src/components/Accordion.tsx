import { useState } from "react";
import { Movie, TVShow } from "@/models/types";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import Rating from "./Rating";
const Accordion = ({
  title,
  items,
  type,
}: {
  title: string;
  items: Movie[] | TVShow[];
  type: string;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { locale } = useRouter();
  return (
    <div className="accordion-item">
      <div
        className="accordion-title flex w-full border-2 justify-between rounded-xl my-2.5 overflow-hidden cursor-pointer p-5"
        onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
      >
        <div className="text-[120px] font-bold">{title}</div>

        <div className="scale-150">{isActive ? "-" : "+"}</div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isActive ? "max-h-[8000px]" : "max-h-0"
        }`}
      >
        {items.map((i, index) => {
          const isLast = index === items.length - 1;
          return (
            <div
              className={`flex  px-5 py-2.5 justify-between items-center ${
                isLast ? "" : "border-b"
              }`}
              key={i?.credit_id}
            >
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <span className="font-bold">
                    {i.original_title || i.original_name}
                  </span>{" "}
                  <i>{i.release_date || i.first_air_date}</i>
                </div>
                {type === "Acting" && (
                  <span>
                    {wording(locale, "character")} : {i.character}
                  </span>
                )}
                {type !== "Acting" && (
                  <span>
                    {i.department} : {i.job}
                  </span>
                )}

                <Rating rate={i.vote_average} />
              </div>
              {i.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original${i?.poster_path}`}
                  alt=""
                  width={80}
                  height={80}
                  className="h-40 w-auto object-cover object-center rounded-lg ml-5"
                />
              ) : (
                <div className="h-40 w-auto bg-black rounded-lg ml-5"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
