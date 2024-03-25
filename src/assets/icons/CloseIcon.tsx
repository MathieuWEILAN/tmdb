import { useState } from "react";

const CloseIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: any;
}) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" />
        <path
          d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  );
};
export default CloseIcon;
