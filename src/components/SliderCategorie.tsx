import { Film } from "@/models/types";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
const SliderCategorie = ({ array }: { array: Film[] }) => {
  const { setIsModal, setFilmSelected, filmSelected } = useContext(AppContext);
  const handleFilm = (film: Film) => {
    setFilmSelected(film);
    setIsModal(true);
  };

  // console.log("FILMS SELECTED", filmSelected);
  return (
    <div className="flex w-full h-auto border-red-500 overflow-auto no-scrollbar gap-6 snap-x">
      {array.map((film) => (
        <div
          onClick={() => {
            handleFilm(film);
          }}
          key={film.product_id}
          className="w-52 h-auto rounded-sm overflow-hidden shrink-0 hover:scale-105 transition-transform cursor-pointer relative rounded-lg"
        >
          <img
            src={film.thumbnail}
            alt={film.title}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default SliderCategorie;
