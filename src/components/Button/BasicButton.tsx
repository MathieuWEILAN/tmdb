import React from "react";

const BasicButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: any;
  className?: string;
}) => {
  return (
    <button
      className={`${className} w-fit my-2.5 my-4 border-2 rounded-full 5 py-1 px-5 hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default BasicButton;
