import React from 'react'
import { Product } from '@/utils/models'

function DialogPrice({ product }: { product: Product }) {
  return (
    <div className="flex justify-between w-full mt-5">
        {product?.price != null && Number(product?.price) > 0 ? (
        <div className="font-bold text-2xl relative shrink-0 text-[#fca4c0]">
            <p>${product?.price}</p>
            {product?.unit_price != null && Number(product?.unit_price) > 0 && (
            <p className="text-nowrap font-normal text-[16px] mt-2 tracking-wide">
                ${Number(product?.unit_price).toFixed(2)} per 100mL
            </p>
            )}
        </div>
        ) : (
        <div className="font-bold text-2xl relative shrink-0 text-[#fca4c0]">
            <p>Price not available</p>
        </div>
        )}
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
  )
}

export default DialogPrice
