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
      <div className="flex border-4 border-blue-600 container mx-auto">
        <div className="w-72 sticky top-[80px] h-screen">
          <Filter />
        </div>
        <div
          className={`flex flex-wrap shrink-0 flex-1 w-full justify-center h-auto gap-4 px-8 mt-10`}
        >
          {data?.map((film) => (
            <div
              onClick={() => {
                setFilmSelected(film);
              }}
              key={film.id}
              className="w-auto h-auto"
            >
              <CardMovie movie={film} />
            </div>
          ))}
          <SeeMoreButton onClick={handlePageClick} />
          {/* <button onClick={handlePageClick}>Voir Plus</button> */}
        </div>
      </div>
    </div>
  );
};

export default SliderCategorie;
