import { GetServerSideProps } from "next";
import {
  Film,
  SearchResult,
  OrganicResult,
  SerpApiSectionPagination,
} from "@/models/types";
import { slugify } from "@/lib/utils";
import SliderCategorie from "@/components/SliderCategorie";
import SectionCategory from "@/components/SectionCategorie";
import { useEffect, useState } from "react";
import BasicButton from "@/components/Button/BasicButton";

const SubCategoryPage = ({
  subCategoryData,
  params,
}: {
  subCategoryData: OrganicResult;
  params: string;
}) => {
  const [allFilms, setAllFilms] = useState<Film[]>([]);
  const [pagination, setPagination] = useState<SerpApiSectionPagination | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const { title, items, serpapi_section_pagination } = subCategoryData;

  useEffect(() => {
    setIsLoading(true);
    setAllFilms(items);
    setPagination(serpapi_section_pagination);
    setToken(serpapi_section_pagination.section_page_token);
    setIsLoading(false);
  }, []);

  const handlePage = async () => {
    setIsLoading(true);
    const url = new URL(pagination?.next);
    if (
      url.searchParams.has("section_page_token") &&
      url.searchParams.has("next_page_token")
    ) {
      url.searchParams.delete("section_page_token");
    }
    const response = await fetch(`/api/serapi?name=${url.toString()}`);
    const newResponse = await response.json();
    const newItems = [...allFilms, ...newResponse.organic_results[0].items];
    setAllFilms(newItems);
    setPagination(newResponse.serpapi_pagination);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-5">{title}</h2>
      {/* <ul className="w-full flex gap-10 flex-wrap">
        {allFilms.map((film, i) => {
          return (
            <li key={i}>
              {" "}
              <div
                key={film.product_id}
                className="w-52 h-auto rounded-sm overflow-hidden shrink-0 "
              >
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </li>
          );
        })}
      </ul> */}
      <SliderCategorie
        array={allFilms}
        className="w-full flex gap-10 flex-wrap"
      />
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <BasicButton onClick={handlePage} className="my-20">
          Voir plus
        </BasicButton>
      )}
    </section>
  );
};

export default SubCategoryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const paramsCategory: string = context?.params?.category;
  const paramsSubCategory: string = context?.params?.subCategory;

  const url = `${
    process.env.SERP_API_BASE_URL_JSON
  }&movies_category=${paramsCategory.toUpperCase()}&api_key=${
    process.env.SERP_API_KEY
  }`;

  let data;
  let subCategoryData;
  try {
    const filmsResponse = await fetch(url);
    data = await filmsResponse.json();
    subCategoryData = data.organic_results.filter((cat: OrganicResult) => {
      return slugify(cat?.title) === paramsSubCategory;
    })[0];
  } catch (error) {
    console.log(error);
  }

  return { props: { subCategoryData } };
};
