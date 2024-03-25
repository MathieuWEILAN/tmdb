const Tag = ({
  name,
  id,
  className,
  onClick,
}: {
  name: string;
  id: number;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 px-2.5 rounded-full my-1 mr-1 font-bold ${className}`}
    >
      {name}
    </button>
  );
};

export default Tag;
