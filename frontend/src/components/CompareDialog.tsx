import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Product } from '@/utils/models';
import DialogProduct from './DialogProduct';

interface CompareModalProps {
  originalProduct: Product;
  newProduct: Product;
}

function CompareDialog( {originalProduct, newProduct} : CompareModalProps) {
  return (
    <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className='bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[80vw] max-w-[95vw] max-h-[95vh] p-6 rounded-2xl shadow-lg focus:outline-none overflow-auto'>
            <VisuallyHidden.Root>
                <Dialog.Title>Compare Products</Dialog.Title>
            </VisuallyHidden.Root>
            <Dialog.Close asChild>
                <button
                    className="absolute right-4 top-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#83667e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
            </Dialog.Close>
            <div className="m-14 grid grid-cols-2 gap-x-10">
                <DialogProduct product={originalProduct} />
                <DialogProduct product={newProduct} />
            </div>
        </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CompareDialog
