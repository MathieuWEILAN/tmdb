import { Movie } from "@/models/types";
import { useEffect, useState } from "react";
import CardMovie from "./Cards/CardMovie";
import Filter from "./Filter";
import SeeMoreButton from "./Button/SeeMoreButton";
import { useContents } from "@/contexts/FilterContext";

const SliderCategorie = ({
  arrayContents,
  className,
  handlePageClick,
}: {
  arrayContents?: Movie[];
  className?: string;
  handlePageClick: () => void;
}) => {
  const [filmSelected, setFilmSelected] = useState<Movie | null>(null);

  useEffect(() => {
    setFilmSelected(arrayContents?.[0]);
  }, [arrayContents]);

  const data = useContents();
  return (
    <div className="">
      {/* <Banner movie={filmSelected} /> */}
      <div className="flex container mx-auto">
        <div className="w-72 sticky top-[80px] mt-5">
          <Filter />
        </div>
        <div className="flex-col items-center justify-center">
          <div
            className={`flex flex-wrap shrink-0 flex-1 w-full justify-center h-auto gap-4 px-8 mt-10`}
          >
            {data?.map((film) => (
              <CardMovie movie={film} key={film.id} />
            ))}
          </div>

          <SeeMoreButton onClick={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default SliderCategorie;
