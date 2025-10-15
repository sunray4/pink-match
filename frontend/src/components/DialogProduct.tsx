import React from "react";
import { Product } from "@/utils/models";
import Image from "next/image";
import DialogPrice from "./DialogPrice";
import DialogDetails from "./DialogDetails";

function DialogProduct({ originalProduct, product }: { originalProduct: Product; product: Product }) {
  const standardStyling = "flex justify-between items-start gap-17 w-full"
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* product image */}
      <div className={standardStyling}>
        <div className="relative p-3 bg-[#ffe8f0] border-2 border-[#b398ae] border-solid rounded-4xl flex justify-center items-center w-full aspect-square">
          <div className="relative w-full h-full">
            {originalProduct.image_url ? (
              <Image
                src={originalProduct.image_url}
                alt="product image"
                fill
                className="object-contain"
              />
            ) : (
              <div>No image available</div>
            )}
          </div>
        </div>
        <div className="relative p-3 bg-[#ffe8f0] border-2 border-[#b398ae] border-solid rounded-4xl flex justify-center items-center w-full aspect-square">
          <div className="relative w-full h-full">
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
        </div>
      </div>
      {/* product details */}
      {/* product title */}
      <div className={standardStyling}>
        <div className="m-4 font-semibold font-cormorant text-[#83667e] text-2xl tracking-tight w-full overflow-hidden">
          <p>{originalProduct?.title ?? ""}</p>
        </div>
        <div className="m-4 font-semibold font-cormorant text-[#83667e] text-2xl tracking-tight w-full overflow-hidden">
          <p>{product?.title ?? ""}</p>
        </div>
      </div>
      <div className={standardStyling}>
        <div className="border-t-1 border-[#83667e] border-solid w-full" />
        <div className="border-t-1 border-[#83667e] border-solid w-full" />
      </div>
      {/* price and purchase link */}
      <div className={standardStyling}>
        <DialogPrice product={originalProduct} />
        <DialogPrice product={product} />
      </div>
      {/* product description */}
      <div className={standardStyling}>
        <DialogDetails title="Description" productInfo={originalProduct?.description} />
        <DialogDetails title="Description" productInfo={product?.description} />
      </div>
      {/* product ingredients */}
      <div className={standardStyling}>
        <DialogDetails title="Ingredients" productInfo={originalProduct?.ingredients ? originalProduct.ingredients.join(", ") : ""} />
        <DialogDetails title="Ingredients" productInfo={product?.ingredients ? product.ingredients.join(", ") : ""} />
      </div>
      {/* product fragrances */}
      <div className={standardStyling}>
        <DialogDetails title="Fragrances" productInfo={originalProduct?.fragrances ? originalProduct.fragrances.join(", ") : ""} />
        <DialogDetails title="Fragrances" productInfo={product?.fragrances ? product.fragrances.join(", ") : ""} />
      </div>
    </div>
  );
}

export default DialogProduct;
