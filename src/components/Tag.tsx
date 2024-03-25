const Tag = ({
  name,
  id,
  className,
}: {
  name: string;
  id: number;
  className?: string;
}) => {
  const handleCategory = () => {};
  return (
    <button
      onClick={() => {
        console.log(name);
      }}
      className={`border-2 px-2.5 rounded-full my-1 mr-1 font-bold ${className}`}
    >
      {name}
    </button>
  );
};

export default Tag;
