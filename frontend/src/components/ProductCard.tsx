import React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Product } from "@/utils/models";

interface ProductCardProps {
  originalProduct: Product | null;
  product?: Product;
  onCompareClick: () => void;
}

function ProductCard({
  originalProduct,
  product,
  onCompareClick,
}: ProductCardProps) {
  const discount =
    originalProduct?.unit_price != null &&
    product?.unit_price != null &&
    Number(originalProduct?.unit_price) > 0 &&
    Number(product?.unit_price) > 0
      ? (
          ((Number(originalProduct.unit_price) - Number(product.unit_price)) /
            Number(originalProduct.unit_price)) *
          100
        ).toFixed(0)
      : null;
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[56vh] items-center border-2 border-[#b398ae] border-solid relative rounded-4xl shrink-0 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0px_12px_20px_0px_rgba(0,0,0,0.15)]">
      <div className="relative shrink-0 w-[13.7rem] h-[17.7rem] flex items-center justify-center p-3">
        <div className="relative w-full h-full">
          <Image
            alt="product image"
            src={product?.image_url ?? ""}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="border-t-2 border-[#b398ae] border-solid w-full"></div>
      <div className="m-4 mb-2 font-medium text-[#83667e] text-lg tracking-tight w-5/6 max-h-29 overflow-hidden">
        <p>{product?.title ?? ""}</p>
      </div>
      {product?.similarity_score != null && (
        <div className="relative flex flex-col justify-start w-5/6 m-4 mt-0">
          <p className="text-[#fca4c0] font-semibold tracking-tight">
            {(product?.similarity_score * 100).toPrecision(3)}% similar
          </p>
        </div>
      )}
      <div className="absolute bottom-4 right-4">
        <Dialog.Trigger asChild>
          <button
            className="text-[#83667e] m-5 mb-4 font-medium tracking-tight bg-white box-border flex flex-col gap-[10px] h-[40px] items-end justify-center border-2 border-[#83667e] border-solid rounded-4xl p-5 hover:bg-[#83667e] hover:text-white hover:cursor-pointer"
            onClick={onCompareClick}
          >
            Compare Products
          </button>
        </Dialog.Trigger>
      </div>
      {discount && Number(discount) < 0 && (
        <div className="absolute -top-4 -right-4 flex items-center justify-center bg-[#fca4c0] text-white text-xl font-bold p-3 border-1 border-[#83667E] aspect-square rounded-full -rotate-22">
          {discount}%
        </div>
      )}
    </div>
  );
}

export default ProductCard;
