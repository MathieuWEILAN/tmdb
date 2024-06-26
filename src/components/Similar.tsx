import { Movie, MovieListing } from "@/models/types";
import Link from "next/link";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";

const Similar = ({ similars }: { similars: MovieListing }) => {
  const { locale } = useRouter();
  return (
    <div className="container mx-auto my-10">
      <h2 className="mb-5">{wording(locale, "similar_movies")}</h2>
      <div className="flex items-center overflow-auto no-scrollbar">
        {similars?.results.map((movie: Movie) => {
          return (
            <Link
              key={movie.id}
              className="w-48 shrink-0 mx-2"
              href={`/movie/${movie.id}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-lg scale-95 hover:scale-100 transition-transform cursor-pointer"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Similar;
