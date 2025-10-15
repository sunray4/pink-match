"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import ProductCard from "@/components/ProductCard";
import * as Dialog from "@radix-ui/react-dialog";
import CompareDialog from "@/components/CompareDialog";
import { Product } from "@/utils/models";

function ProductPage() {
	const [newProductInModal, setNewProductInModal] = useState<Product | null>(null);
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const [originalProduct, setOriginalProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleStorageChange = () => {
			console.log('storage/localStorageChange handler triggered');
			const results = localStorage.getItem('searchResults');
			const originalProduct = localStorage.getItem('originalProduct');

			if (results && originalProduct) {
				try {
					setSearchResults(JSON.parse(results));
					setOriginalProduct(JSON.parse(originalProduct));
					localStorage.removeItem('searchResults');
					localStorage.removeItem('originalProduct');
					console.log('Loaded searchResults and originalProduct from localStorage');
				} catch (error) {
					console.error('Failed to parse stored search results:', error);
				}
			}
			setIsLoading(false);
		};

		// Run once on mount to load any pre-existing values
		handleStorageChange();

		// Listen for the custom in-app event (dispatched by SearchInput) and the native storage event (cross-tab)
		window.addEventListener('localStorageChange', handleStorageChange);
		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('localStorageChange', handleStorageChange);
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);


	const handleCompareClick = (product: Product) => {
		setNewProductInModal(product);
	};

	return (
		<Dialog.Root>
			<div className="flex flex-col items-center min-h-[90vh]">
				<SearchInput />
				<div className="relative z-10 mt-10 h-[40vh] min-w-[20vw] max-w-[50vw]">
					{originalProduct?.image_url && (
						<Image alt="Product showcase" className="object-contain" src={originalProduct?.image_url} fill  />
					)}
				</div>
				<div className="mt-2">
					<Image alt="podium" className="" src="/podium.png" width={791} height={395} />
				</div>
				<p className="text-[#83667e] mt-14 text-2xl tracking-tight sm:tracking-[-0.04em]">Find your matches below</p>
				<Image alt="Down arrow" className="mt-3" src="/down-arrow.svg" width={40} height={24} />
			</div>
			<div className="bg-[#ffe8f0] p-14">
				<p className="text-[#83667e] font-bold font-cormorant text-4xl lg:text-5xl xl:text-[4.6875rem] tracking-[-0.45em] md:tracking-[-0.054em]">Product Matches</p>
				<div className="mt-7 grid justify-center gap-8 sm:gap-10"
					style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(23rem, 1fr))' }}>
					{searchResults.length !== 0 ? (
						searchResults.map((product) => (
						<ProductCard
							key={product.asin}
							originalProduct={originalProduct}
							product={product}
							onCompareClick={() => handleCompareClick(product)}
						/>
						))
					) : isLoading ? (
						<p className="text-[#83667e] text-2xl tracking-tight sm:tracking-[-0.04em]">Loading...</p>
					) : (
						<p className="text-[#83667e] text-2xl tracking-tight sm:tracking-[-0.04em]">
						No cheaper alternatives found. Try searching for a different product.
						</p>
					)}
				</div>

			</div>
			{/* Compare Dialog */}
			{ newProductInModal && originalProduct && (
				<CompareDialog originalProduct={originalProduct} newProduct={newProductInModal} />
			)}
		</Dialog.Root>
	)
}
	
export default ProductPage;
