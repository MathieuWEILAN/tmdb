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
