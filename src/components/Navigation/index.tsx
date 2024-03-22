import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { Category } from "@/models/types";
import Link from "next/link";
import { AppContextType } from "@/models/types";
import categoriesJSON from "../../assets/categories.json";

const Navigation = () => {
  const allCategories = [{ family: [] }, { movie: [] }, { tv: [] }];
  const arrayOfCat = Object.values(categoriesJSON);

  arrayOfCat.map((cat) => {
    allCategories.map((mainCat) => {
      if (cat.section.toLowerCase() === Object.keys(mainCat)[0]) {
        mainCat[Object.keys(mainCat)[0]].push(cat);
      }
    });
  });

  return (
    <nav className="w-full flex container mx-auto gap-10 py-2.5">
      {allCategories.map((mainCat, index) => {
        const nameCat = Object.keys(mainCat)[0];
        return (
          <Link
            href={{
              pathname: `/categories/${nameCat}`,
            }}
            key={index}
            className="capitalize border-2 rounded-full px-5"
          >
            {nameCat}
          </Link>
        );
      })}
    </nav>
  );
};
export default Navigation;
