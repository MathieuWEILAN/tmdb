import { Movie, MovieListing, Genre, TypeOfObj, TVShow } from "../models/types";
import fr from "../data/fr-FR.json";
import en from "../data/en-US.json";
import es from "../data/es-ES.json";
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

export const formaterDate = (dateISO: string) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateISO);
  const dateFormatee = new Intl.DateTimeFormat("en-US", options).format(date);
  return dateFormatee;
};

export const wording = (lang: string | undefined, word: string) => {
  const wording = {
    fr,
    en,
    es,
  };

  const newLang = lang.split("-")[0];
  if (lang && word) {
    return wording[newLang][word];
  } else {
    return null;
  }
};

export const groupByDecade = (items: any, type: TypeOfObj) => {
  return items.reduce((acc, item) => {
    // Extraire l'année de la date
    let year;
    if (type === TypeOfObj.MOVIE) {
      year = item.release_date.substring(0, 4);
    }
    if (type === TypeOfObj.TV) {
      year = item.first_air_date.substring(0, 4);
    }
    // Trouver la décennie en retirant l'unité et en multipliant par 10
    const decade = Math.floor(year / 10) * 10;
    // Créer une clé pour la décennie si elle n'existe pas
    if (!acc[decade]) {
      acc[decade] = [];
    }
    // Ajouter l'objet au groupe de la décennie correspondante
    acc[decade].push(item);
    return acc;
  }, {});
};
