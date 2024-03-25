import { Movie } from "@/models/types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import Banner from "./Banners/Banner";
import Image from "next/image";
import CardMovie from "./Cards/CardMovie";
import Filter from "./Filter";

const SliderCategorie = ({
  array,
  className,
}: {
  array: Movie[];
  className?: string;
}) => {
  const [filmSelected, setFilmSelected] = useState<Movie | null>(null);
  useEffect(() => {
    setFilmSelected(array[0]);
  }, [array]);

  return (
    <section className="">
      <Banner movie={filmSelected} />
      <div className="flex border-4 border-blue-600 container mx-auto">
        <div className="w-72 sticky top-[80px] h-screen">
          <Filter />
        </div>
        <div
          className={`flex flex-wrap shrink-0 flex-1 w-full justify-center h-auto gap-4 px-8`}
        >
          {array.map((film) => (
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
        </div>
      </div>
    </section>
  );
};

export default SliderCategorie;
