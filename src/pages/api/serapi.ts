import type { NextApiRequest, NextApiResponse } from "next";
import { SearchResult } from "@/models/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {
  const url = new URL(req?.query?.name);

  console.log(url);
  Object.keys(req.query).forEach((key) => {
    if (key !== "name") {
      // Exclure la clé 'name' qui est déjà utilisée comme base de l'URL
      url.searchParams.set(key, req.query[key]);
    }
  });

  const response = await fetch(`${url}&api_key=${process.env.SERP_API_KEY}`);
  const moreDataJson = await response.json();
  res.status(200).json(moreDataJson);
}
