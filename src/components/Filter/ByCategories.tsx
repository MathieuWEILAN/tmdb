import { FilterContext, useCategories } from "@/contexts/FilterContext";
import Tag from "../Tag";
import { useContext } from "react";
import { Genre } from "@/models/types";

const ByCategories = () => {
  const allCategories = useCategories();
  const { sortByCategories, filters } = useContext(FilterContext);
  const filtersCategories = filters.categories;

  return (
    <div>
      <span>ALL CATEGORIES</span>
      <div className="flex flex-wrap">
        {allCategories?.map((category) => {
          const find = filtersCategories.find((cat) => cat.id === category.id);
          return (
            <Tag
              key={category.id}
              name={category.name}
              id={category.id}
              className={`py-0 text-sm border-stone-950 border font-normal ${
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
