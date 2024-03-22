import { AppContext } from "@/contexts/AppContext";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContextType, Product } from "@/models/types";
import Link from "next/link";

const SearchBar = () => {
  const [searchFilm, setSearchFilm] = useState<string>("");
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
    const url = `https://serpapi.com/search.json?engine=google_play_movies&q=${searchFilm}`;
    const response = await fetch(`/api/serapi?name=${url.toString()}`);
    const newResponse = await response.json();
    console.log(newResponse);
    return newResponse;
  };

  const debouncedFetchData = debounce(fetchData, 2000);

  useEffect(() => {
    if (searchFilm) {
      debouncedFetchData();
    }
    return () => clearTimeout(inDebounce);
  }, [searchFilm, debouncedFetchData]);

  return (
    <div className="search-bar relative">
      <input
        type="text"
        onChange={(e) => setSearchFilm(e.target.value)}
        value={searchFilm}
        placeholder="Search"
        className="bg-white w-[500px] rounded-full py-2 px-5 shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out text-slate-950"
      />

      <div className="absolute bg-white w-full">
        {/* {results?.map((prod: Product, i: number) => {
          const href = `/product/${prod.id}`;
          return (
            <Link key={i} href={{ pathname: href }} className="px-5 py-2.5">
              {prod.title}
            </Link>
          );
        })} */}
      </div>
    </div>
  );
};

export default SearchBar;
