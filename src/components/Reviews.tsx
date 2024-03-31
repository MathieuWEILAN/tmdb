import { ReviewsListing, ReviewType, AuthorDetails } from "@/models/types";
import Image from "next/image";
import Rating from "./Rating";
import { formaterDate } from "@/lib/utils";
import { useState } from "react";

const Reviews: React.FC<ReviewsListing> = (reviews) => {
  return (
    <div>
      <h2>Reviews</h2>
      <div className="flex flex-col">
        {reviews.results.slice(0, 3).map((item) => {
          return <Review review={item} key={`review-${item.id}`} />;
        })}
      </div>
    </div>
  );
};

export default Reviews;

const Review = ({ review }: { review: ReviewType }) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  return (
    <div
      className={`box-shadow-2 w-full my-2 rounded-lg h-auto p-5 bg-zinc-50`}
    >
      <div className="flex items-center">
        {review?.author_details.avatar_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${review?.author_details.avatar_path}`}
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 rounded-full bg-red-600 mr-2.5 object-cover object-center"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-red-600 mr-2.5"></div>
        )}
        <div className="flex relative w-full">
          <div className="flex flex-col mr-4">
            <p>
              A review from{" "}
              {`${
                review.author_details.name
                  ? review.author_details.name
                  : review.author_details.username
              }`}
            </p>
            <p>{formaterDate(review.created_at)}</p>
          </div>
          <Rating
            rate={review.author_details.rating}
            className=" absolute right-0"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className={`${isMore ? "" : "line-clamp-3"} mt-2.5`}>
          {review.content}
        </p>
        <button
          onClick={() => setIsMore(!isMore)}
          className="hover:underline w-fit mt-2.5 self-end"
        >
          Read more
        </button>
      </div>
    </div>
  );
};
