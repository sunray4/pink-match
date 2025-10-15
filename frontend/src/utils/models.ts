export interface Product {
  asin?: string;
  title?: string;
  description?: string;
  rating?: number;
  price?: string;
  image_url?: string;
  ingredients?: string[];
  fragrances?: string[];
  volume_ml?: number;
  volume?: number;
  unit_price?: number;
  similarity_score?: number;
}