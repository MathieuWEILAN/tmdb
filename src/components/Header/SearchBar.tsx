import { useEffect, useState, useRef } from "react";
import { MovieListing } from "@/models/types";
import Link from "next/link";
import SearchIcon from "@/assets/icons/SearchIcon";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
import CloseIcon from "@/assets/icons/CloseIcon";

const SearchBar = () => {
  const [searchFilm, setSearchFilm] = useState<string>("");
  const [isActived, setIsActived] = useState<boolean>(false);
  const [results, setResults] = useState<MovieListing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  let inDebounce: any;

  const { locale } = useRouter();

  const debounce = (func: any, delay: number) => {
    return (...args: any) => {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchData = async () => {
    let url = `https://api.themoviedb.org/3/search/multi?query=${searchFilm.toLowerCase()}&include_adult=false&language=${locale}&page=1`;
    const response = await fetch(`/api/tmdbapi?name=${url}`);
    const newResponse = await response.json();
    setResults(newResponse);
    return newResponse;
  };

  const debouncedFetchData = debounce(fetchData, 2000);

  useEffect(() => {
    if (isActived) {
      inputRef.current.focus();
    }
  }, [isActived]);

  useEffect(() => {
    if (searchFilm) {
      debouncedFetchData();
    }
    return () => clearTimeout(inDebounce);
  }, [searchFilm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsActived(true);
  };

  const handleClean = () => {
    setSearchFilm("");
    setResults(null);
  };

  return (
    <div className="search-bar relative flex items-center w-full md:w-fit mt-2.5 md:mt-0">
      {results && isActived && (
        <Link
          href={{ pathname: "/search", query: { search: searchFilm } }}
          className="absolute right-[50px] hover:underline text-xs md:text-sm"
        >
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <span>
              ({results.total_results} {wording(locale, "results")})
            </span>
          )}
        </Link>
      )}

      {!isActived ? (
        <SearchIcon
          className="absolute md:left-1/2 md:-translate-x-1/2 right-[20px] cursor-pointer overflow-hidden"
          onClick={handleSearch}
        />
      ) : (
        <span
          className="absolute right-[20px] cursor-pointer"
          onClick={handleClean}
        >
          <CloseIcon stroke={"black"} className={"w-6 h-6 flex items-center"} />
        </span>
      )}
      <input
        ref={inputRef}
        onBlur={() => {
          if (!searchFilm) {
            setIsActived(false);
            setResults(null);
          }
        }}
        type="text"
        onChange={(e) => setSearchFilm(e.target.value)}
        value={searchFilm}
        placeholder={wording(locale, "search_placeholder")}
        className={`${
          isActived
            ? "md:w-[350px] lg:w-[500px] md:bg-white md:shadow-lg w-full bg-white"
            : "md:w-0 md:bg-transparent w-full bg-white"
        }  py-2 px-5 rounded-full focus:outline-none transition-all duration-500 ease-in-out focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 text-slate-950`}
      />
    </div>
  );
};

export default SearchBar;
