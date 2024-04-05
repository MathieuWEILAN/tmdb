import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    {
      const { userId, movieId, movieTitle, movieType } = req.body;

      try {
        const favorite = await prisma.favorite.create({
          data: {
            id: movieId,
            title: movieTitle,
            userId: userId,
            type: movieType,
          },
        });
        return res.status(200).json(favorite);
      } catch (error) {
        console.error("Requête échouée:", error);
        return res
          .status(500)
          .json({ error: "Échec de l'enregistrement du favori" });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
