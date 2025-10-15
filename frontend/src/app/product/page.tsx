"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import ProductCard from "@/components/ProductCard";
import * as Dialog from "@radix-ui/react-dialog";
import CompareDialog from "@/components/CompareDialog";
// import CompareModal from "../components/CompareModal";

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

const sampleProduct: Product = {
	"asin": "B000123456",
	"title": "Sample Deodorant",
	"description": "This is a sample deodorant description.",
	"rating": 4.5,
	"price": "$9.99",
	"image_url": "/ocean-frame.webp",
	"ingredients": ["Ingredient1", "Ingredient2"],
	"fragrances": ["Floral", "Citrus"],
	"volume_ml": 150,
	"unit_price": 0.0666,
	"similarity_score": 0.95
};

const originalProduct: Product = {
	"asin": "B000654321",
	"title": "Original Deodorant",
	"description": "This is the original deodorant description.",
	"rating": 4.0,
	"price": "$8.99",
	"image_url": "/ocean-frame.webp",
	"ingredients": ["IngredientA", "IngredientB"],
	"fragrances": ["Floral", "Citrus"],
	"volume_ml": 150,
	"unit_price": 0.0599,
	"similarity_score": 0.90
};

function ProductPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProductInModal, setNewProductInModal] = useState<Product | null>(null);
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const [originalProduct, setOriginalProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Load search results from localStorage
		const results = localStorage.getItem('searchResults');
		const originalProduct = localStorage.getItem('originalProduct');
		if (results && originalProduct) {
		try {
			console.log('Found search results in localStorage');
			const parsedResults = JSON.parse(results);
			const parsedOriginalProduct = JSON.parse(originalProduct);
			console.log('Loaded search results:', parsedResults);
			setSearchResults(parsedResults);
			setOriginalProduct(parsedOriginalProduct);
			// Clear the localStorage after loading
			localStorage.removeItem('searchResults');
			localStorage.removeItem('originalProduct');
		} catch (error) {
			console.error('Error parsing search results:', error);
		}
		} else {
		console.log('No search results found in localStorage');
		}
		setIsLoading(false);
	}, []);

	const handleCompareClick = (product: Product) => {
		setNewProductInModal(product);
		setIsModalOpen(true);
	};

	return (
		<Dialog.Root>
			<div className="flex flex-col items-center min-h-[90vh]">
				<SearchInput />
				<div className="mt-10 h-[40vh]">
					{originalProduct?.image_url && (
						<Image alt="Product showcase" className="" src={originalProduct?.image_url} width={593} height={280}  />
					)}
				</div>
				<div className="">
					<Image alt="" className="" src="/podium.png" width={791} height={395} />
				</div>
				<p className="text-[#83667e] mt-14 text-2xl tracking-tight sm:tracking-[-0.04em]">Find your matches below</p>
				<Image alt="Down arrow" className="mt-3" src="/down-arrow.svg" width={40} height={24} />
			</div>
			<div className="bg-[#ffe8f0] p-14">
				<p className="text-[#83667e] font-bold font-cormorant text-4xl lg:text-5xl xl:text-[75px] tracking-[-2px] md:tracking-[-3.75px]">Product Matches</p>
				<div className="flex box-border content-stretch flex-col lg:flex-row items-center justify-between mt-7">
					<ProductCard originalProduct={originalProduct} product={sampleProduct} onCompareClick={() => handleCompareClick(sampleProduct)} />
				</div>
			</div>
			<CompareDialog />
		</Dialog.Root>
	)
}
	
export default ProductPage;
