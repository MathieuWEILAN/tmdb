export type AppContextType = {
  isModal: boolean;
  // setIsModal: (isModal: boolean) => void;
  // filmSelected: Film | null;
  // setFilmSelected: (film: Film) => void;
  // cart: Film[] | [];
  // setCart: (film: Film[]) => void;
};
export interface Genre {
  // Assuming genre_ids is an array of numbers or specific identifiers for genres
  id: number;
  name: string; // This could be the genre name if needed, not provided but commonly included
}
export interface Keywords {
  id: number;
  keywords: Genre[];
}
export interface TVShowListing {
  page: number;
  results: TVShow[];
  total_results: number;
  total_pages: number;
}
export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: null | string;
  }>;
  episode_run_time: number[];
  first_air_date: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: null; // This could be expanded to an object similar to last_episode_to_air if necessary
  networks: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Genre[]; // Assuming genre_ids is an array of Genre objects, otherwise, use number[] if it's just IDs
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // Assuming ISO 8601 date format (YYYY-MM-DD), consider using Date type if converting to Date object
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_name?: Genre[] | undefined; // Optional property to store the genre name
}

export interface Dates {
  maximum: string; // Date in ISO 8601 format (YYYY-MM-DD), consider using Date type if converting to Date object
  minimum: string; // Similarly, Date in ISO 8601 format
}

export enum TypeOfObj {
  TV = "TV",
  MOVIE = "MOVIE",
}
export interface MovieListing {
  dates?: Dates;
  page: number;
  results: Movie[];
  total_results?: number;
  total_pages?: number;
}

export interface Categories {
  id: number;
  name: string;
}

export interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideoResults {
  id: number;
  results: VideoResult[];
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CastMember {
  adult: boolean;
  gender: 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CastMemberListing {
  id: number;
  cast: CastMember[];
  crew: CastMember[];
}

export interface VideoPreview {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface VideosListing {
  id: number;
  results: VideoPreview[];
}

export interface ImageDetails {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesListing {
  id?: number;
  backdrops: ImageDetails[];
}

export interface ReviewsListing {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}
export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: null | string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
