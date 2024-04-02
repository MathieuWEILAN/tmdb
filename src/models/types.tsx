export interface Genre {
  // Assuming genre_ids is an array of numbers or specific identifiers for genres
  id: number;
  name: string; // This could be the genre name if needed, not provided but commonly included
}
export interface KeywordsType {
  id: number;
  keywords: Genre[];
}

export type AuthorDetails = {
  avatar_path: string;
  name: string;
  rating: number;
  username: string;
};

export type ReviewType = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export interface PersonListing {
  page: number;
  results: PersonType[];
  total_pages: number;
  total_results: number;
}
export interface PersonType {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Movie[];
  known_for_department: string;
  media_type: "person";
  name: string;
  original_name: string;
  popularity: number;
}

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface PersonCredits {
  cast: Movie[] | TVShow[];
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
  original_title?: string;
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

export interface VideoPreview {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export type SocialMediasType = {
  id?: number;
  imdb_id?: string;
  wikidata_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  freebase_mid?: string | null;
  freebase_id?: string | null;
  tvrage_id?: number | null;
  tiktok_id?: string | null;
  youtube_id: string | null;
};

export interface ProvidersListing {
  buy: ProviderType[];
  flatrate: ProviderType[];
  link: string;
  rent: ProviderType[];
}
export interface ProviderType {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  character?: string; // Assuming this is a property for cast members
  credit_id?: string; // Assuming this is a property for cast members
  genre_ids?: Genre[]; // Assuming genre_ids is an array of Genre objects, otherwise, use number[] if it's just IDs
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string; // Assuming this is a property for TV shows
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // Assuming ISO 8601 date format (YYYY-MM-DD), consider using Date type if converting to Date object
  title: string;
  video: boolean;
  media_type?: string;
  vote_average: number;
  vote_count: number;
  genre_name?: Genre[] | undefined; // Optional property to store the genre name
}

export interface Dates {
  maximum: string; // Date in ISO 8601 format (YYYY-MM-DD), consider using Date type if converting to Date object
  minimum: string; // Similarly, Date in ISO 8601 format
}

export enum TypeOfObj {
  TV = "tv",
  MOVIE = "movie",
  PERSON = "person",
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

export type MovieCollection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
};

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

export interface CrewMember {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface CastMemberListing {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
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
  backdrops?: ImageDetails[];
  profiles?: ImageDetails[];
}

export interface ReviewsListing {
  id: number;
  page: number;
  results: ReviewType[];
  total_pages: number;
  total_results: number;
}
