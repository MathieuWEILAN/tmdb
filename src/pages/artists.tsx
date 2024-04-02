import type { GetServerSideProps } from "next";
import { PersonListing, PersonType, Movie } from "@/models/types";
import SeeMoreButton from "@/components/Button/SeeMoreButton";
import { useState } from "react";
import Filter from "@/components/Filter";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

interface ArtistsPageProps {
  artists: PersonListing;
}

const ArtistsPage: React.FC<ArtistsPageProps> = ({ artists }) => {
  const [resultsPage, setResultsPage] = useState<PersonListing>(artists);
  const [contents, setContents] = useState<any>(artists.results);
  const [page, setPage] = useState<number>(1);
  const { locale } = useRouter();

  const handlePageClick = async () => {
    const url = `https://api.themoviedb.org/3/person/popular?language=${locale}`;

    const response = await fetch(`/api/tmdbapi?name=${url}&page=${page + 1}`);
    const newResponse = await response.json();
    if (newResponse.results.length === 0) return;
    setResultsPage(newResponse);
    setContents([...contents, ...newResponse.results]);
    setPage(page + 1);
    return newResponse;
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row container mx-auto relative">
        <div className="w-full lg:w-72 mt-10 border-2 rounded-xl mr-2.5">
          {/* <Filter /> */} lala
        </div>
        <div className="mt-10 w-full space-y-4">
          {contents.map((item: PersonType, i: number) => {
            return (
              <Link
                href={`/person/${item.id}`}
                key={item.id}
                className="w-full border-2 rounded-xl box-shadow-2 flex overflow-hidden p-2.5"
              >
                {item.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item?.profile_path}`}
                    alt=""
                    width={120}
                    height={120}
                    className="h-32 w-fit mr-2.5 object-cover object-center rounded-lg"
                  />
                ) : (
                  <div className="h-32 w-20 mr-2.5"></div>
                )}
                <div className="flex flex-col justify-center">
                  <span className="font-bold">{item.original_name}</span>
                  <span>{item.known_for_department}</span>
                  <span></span>
                </div>
                <div className="w-auto flex items-end justify-end w-full">
                  {item.known_for.map((movie: Movie) => {
                    return (
                      <div key={movie.id}>
                        {movie?.poster_path && (
                          <Image
                            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                            width={80}
                            height={80}
                            alt=""
                            className="rounded-lg object-cover object-center w-fit h-32 mr-2.5"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })}
          <SeeMoreButton onClick={handlePageClick} />
        </div>
      </div>
    </div>
  );
};
export default ArtistsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?language=${context.locale}`,
      options
    );
    const artists = await response.json();
    return { props: { artists } };
  } catch (error) {
    console.log(error);
  }
  return { props: {} };
};
