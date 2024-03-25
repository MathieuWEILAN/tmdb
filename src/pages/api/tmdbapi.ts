import type { NextApiRequest, NextApiResponse } from "next";
import { SearchResult } from "@/models/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {
  const url = new URL(req?.query?.name);

  Object.keys(req.query).forEach((key) => {
    if (key !== "name") {
      // Exclure la clé 'name' qui est déjà utilisée comme base de l'URL
      url.searchParams.set(key, req.query[key]);
    }
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const response = await fetch(`${url}`, options);
  const moreDataJson = await response.json();
  res.status(200).json(moreDataJson);
}
