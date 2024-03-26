import Link from "next/link";
import { useState } from "react";

enum Menu {
  MOVIE = "MOVIE",
  TV = "TV",
  ACTORS = "ACTORS",
  NULL = "NULL",
}
const Navigation = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<Menu>(Menu.NULL);

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
        Movie
        {isDropdownVisible === Menu.MOVIE && (
          <ul
            className={`w-fit absolute z-50 h-fit shadow-2xl left-0 top-[40px] py-2.5 p-2.5 rounded bg-slate-50`}
          >
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/popular"}>Popular</Link>
            </li>
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/now_playing"}>Now Playing</Link>
            </li>
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/top_rated"}>Top Rated</Link>
            </li>
            <li className="w-full whitespace-nowrap hover:bg-blue-200 hover:bg-opacity-40 py-1 px-1.5 rounded">
              <Link href={"/upcoming"}>Upcoming</Link>
            </li>
          </ul>
        )}
      </div>
      <div
        className="h-[105%] flex items-center relative bg-transparent transition duration-300 px-2 mx-1 md:mx-2.5 cursor-pointer"
        onMouseEnter={() => handleMouseEnter(Menu.TV)}
        onMouseLeave={handleMouseLeave}
      >
        TV
        {isDropdownVisible === Menu.TV && (
          <ul
            className={`w-fit absolute z-50 h-fit shadow-2xl left-0 top-[40px] py-2.5 p-2.5 rounded bg-slate-50 ml-10 ml-0`}
          >
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/popular"}>lala</Link>
            </li>
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/now_playing"}>lolo</Link>
            </li>
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/top_rated"}>lele</Link>
            </li>
            <li className="w-full whitespace-nowrap py-1 hover:bg-blue-200 hover:bg-opacity-40 px-1.5 rounded">
              <Link href={"/upcoming"}>lili</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
export default Navigation;
