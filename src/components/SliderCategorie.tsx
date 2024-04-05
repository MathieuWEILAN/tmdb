import { Movie, TypeOfObj } from "@/models/types";
import { useEffect, useState } from "react";
import CardMovie from "./Cards/CardMovie";
import Filter from "./Filter";
import SeeMoreButton from "./Button/SeeMoreButton";
import { useContents } from "@/contexts/FilterContext";

const SliderCategorie = ({
  arrayContents,
  className,
  handlePageClick,
  type,
}: {
  arrayContents?: Movie[];
  className?: string;
  handlePageClick: () => void;
  type: TypeOfObj;
}) => {
  const [filmSelected, setFilmSelected] = useState<Movie | undefined>(
    undefined
  );

  useEffect(() => {
    setFilmSelected(arrayContents?.[0]);
  }, [arrayContents]);

  const data = useContents();
  return (
    <div className="pt-20 md:pt-0">
      <div className="flex flex-col lg:flex-row container mx-auto relative">
        <div className="w-full lg:w-72 mt-10">
          <Filter />
        </div>
        <div className="flex-col items-center justify-center w-full">
          <div
            className={`flex flex-wrap shrink-0 flex-1 w-full justify-center lg:justify-start h-auto gap-4 lg:px-2.5 mt-10`}
          >
            {data?.map((film) => (
              <CardMovie
                item={film}
                key={film.id}
                type={type}
                idItem={film.id}
              />
            ))}
          </div>

          <SeeMoreButton onClick={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default SliderCategorie;
