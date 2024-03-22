export interface Category {
  id: number;
  name: string;
  image: string;
  products?: Product[]; // Utilisation de ? pour indiquer que la propriété est optionnelle
}
export type CategoriesArray = Category[];

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export type ProductsArray = Product[];

// ------------------------- //

export type AppContextType = {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  filmSelected: Film | null;
  setFilmSelected: (film: Film) => void;
  cart: Film[] | [];
  setCart: (film: Film[]) => void;
};

export interface SerpApiSectionPagination {
  next: string;
  section_page_token: string;
}

export interface OrganicResult {
  title: string;
  subtitle?: string; // Propriété optionnelle car elle n'est pas présente dans tous les objets
  serpapi_section_pagination: SerpApiSectionPagination;
  items: Film[];
}

export interface ApiResponse {
  organic_results: OrganicResult[];
}

export interface Film {
  title: string;
  link: string;
  product_id: string;
  serpapi_link: string;
  rating: number;
  video: string;
  category: string;
  price: string;
  extracted_price: number;
  thumbnail: string;
  description: string;
}

export type SearchMetadata = {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_play_movies_url: string;
  raw_html_file: string;
  total_time_taken: number;
};

export type SearchParameters = {
  engine: string;
  hl: string;
  gl: string;
  movies_category: string;
};

export type ChartOption = {
  text: string;
  value: string;
};

export type SerpapiSectionPagination = {
  // Complétez avec les propriétés attendues de l'objet
};

export type Item = {
  // Complétez avec les propriétés attendues de l'objet
};

export type SerpapiPagination = {
  next: string;
  next_page_token: string;
};

export type SearchResult = {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  chart_options: ChartOption[];
  organic_results: OrganicResult[];
  serpapi_pagination: SerpapiPagination;
};
