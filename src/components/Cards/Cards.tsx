import { Product } from "@/models/types";
const Cards: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded-xl shadow-lg w-56 h-56">
      <img src={} alt="" />
    </div>
  );
};
export default Cards;
