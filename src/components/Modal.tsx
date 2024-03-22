import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";
import { Film } from "@/models/types";
import Video from "./Video";
import Image from "next/image";

const Modal = () => {
  const { filmSelected, setIsModal, isModal, setCart, cart } =
    useContext(AppContext);

  const handleModal = () => {
    setIsModal(false);
  };

  const handleCart = (film: Film) => {
    const find = cart.find((item: Film) => item.product_id === film.product_id);
    if (!find) {
      setCart([...cart, film]);
    } else {
      const copyCart = [...cart];
      const newCart = copyCart.filter(
        (item: Film) => item.product_id !== film.product_id
      );
      setCart(newCart);
    }
  };
  const checkCard = cart.find(
    (item: Film) => item.product_id === filmSelected?.product_id
  );

  if (!isModal) return null;
  return (
    <div className="inset-0 fixed bg-stone-700 bg-opacity-80 z-40 flex items-center justify-center w-full h-full top-0 left-0">
      <div className="w-[900px] container h-4/5 bg-black z-50 flex rounded-lg p-10 relative flex-col justify-between">
        <div className="flex justify-between h-full py-2">
          <div className="mr-5 h-[350px] flex flex-col justify-between">
            <div className="h-[280px]">
              <span className="border-2 py-2.5 px-4 rounded-full my-2.5">
                {filmSelected?.category}
              </span>
              <h2 className="text-4xl font-bold">{filmSelected?.title}</h2>
              <span>{filmSelected?.rating}</span>
              <p className="h-44 overflow-auto no-scrollbar">
                {filmSelected?.description}
              </p>
            </div>

            <button
              onClick={() => filmSelected && handleCart(filmSelected)}
              className="my-5 py-2.5 px-4 rounded-full bg-red-600 w-full hover:slace-105 transition-transform"
            >
              {checkCard ? "Remove from Cart" : "Add to Cart"}{" "}
              {filmSelected?.price}
            </button>
          </div>
          <img
            src={filmSelected?.thumbnail}
            alt={filmSelected?.title}
            className="h-full object-contain rounded-lg"
          />
        </div>
        {filmSelected?.video && <Video videoUrl={filmSelected?.video} />}

        <span
          onClick={handleModal}
          className="absolute right-[30px] top-[20px] rounded-full border-2 p-2.5 cursor-pointer"
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Modal;
