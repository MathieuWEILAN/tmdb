// pages/api/addFavorite.js
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma"; // Remplacez par le chemin vers votre instance Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    {
      const { userId, movieId, movieTitle, movieType } = req.body;
      try {
        const favorite = await prisma.favorite.create({
          data: {
            title: movieTitle,
            idMovie: movieId,
            userId: userId, // Cela doit être l'ID de l'utilisateur connecté
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
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
