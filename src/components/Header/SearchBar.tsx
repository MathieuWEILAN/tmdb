import { AppContext } from "@/contexts/AppContext";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContextType, Product, MovieListing } from "@/models/types";
import Link from "next/link";
import SearchIcon from "@/assets/icons/SearchIcon";

const SearchBar = () => {
  const [searchFilm, setSearchFilm] = useState<string>("");
  const [isActived, setIsActived] = useState<boolean>(false);
  const [results, setResults] = useState<MovieListing | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  let inDebounce: any;

  const debounce = (func: any, delay: number) => {
    return (...args: any) => {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchData = async () => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${searchFilm.toLowerCase()}&include_adult=false&language=en-US&page=1`;
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
  }, [searchFilm, debouncedFetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsActived(true);
  };

  const handleClean = () => {
    setSearchFilm("");
    setResults(null);
  };

  return (
    <div className="search-bar relative flex items-center">
      {results && isActived && (
        <Link
          href={{ pathname: "/search", query: { search: searchFilm } }}
          className="absolute right-[70px] hover:underline"
        >
          (Voir les {results.total_results} résultats)
        </Link>
      )}

      {!isActived ? (
        <SearchIcon className="absolute right-[20px]" onClick={handleSearch} />
      ) : (
        <span
          className="absolute  right-[20px] cursor-pointer"
          onClick={handleClean}
        >
          X
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
        placeholder="Search"
        className={`${
          isActived ? "w-[500px] bg-white shadow-lg" : "w-0 bg-transparent"
        }  py-2 px-5 rounded-full focus:outline-none transition-all duration-500 ease-in-out focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 text-slate-950`}
      />
    </div>
  );
};

export default SearchBar;
