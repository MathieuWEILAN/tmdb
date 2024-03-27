import LogoutButton from "../Button/LogoutButton";
import LoginButton from "../Button/LoginButton";
import { useSession } from "next-auth/react";
import Navigation from "../Navigation";
import Image from "next/image";
import NextJSLogo from "../../assets/img/next.svg";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import avatar from "../../assets/img/avatar.png";

const Header: React.FC = () => {
  return (
    <header className="h-auto lg:h-20 w-full flex flex-col md:flex-row items-center justify-between fixed bg-slate-400 shadow-xl z-30 flex-col px-4 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-5 h-full md:space-x-10">
        <div className="w-full flex justify-between items-center lg:h-full">
          <Link href="/" className="w-40">
            <Image src={NextJSLogo.src} alt="" width={100} height={100} />
          </Link>
          <Navigation />
        </div>

        <div className="flex items-end md:items-center justify-center w-full md:w-fit space-x-2.5 mt-2 md:mt-0">
          <SearchBar />
          <Link href={"/"} className="relative w-10 h-10 rounded-full">
            <Image
              src={avatar.src}
              className="w-10 h-10 rounded-full"
              alt="avatar"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
