import { Movie, MovieListing, Genre } from "../models/types";
export const slugify = (text: string) => {
  return (
    text
      // Convertit en minuscules
      .toLowerCase()
      // Remplace les espaces par des tirets
      .replace(/\s+/g, "-")
      // Supprime tous les caractères non alphanumériques sauf les tirets
      .replace(/[^a-z0-9-]/g, "")
      // Supprime les tirets multiples
      .replace(/-+/g, "-")
      // Supprime les tirets au début et à la fin
      .replace(/^-+|-+$/g, "")
  );
};

export const convertToPercentage = (voteAverage: number) => {
  const percentage = voteAverage * 10;
  const roundedPercentage = Math.round(percentage);
  return `${roundedPercentage}%`;
};

export const createCategory = (object: MovieListing, categories: Genre[]) => {
  object.results.forEach((movie: Movie) => {
    movie.genre_name = [];
  });
  object.results.forEach((movie: Movie) => {
    movie.genre_ids.forEach((id) => {
      categories.map((cat: Genre) => {
        if (cat.id === id) {
          movie.genre_name.push(cat);
        }
      });
    });
  });
  return object;
};

export const getTextColor = (hexColor: string) => {
  // Convertir le hex en RGB
  let r = parseInt(hexColor.substr(1, 2), 16);
  let g = parseInt(hexColor.substr(3, 2), 16);
  let b = parseInt(hexColor.substr(5, 2), 16);

  // Calculer la luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Déterminer la couleur du texte basée sur la luminance
  // En utilisant 0.5 comme seuil, mais cela peut être ajusté
  return luminance > 0.5 ? false : true;
};

export const getYear = (date: string) => {
  return date.split("-")[0];
};

export const convertMinutesToHoursMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours}h${minutesLeft}`;
};
