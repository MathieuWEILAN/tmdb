import { KeywordsType, Genre } from "@/models/types";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";

const Keywords: React.FC<KeywordsType> = (keywords) => {
  const { locale } = useRouter();
  return (
    <div>
      <h3 className="font-bold mt-5">{wording(locale, "keywords")}</h3>
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
