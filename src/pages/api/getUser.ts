// pages/api/addFavorite.js
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session) {
      const userEmail = session.user.email; // Utiliser l'email depuis la session
      try {
        const user = await prisma.user.findUnique({
          where: { email: userEmail },
          include: { favorites: true },
        });
        res.status(200).json(user);
      } catch (error) {
        console.error("Requête échouée:", error);
        res.status(500).json({
          error: "Erreur lors de la récupération des données utilisateur",
        });
      }
    } else {
      res.status(401).json({ message: "Utilisateur non authentifié" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Méthode non autorisée");
  }
}
