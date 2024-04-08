import { MovieCollection, TypeOfObj } from "@/models/types";
import Image from "next/image";
import CardMovie from "./Cards/CardMovie";
const Collections: React.FC<MovieCollection> = (collections) => {
  return (
    <div className="my-10">
      <h2>{collections.name}</h2>
      <p>{collections.overview}</p>
      <div className="w-full flex space-x-4 my-10">
        {collections.parts.map((item, i) => {
          return (
            <CardMovie
              key={item.id}
              item={item}
              type={TypeOfObj.MOVIE}
              idItem={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
