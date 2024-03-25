import SliderCategorie from "./SliderCategorie";
import { Film } from "@/models/types";
import Link from "next/link";
import { useRouter } from "next/router";

type PaginationType = {
  next: string;
  next_page_token: string;
};

const SectionCategory = ({
  title,
  subtitle,
  array,
  token,
  pagination,
  slug,
}: {
  title: string;
  subtitle?: string;
  array: Film[];
  token?: string;
  pagination?: PaginationType;
  slug?: string;
}) => {
  const router = useRouter();

  return (
    <section className="flex flex-col my-10">
      <h2 className="text-4xl font-bold mb-5">{title}</h2>
      <p>{subtitle}</p>
      <SliderCategorie array={array} className={""} />
      {pagination?.next && (
        <Link
          href={{
            pathname: `/categories/${router.query.category}/${slug}`,
          }}
          className="my-5 border-2 w-fit rounded-full px-5 py-2"
        >
          Voir tout les {title}
        </Link>
      )}
    </section>
  );
};

export default SectionCategory;
