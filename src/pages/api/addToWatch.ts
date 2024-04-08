// pages/api/addFavorite.js
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma"; // Remplacez par le chemin vers votre instance Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    {
      const {
        userId,
        itemId,
        itemTitle,
        itemType,
        itemImage,
        itemDateRelease,
      } = req.body;
      // CHECK IF ALREADY TO WATCH
      try {
        const existingToWatch = await prisma.toWatch.findFirst({
          where: {
            AND: [{ userId: userId }, { idItem: itemId }],
          },
        });
        if (existingToWatch) {
          return;
        } else {
          // IF NOT IN FAVORITES, ADD
          const toWatch = await prisma.toWatch.create({
            data: {
              title: itemTitle,
              idItem: itemId,
              userId: userId,
              type: itemType,
              poster_path: itemImage,
              date_release: itemDateRelease,
            },
          });
          const userToWatch = await prisma.toWatch.findMany({
            where: {
              userId: userId,
            },
          });
          return res.status(200).json(userToWatch);
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
