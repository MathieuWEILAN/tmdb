import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { Category } from "@/models/types";
import Link from "next/link";
import { AppContextType } from "@/models/types";
import categoriesJSON from "../../assets/categories.json";

const Navigation = () => {
  return (
    <nav className="mx-5 w-full flex container mx-auto gap-4 py-2.5">
      <Link href={"/popular"}>Popular</Link>
      <Link href={"/now-playing"}>Now Playing</Link>
      <Link href={"/top-rated"}>Top Rated</Link>
    </nav>
  );
};
export default Navigation;
