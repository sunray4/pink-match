import React from "react";
import { Product } from "@/utils/models";
import Image from "next/image";

function DialogProduct({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-center justify-center w-2/5">
      {/* product image */}
      <div className="relative p-3 bg-[#ffe8f0] border-2 border-[#b398ae] border-solid rounded-4xl flex justify-center items-center w-full aspect-square">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt="product image"
            fill
            className="object-contain"
          />
        ) : (
          <div>No image available</div>
        )}
      </div>
      {/* product details */}
      {/* product title */}
      <div className="m-4 font-semibold font-cormorant text-[#83667e] text-2xl tracking-tight w-full overflow-hidden">
        <p>{product?.title ?? ""}</p>
      </div>
      <div className="border-t-1 border-[#83667e] border-solid w-full"></div>
      {/* price and purchase link */}
      <div className="flex justify-between w-full mt-5">
        <div className="font-bold text-2xl relative shrink-0 text-[#fca4c0]">
          <p>${product?.price}</p>
          {product?.unit_price != null && Number(product?.unit_price) > 0 && (
            <p className="text-nowrap font-normal text-[16px] mt-2 tracking-wide">
              ${Number(product?.unit_price).toFixed(2)} per 100mL
            </p>
          )}
        </div>
        <div className="relative shrink-0">
          <a
            href={`https://www.amazon.ca/dp/${product?.asin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-xl font-semibold text-[#83667e] hover:text-[#fca4c0] transition-colors"
          >
            Purchase Here
          </a>
        </div>
      </div>
      {/* product description */}
        <div className="text-[#83667e] w-full mt-7">
          <p className="font-bold text-2xl">Product Description</p>
          {product?.description ? (
            <p className="tracking-tight">
              {product?.description}
            </p>
          ) : (
            <p className="tracking-tight">
              No description available
            </p>
          )}
        </div>
        {/* product ingredients */}
        <div className="text-[#83667e] w-full mt-7">
          <p className="font-bold text-2xl">Ingredients</p>
          {product?.ingredients && product.ingredients.length > 0 ? (
            <p className="tracking-tight">{product.ingredients.join(", ")}</p>
          ) : (
            <p className="tracking-tight">No ingredients available</p>
          )}
        </div>
        {/* product fragrances */}
        {product?.fragrances && product.fragrances.length > 0 && (
            <div className="text-[#83667e] w-full mt-7">
              <p className="font-bold text-2xl">Fragrances</p>
              <p className="tracking-tight">{product.fragrances.join(", ")}</p>
            </div>
          )}
    </div>
  );
}

export default DialogProduct;
