import { FilterContext, useCategories } from "@/contexts/FilterContext";
import Tag from "../Tag";
import { useContext } from "react";
import { useRouter } from "next/router";
import { wording } from "@/lib/utils";

const ByCategories = () => {
  const allCategories = useCategories();
  const { sortByCategories, filters } = useContext(FilterContext);
  const filtersCategories = filters.categories;
  const { locale } = useRouter();

  return (
    <div>
      <span>{wording(locale, "categories")}</span>
      <div className="flex flex-wrap">
        {allCategories?.map((category) => {
          const find = filtersCategories.find((cat) => cat.id === category.id);
          return (
            <Tag
              key={category.id}
              name={category.name}
              id={category.id}
              className={`py-1 text-sm font-normal box-shadow-2 !border-0 m-1 ${
                find ? "bg-stone-950 text-white" : "bg-transparent"
              }`}
              onClick={() => sortByCategories(category)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ByCategories;
