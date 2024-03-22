import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next";
import { Film, SearchResult } from "@/models/types";
import { slugify } from "@/lib/utils";

import SectionCategory from "@/components/SectionCategorie";

const CategoryPage = ({
  data,
  params,
}: {
  data: SearchResult;
  params: string;
}) => {
  const arrayOfFilms = data.organic_results;
  return (
    <section className="flex flex-col">
      {arrayOfFilms.map((cat, i) => (
        <SectionCategory
          key={i}
          title={cat.title}
          subtitle={cat?.subtitle}
          array={cat.items}
          pagination={cat?.serpapi_section_pagination}
          slug={slugify(cat.title)}
        />
      ))}
    </section>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params: string = context?.params?.slug;
  const url = `${
    process.env.SERP_API_BASE_URL_JSON
  }&movies_category=${params.toUpperCase()}&api_key=${
    process.env.SERP_API_KEY
  }`;

  let data;
  try {
    const filmsResponse = await fetch(url);
    data = await filmsResponse.json();
  } catch (error) {
    console.log(error);
  }
  return { props: { data, params } };
};
