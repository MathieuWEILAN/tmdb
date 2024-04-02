import { ImageDetails, ImagesListing } from "@/models/types";
import Image from "next/image";
import { wording } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Carousel = ({ arrayImages }: { arrayImages: ImageDetails[] }) => {
  const [mainImage, setMainImage] = useState<ImageDetails | null>(
    arrayImages[0]
  );
  const { locale } = useRouter();
  const handleImage = (img: ImageDetails) => {
    setMainImage(img);
  };
  return (
    <div className="mt-10">
      <h2>{wording(locale, "pictures")}</h2>
      <div className="bg-black rounded-xl flex justify-center mt-5">
        <Image
          src={`https://image.tmdb.org/t/p/original${mainImage?.file_path}`}
          alt={""}
          width={400}
          height={mainImage?.height}
          className="h-[800px] w-fit object-contain object-center flex"
        />
      </div>
      <div className="flex w-full shrink-0 overflow-auto space-x-2 mt-2">
        {arrayImages.map((img: ImageDetails, i: number) => {
          return (
            <Image
              key={`images-${img.file_path}-${i}`}
              src={`https://image.tmdb.org/t/p/original${img?.file_path}`}
              alt={""}
              width={80}
              height={120}
              className="h-32 w-fit object-cover object-center rounded-lg cursor-pointer"
              onClick={() => handleImage(img)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Carousel;
