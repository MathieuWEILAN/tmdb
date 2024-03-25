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

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { cart } = useContext(AppContext);
  const count = cart.length;

  return (
    <header className="h-auto w-full flex items-center justify-between fixed bg-slate-400 shadow-xl z-30 flex-col">
      <div className="container mx-auto flex items-center justify-between py-5 h-full">
        <Link href="/">
          <Image src={NextJSLogo.src} alt="" width={100} height={100} />
        </Link>
        <Navigation />
        <SearchBar />
      </div>
    </header>
  );
};
export default Header;
