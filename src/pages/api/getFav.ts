// pages/api/addFavorite.js
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Assurez-vous que nous sommes en méthode POST
  if (req.method === "GET") {
    {
      // Récupérez l'ID de l'utilisateur et l'ID du film depuis le corps de la requête
      const { userId, movieId, movieTitle, movieType } = req.body;

      // Enregistrez le film en tant que favori dans la base de données
      try {
        const favorite = await prisma.favorite.create({
          data: {
            id: movieId,
            title: movieTitle,
            userId: userId, // Cela doit être l'ID de l'utilisateur connecté
            type: movieType,
            // Assurez-vous que l'ID de l'utilisateur est lié
            // à une entrée valide dans la table 'User'
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
