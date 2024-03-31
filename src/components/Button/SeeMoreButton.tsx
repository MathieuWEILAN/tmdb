import { FilterContext } from "@/contexts/FilterContext";
import { useContext } from "react";

const SeeMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-center w-full px-10">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5 w-full"
        onClick={onClick}
      >
        See more
      </button>
    </div>
  );
};

export default SeeMoreButton;
