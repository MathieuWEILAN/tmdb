import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
const SeeMoreButton = ({ onClick }: { onClick: () => void }) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="flex justify-center w-full px-10">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5 w-full"
        onClick={onClick}
      >
        {wording(locale, "see_more")}
      </button>
    </div>
  );
};

export default SeeMoreButton;
