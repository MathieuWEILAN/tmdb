import { convertToPercentage } from "@/lib/utils";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

const Rating = ({
  rate,
  className,
}: {
  rate: number | undefined;
  className?: string;
}) => {
  let color;
  if (rate) {
    if (rate < 5) {
      color = "bg-red-500";
    } else if (rate < 7.5) {
      color = "bg-yellow-400";
    } else if (rate > 7.5) {
      color = "bg-green-500";
    }
  }
  return (
    <span
      className={`w-12 h-12 border-2 rounded-full text-base bg-green-500 flex items-center justify-center font-bold ${color} ${className}`}
    >
      {rate && convertToPercentage(rate)}
    </span>
  );
};
export default Rating;
