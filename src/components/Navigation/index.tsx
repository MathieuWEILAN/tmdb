import Link from "next/link";
import { useState } from "react";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
enum Menu {
  MOVIE = "MOVIE",
  TV = "TV",
  ACTORS = "ACTORS",
  NULL = "NULL",
}
const Navigation = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<Menu>(Menu.NULL);
  const { locale } = useRouter();
  const handleMouseEnter = (menu: Menu) => {
    setDropdownVisible(menu);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(Menu.NULL);
  };

  return (
    <nav className="w-full h-full flex items-center justify-start">
      <div
        className="h-[110%] flex items-center relative bg-transparent transition duration-300 px-2 md:px-4 mx-1 md:mx-2.5 cursor-pointer"
        onMouseEnter={() => handleMouseEnter(Menu.MOVIE)}
        onMouseLeave={handleMouseLeave}
      >
        {wording(locale, "movies")}
        {isDropdownVisible === Menu.MOVIE && (
          <ul
            className={`w-fit absolute z-50 h-fit shadow-2xl left-0 top-[35px] py-2.5 p-2.5 rounded bg-slate-50`}
          >
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/movies/popular"}>
                {" "}
                {wording(locale, "popular")}
              </Link>
            </li>
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/movies/now_playing"}>
                {" "}
                {wording(locale, "now_playing")}
              </Link>
            </li>
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/movies/top_rated"}>
                {" "}
                {wording(locale, "top_rated")}
              </Link>
            </li>
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/movies/upcoming"}>
                {" "}
                {wording(locale, "upcoming")}
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div
        className="h-[110%] flex items-center relative bg-transparent transition duration-300 px-2 md:px-4 mx-1 md:mx-2.5 cursor-pointer"
        onMouseEnter={() => handleMouseEnter(Menu.TV)}
        onMouseLeave={handleMouseLeave}
      >
        {wording(locale, "tv_shows")}

        {isDropdownVisible === Menu.TV && (
          <ul
            className={`w-fit absolute z-50 h-fit shadow-2xl -left-[30px] top-[35px] py-2.5 p-2.5 rounded bg-slate-50 ml-10 ml-0`}
          >
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/tv-shows/today"}>
                {wording(locale, "airing_today")}
              </Link>
            </li>
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/tv-shows/popular"}>
                {" "}
                {wording(locale, "popular")}
              </Link>
            </li>
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/tv-shows/top_rated"}>
                {" "}
                {wording(locale, "top_rated")}
              </Link>
            </li>
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/tv-shows/on_the_air"}>
                {" "}
                {wording(locale, "on_the_air")}
              </Link>
            </li>
          </ul>
        )}
      </div>
      <Link
        href={"/artists"}
        className="h-[110%] flex items-center relative bg-transparent transition duration-300 px-2 md:px-4 mx-1 md:mx-2.5 cursor-pointer"
      >
        {wording(locale, "artists")}
      </Link>
    </nav>
  );
};
export default Navigation;
