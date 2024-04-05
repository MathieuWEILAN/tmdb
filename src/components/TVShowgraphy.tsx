import { TVShow, TypeOfObj, CrewMember } from "@/models/types";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
import { groupByDecade } from "@/lib/utils";
import Accordion from "./Accordion";

const TVShowgraphy = ({
  tvShows,
  type,
}: {
  tvShows: TVShow[];
  type: string;
}) => {
  const { locale } = useRouter();

  tvShows.sort(
    (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
  );
  const tvShowByDecade = groupByDecade(tvShows, TypeOfObj.TV);
  const sortedDecades = Object.keys(tvShowByDecade).sort((a, b) => b - a);
  return (
    <div className="w-full lg:w-1/2">
      <h2>{wording(locale, "tv_shows")}</h2>
      <div>
        {sortedDecades.map((decade) => {
          return (
            <Accordion
              key={decade}
              title={decade}
              items={tvShowByDecade[decade]}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};
export default TVShowgraphy;
