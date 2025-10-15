import React from 'react'

interface Product {
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
interface ProductCardProps {
  originalProduct: Product | null;
  product?: Product;
  onCompareClick: () => void;
}

function ProductCard({ originalProduct, product, onCompareClick }: ProductCardProps) {
const discount = originalProduct?.unit_price != null && product?.unit_price != null && Number(originalProduct?.unit_price) > 0 && Number(product?.unit_price) > 0 ? ((Number(originalProduct.unit_price) - Number(product.unit_price)) / Number(originalProduct.unit_price) * 100).toFixed(0) : null;
  return (
    <div className=''>
      
    </div>
  )
}

export default ProductCard
