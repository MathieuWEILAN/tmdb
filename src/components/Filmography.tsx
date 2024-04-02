import { Movie, TypeOfObj } from "@/models/types";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import { groupByDecade } from "@/lib/utils";
import Accordion from "./Accordion";

const Filmography = ({ movies, type }: { movies: Movie[]; type: string }) => {
  const { locale } = useRouter();
  movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  const moviesByDecade = groupByDecade(movies, TypeOfObj.MOVIE);
  const sortedDecades = Object.keys(moviesByDecade).sort((a, b) => b - a);

  return (
    <div className="w-full lg:w-1/2">
      <h2>{wording(locale, "filmography")}</h2>
      <div>
        {sortedDecades.map((decade) => {
          return (
            <Accordion
              key={decade}
              title={decade}
              items={moviesByDecade[decade]}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Filmography;
