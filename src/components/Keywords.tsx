import { KeywordsType, Genre } from "@/models/types";

const Keywords: React.FC<KeywordsType> = (keywords) => {
  return (
    <div>
      <h3 className="font-bold mt-5">Keywords</h3>
      <div className="flex flex-wrap">
        {keywords.keywords.map((keyword: Genre) => (
          <span
            key={keyword.id}
            className="box-shadow-2 rounded-full px-2 my-1"
          >
            {keyword.name}
          </span>
        ))}
      </div>
    </div>
  );
};
export default Keywords;
