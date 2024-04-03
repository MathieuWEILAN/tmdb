import LogoutButton from "../Button/LogoutButton";
import LoginButton from "../Button/LoginButton";

import Navigation from "../Navigation";
import Image from "next/image";
import NextJSLogo from "../../assets/img/next.svg";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { useRouter } from "next/router";
import Select from "react-select";
import Authentification from "./Authentification";

type Language = {
  value: string;
  label: string;
};

const options = [
  { value: "en-US", label: "English" },
  { value: "fr-FR", label: "Français" },
  { value: "es-ES", label: "Español" },
];
const Header: React.FC = () => {
  const router = useRouter();
  const [langLocale, setLangLocale] = useState<Language>(options[0]);
  const { setLang } = useContext(AppContext);

  const { asPath } = router;
  const handleLang = (lang: any) => {
    setLangLocale(lang);
    setLang(lang);
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      asPath,
      { locale: lang.value }
    );
  };

  return (
    <header className="h-auto lg:h-20 w-full flex flex-col md:flex-row items-center justify-between fixed bg-slate-400 shadow-xl z-30 flex-col px-4 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-5 h-full">
        <div className="w-fit flex justify-between items-center lg:h-full">
          <Link href="/" className="w-40">
            <Image src={NextJSLogo.src} alt="" width={100} height={100} />
          </Link>
          <Navigation />
        </div>

        <div className="flex items-end md:items-center justify-center w-auto space-x-2.5 mt-2 md:mt-0">
          <SearchBar />
          <Authentification />
          <Select
            defaultValue={langLocale}
            onChange={handleLang}
            options={options}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
