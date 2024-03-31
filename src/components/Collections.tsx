import { MovieCollection, TypeOfObj } from "@/models/types";
import Image from "next/image";
import CardMovie from "./Cards/CardMovie";
const Collections: React.FC<MovieCollection> = (collections) => {
  console.log("lalala", collections);
  return (
    <div className="my-10">
      <h2>{collections.name}</h2>
      <p>{collections.overview}</p>
      <div className="w-full flex space-x-4">
        {collections.parts.map((item, i) => {
          return (
            <CardMovie key={item.id} movie={item} type={TypeOfObj.MOVIE} />
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
