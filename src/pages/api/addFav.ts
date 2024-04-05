// pages/api/addFavorite.js
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma"; // Remplacez par le chemin vers votre instance Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    {
      const { userId, itemId, itemTitle, itemType, itemImage } = req.body;
      // CHECK IF ALREADY FAVORITES
      try {
        const existingFavorite = await prisma.favorite.findFirst({
          where: {
            AND: [{ userId: userId }, { idItem: itemId }],
          },
        });
        if (existingFavorite) {
          return;
        } else {
          // IF NOT IN FAVORITES, ADD
          const favorite = await prisma.favorite.create({
            data: {
              title: itemTitle,
              idItem: itemId,
              userId: userId,
              type: itemType,
              poster_path: itemImage,
            },
          });
          const userFavorites = await prisma.favorite.findMany({
            where: {
              userId: userId,
            },
          });
          return res.status(200).json(userFavorites);
        }
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
