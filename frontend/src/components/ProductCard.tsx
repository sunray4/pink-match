import React from 'react'
import Image from 'next/image'
import * as Dialog from "@radix-ui/react-dialog";

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
    <div className="bg-white box-border content-stretch flex flex-col h-[49vh] items-center border-2 border-[#b398ae] border-solid relative rounded-4xl shrink-0 w-full max-w-[22rem] lg:w-[23rem] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0px_12px_20px_0px_rgba(0,0,0,0.15)]">
        <div className="relative shrink-0 m-3 size-[13.7rem]">
            <Image alt="Search inspection icon" className="block max-w-none size-full" src={product?.image_url ?? ''} width={219} height={219} />
        </div>
        <div className='border-t-2 border-[#b398ae] border-solid w-full'></div>
        <div className="m-4 font-medium text-[#83667e] text-lg tracking-tight w-72 h-30 overflow-hidden">
            <p>{product?.description ?? ''}</p>
        </div>
        <div className='grid justify-items-end w-full'>
        <Dialog.Trigger asChild>
          <button className="text-[#83667e] m-5 mb-4 font-medium tracking-tight bg-white box-border content-stretch flex flex-col gap-[10px] h-[40px] items-end justify-center border-2 border-[#83667e] border-solid rounded-4xl p-5 hover:bg-[#83667e] hover:text-white hover:cursor-pointer" onClick={onCompareClick}>Compare Products</button>
        </Dialog.Trigger>
        </div>
    </div>
  )
}

export default ProductCard
