"use client";

import { useEffect } from "react";
import Image from "next/image";

// Asset URLs from Figma
const imgLine5 = "/Line 3.svg";

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
  unitPrice?: number;
  similarity_score?: number;
}

interface CompareModalProps {
  originalProduct: Product;
  newProduct: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({ originalProduct, newProduct, isOpen, onClose }: CompareModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-h-[90vh] max-w-[95vw] overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#83667e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Product List Content */}
        <div className="bg-gradient-to-b from-[#ffffff] from-[89.423%] relative w-[1280px] h-[1236px] to-[#fff3f6] rounded-2xl shadow-2xl" data-name="Product List" data-node-id="27:440">
          <div className="absolute content-stretch flex gap-[80px] items-center leading-[0] left-1/2 top-[85px] translate-x-[-50%]" data-node-id="37:591">
            {/* Product 1 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="37:573">
              <div className="[grid-area:1_/_1] bg-[#fff3f6] h-[420px] ml-px mt-0 relative rounded-[40px] w-[512px] p-6" data-node-id="34:507">
                <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[40px]" />
                {originalProduct?.image_url && (
                  <Image 
                    alt={originalProduct.title || "Original product"} 
                    className="w-full h-full object-contain rounded-[34px]" 
                    src={originalProduct.image_url} 
                    width={500} 
                    height={408} 
                  />
                )}
              </div>
              <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[50px] items-start ml-0 mt-[489px] relative w-[511px]" data-node-id="37:571">
                <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full" data-node-id="37:572">
                  <div className="absolute font-cormorant italic leading-[0] min-w-full relative shrink-0 text-[#83667e] text-[75px] tracking-[-4.5px]" data-node-id="37:560" style={{ width: "min-content" }}>
                    <p className="leading-[normal]">{originalProduct?.title}</p>
                  </div>
                  <div className="h-0 relative shrink-0 w-[511px]" data-node-id="37:564">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <Image alt="" className="block max-w-none size-full" src={imgLine5} width={511} height={1} />
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 text-[40px] text-nowrap text-right tracking-[-1.6px] w-full" data-node-id="37:563">
                    <div className="font-[var(--font-instrument-sans)] font-bold relative shrink-0 text-[#fca4c0]" data-node-id="34:511">
                      <p className="leading-[normal] text-nowrap whitespace-pre">${originalProduct?.price}</p>

                      <p className="leading-[normal] text-nowrap whitespace-pre font-normal text-[16px]">${originalProduct?.unitPrice} per 100mL</p>
                    </div>
                    <div className="font-[var(--font-instrument-sans)] font-semibold relative shrink-0 text-[#83667e]" data-node-id="37:523">
                      <a className="[text-underline-position:from-font] decoration-solid leading-[normal] text-nowrap underline whitespace-pre cursor-pointer hover:text-[#fca4c0] transition-colors" href={`https://www.amazon.ca/dp/${originalProduct?.asin}`}>Purchase Here</a>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-node-id="37:570">
                  <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full" data-node-id="37:568">
                    <div className="font-[var(--font-instrument-sans)] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" data-node-id="34:514">
                      <p className="leading-[normal]">Product Description</p>
                    </div>
                    <div className="font-[var(--font-instrument-sans)] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" data-node-id="37:565">
                      <p className="leading-[normal]">{originalProduct?.description}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full" data-node-id="37:569">
                    <div className="font-[var(--font-instrument-sans)] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" data-node-id="37:521">
                      <p className="leading-[normal]">Key Ingredients</p>
                    </div>
                    <div className="font-[var(--font-instrument-sans)] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" data-node-id="37:566">
                      {originalProduct?.ingredients && originalProduct.ingredients.length > 0 ? (
                        <p className="leading-[normal]">{originalProduct.ingredients.join(", ")}</p>
                      ) : (
                        <p className="leading-[normal]">N/A</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="37:574">
              <div className="[grid-area:1_/_1] bg-[#fff3f6] h-[420px] ml-px mt-0 relative rounded-[40px] w-[512px] p-6" data-node-id="37:575">
                <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[40px]" />
                {newProduct?.image_url && (
                  <Image 
                    alt={newProduct.title || "Comparison product"} 
                    className="w-full h-full object-contain rounded-[34px]" 
                    src={newProduct.image_url} 
                    width={500} 
                    height={408} 
                  />
                )}
              </div>
              <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[50px] items-start ml-0 mt-[489px] relative w-[511px]" data-node-id="37:576">
                <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full" data-node-id="37:577">
                  <div className="absolute font-cormorant italic leading-[0] min-w-full relative shrink-0 text-[#83667e] text-[75px] tracking-[-4.5px]" data-node-id="37:578" style={{ width: "min-content" }}>
                    {newProduct?.title && (
                      <p className="leading-[normal]">{newProduct?.title}</p>
                    )}
                  </div>
                  <div className="h-0 relative shrink-0 w-[511px]" data-node-id="37:579">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <Image alt="" className="block max-w-none size-full" src={imgLine5} width={511} height={1} />
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 text-[40px] text-nowrap text-right tracking-[-1.6px] w-full" data-node-id="37:580">
                    <div className="font-[var(--font-instrument-sans)] font-bold relative shrink-0 text-[#fca4c0]" data-node-id="37:581">
                      <p className="leading-[normal] text-nowrap whitespace-pre">${newProduct?.price}</p>
                      {newProduct?.unitPrice && (
                        <p className="leading-[normal] text-nowrap whitespace-pre font-normal text-[16px]">${newProduct?.unitPrice} per 100mL</p>
                      )}
                    </div>
                    <div className="font-[var(--font-instrument-sans)] font-semibold relative shrink-0 text-[#83667e]" data-node-id="37:582">
                      <a className="[text-underline-position:from-font] decoration-solid leading-[normal] text-nowrap underline whitespace-pre cursor-pointer hover:text-[#fca4c0] transition-colors" href={`https://www.amazon.ca/dp/${newProduct?.asin}`}>Purchase Here</a>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-node-id="37:583">
                  <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full" data-node-id="37:584">
                    <div className="font-[var(--font-instrument-sans)] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" data-node-id="37:585">
                      <p className="leading-[normal]">Product Description</p>
                    </div>
                    <div className="font-[var(--font-instrument-sans)] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" data-node-id="37:586">
                      <p className="leading-[normal]">{newProduct?.description}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full" data-node-id="37:587">
                    <div className="font-[var(--font-instrument-sans)] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" data-node-id="37:588">
                      <p className="leading-[normal]">Key Ingredients</p>
                    </div>
                    <div className="font-[var(--font-instrument-sans)] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" data-node-id="37:589">
                      {newProduct?.ingredients && newProduct.ingredients.length > 0 ? (
                        <p className="leading-[normal]">{newProduct.ingredients.join(", ")}</p>
                      ) : (
                        <p className="leading-[normal]">N/A</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}