// pages/api/addFavorite.js
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma"; // Remplacez par le chemin vers votre instance Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let deletedFavorite;
  if (req.method === "DELETE") {
    const { favoriteId, userId } = req.body; // L'ID du favori à supprimer
    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          userId: userId,
          idMovie: favoriteId,
        },
      });
      if (favorite) {
        deletedFavorite = await prisma.favorite.delete({
          where: {
            id: favorite.id,
          },
        });
      }
      res.status(200).json(deletedFavorite);
    } catch (error) {
      console.error("Erreur lors de la suppression du favori:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du favori" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
