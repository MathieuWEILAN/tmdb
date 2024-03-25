import { AppContext } from "@/contexts/AppContext";
import { useContext, useEffect } from "react";
import { Film } from "@/models/types";
import Video from "./Video";
import Image from "next/image";
import BasicButton from "./Button/BasicButton";

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
      localStorage.setItem("cart", JSON.stringify([...cart, film]));
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

  // useEffect(()=>{
  //   const getItem = localStorage.getItem("cart");
  //   if(getItem){
  //     setCart(JSON.parse(getItem))
  //   }
  // },[cart])

  if (!isModal) return null;
  return (
    <div className="inset-0 fixed bg-stone-700 bg-opacity-80 z-40 flex items-center justify-center w-full h-full top-0 left-0">
      <div className="w-[900px] container h-4/5 bg-black z-50 flex rounded-lg p-10 relative flex-col justify-between">
        <div className="flex justify-between py-2">
          <div className="mr-5 h-auto flex flex-col justify-between relative">
            <div className="h-[280px] flex flex-col">
              <BasicButton className="" onClick={() => console.log("category")}>
                {filmSelected?.category}
              </BasicButton>
              <h2 className="text-4xl font-bold">{filmSelected?.title}</h2>
              <span>{filmSelected?.rating}</span>
              <p className="h-36 overflow-auto no-scrollbar">
                {filmSelected?.description}
              </p>
            </div>

            <BasicButton
              onClick={() => filmSelected && handleCart(filmSelected)}
              className="bg-red-600 border-0 py-3 absolute bottom-0 my-0 right-0"
            >
              {checkCard ? "Remove from Cart" : "Add to Cart"}{" "}
              {filmSelected?.price}
            </BasicButton>
          </div>
          <img
            src={filmSelected?.thumbnail}
            alt={filmSelected?.title}
            className="h-[350px] object-contain rounded-lg"
          />
        </div>
        {filmSelected?.video && <Video videoUrl={filmSelected?.video} />}

        <BasicButton
          onClick={handleModal}
          className="absolute right-[10px] top-0"
        >
          X
        </BasicButton>
      </div>
    </div>
  );
};

export default Modal;
