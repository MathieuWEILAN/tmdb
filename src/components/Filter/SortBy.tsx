import { useContext, useState } from "react";
import { FilterContext } from "@/contexts/FilterContext";
import UpIcon from "@/assets/icons/UpIcon";
import DownIcon from "@/assets/icons/DownIcon";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
  NULL = "NULL",
}
enum TypeSort {
  RATE = "rate",
  DATE = "date",
  NAME = "name",
  NULL = "NULL",
}
const SortBy = ({
  onClick,
  title,
  type,
  handleType,
}: {
  onClick: any;
  title: string;
  type: TypeSort;
  handleType: any;
}) => {
  const { filters } = useContext(FilterContext);
  const [isUp, setIsUp] = useState<boolean | null>(null);
  const [isDown, setIsDown] = useState<boolean | null>(null);
  const handleUp = () => {
    onClick(SortOrder.ASC);
    setIsUp(true);
    setIsDown(false);
    handleType();
  };

  const handleDown = () => {
    onClick(SortOrder.DESC);
    setIsUp(false);
    setIsDown(true);
    handleType();
  };

  const { locale } = useRouter();
  return (
    <div className="flex items-center w-full justify-between">
      <button className={`box-shadow-2 rounded-full`} onClick={handleDown}>
        <DownIcon
          stroke={`${isDown && type === title ? "#FFFFFF" : "#000000"}`}
          className={`${isDown && type === title ? "bg-black" : "bg-white"}`}
        />
      </button>

      <span className="text-center px-2.5">
        {wording(locale, "sort_by")} {wording(locale, title)}
      </span>
      <button className={`box-shadow-2 rounded-full`} onClick={handleUp}>
        <UpIcon
          stroke={`${isUp && type === title ? "#FFFFFF" : "#000000"}`}
          className={`${isUp && type === title ? "bg-black" : "bg-white"}`}
        />
      </button>
    </div>
  );
};

export default SortBy;
