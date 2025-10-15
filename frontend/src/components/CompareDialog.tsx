import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Product } from "@/utils/models";
import DialogProduct from "./DialogProduct";

interface CompareModalProps {
  originalProduct: Product;
  newProduct: Product;
}

function CompareDialog({ originalProduct, newProduct }: CompareModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60 animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]" />
      <Dialog.Content className="flex flex-col border-1 border-[#b398ae] border-solid bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] rounded-2xl shadow-lg focus:outline-none overflow-visible">
        <VisuallyHidden.Root>
          <Dialog.Title>Compare Products</Dialog.Title>
        </VisuallyHidden.Root>
        <Dialog.Close asChild>
          <button
            className="absolute right-4 top-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#83667e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Dialog.Close>
        <div className="flex justify-evenly items-start w-full overflow-auto p-17">
          <DialogProduct originalProduct={originalProduct} product={newProduct} />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CompareDialog;
