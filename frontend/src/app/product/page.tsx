"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CompareModal from "../components/CompareModal";

// Asset URLs from Figma
const imgRectangle5 = "http://localhost:3845/assets/8af058e7303988c186014ffe116c9b31580ecabf.png";
const imgEllipse1 = "http://localhost:3845/assets/51f47ca382db1ab45075b887c5d55967be4696b7.png";
const imgEllipse2 = "http://localhost:3845/assets/4b9e791b29a2e7e546b4e5c3b025c6da3525a8a3.png";
const imgImage3 = "http://localhost:3845/assets/137b1782b8c792b8605dbd53d071013766d1767a.png";
const imgArrowForward = "http://localhost:3845/assets/7c9b6ba4594b228397642da9e9bf09f1ad2ee298.svg";
const imgLine4 = "http://localhost:3845/assets/2bcbf764dcf3e4375efeebc5a1855aa2874ec16c.svg";
const imgLine2 = "http://localhost:3845/assets/f781201e426c3fb8a3a1e482ab2d259257cbb58d.svg";

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="bg-white relative w-full min-h-screen" style={{ minHeight: '1800px' }} data-scroll-section data-name="Product" data-node-id="7:115">
      {/* Navigation menu */}
      <div className="absolute content-stretch flex font-[var(--font-instrument-sans)] font-normal gap-4 sm:gap-8 md:gap-16 lg:gap-[400px] h-[37px] items-center justify-center leading-[0] left-4 right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-auto text-[#83667e] text-sm sm:text-base md:text-[18px] text-nowrap top-[24px] tracking-[-0.5px] sm:tracking-[-0.72px] z-10" data-scroll data-scroll-sticky>
        <div className="relative shrink-0">
          <Link href="/" className="leading-[normal] text-nowrap whitespace-pre hover:text-[#fca4c0] transition-colors">Home</Link>
        </div>
        <div className="relative shrink-0">
          <p className="leading-[normal] text-nowrap whitespace-pre">How It Works</p>
        </div>
        <div className="relative shrink-0">
          <p className="leading-[normal] text-nowrap whitespace-pre">Why</p>
        </div>
      </div>

      {/* Product Matches Section */}
      <div className="absolute font-cormorant italic leading-[0] left-1/2 transform -translate-x-1/2 text-[#83667e] text-[75px] text-nowrap top-[1009px] tracking-[-2.25px]" data-scroll data-scroll-speed="0.15" data-node-id="21:261">
        <p className="leading-[normal] whitespace-pre">Product Matches</p>
      </div>

      {/* Three Product Cards */}
      <div className="absolute flex items-center justify-between left-1/2 transform -translate-x-1/2 top-[1150px] w-[1094px]" data-scroll data-scroll-speed="0.2" data-node-id="21:281">
        <ProductCard onCompareClick={handleCompareClick} />
        <ProductCard onCompareClick={handleCompareClick} />
        <ProductCard onCompareClick={handleCompareClick} />
      </div>

      {/* Background Ellipses */}
      <div className="absolute contents left-[114px] top-[228px]" data-scroll data-scroll-speed="0.2" data-node-id="27:351">
        <div className="absolute h-[530px] left-[114px] opacity-[0.78] top-[271px] w-[1050px]" data-node-id="27:352">
          <div className="absolute inset-[-18.87%_-9.52%]">
            <Image alt="" className="block max-w-none size-full" height={730} src={imgEllipse1} width={1250} />
          </div>
        </div>
        <div className="absolute h-[530px] left-[114px] opacity-[0.78] top-[228px] w-[1050px]" data-node-id="27:353">
          <div className="absolute inset-[-0.75%_-0.38%]">
            <Image alt="" className="block max-w-none size-full" height={538} src={imgEllipse2} width={1058} />
          </div>
        </div>
      </div>

      {/* Main Product Image */}
      <div className="absolute h-[395px] left-[244px] top-[493px] w-[791px]" data-scroll data-scroll-speed="0.3" data-name="image 3" data-node-id="21:274">
        <Image alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage3} width={791} height={395} />
      </div>

      {/* Search Bar */}
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>

      {/* Horizontal line */}
      <div className="absolute h-0 left-1/2 transform -translate-x-1/2 top-[927px] w-[1175px]" data-node-id="27:368">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine2} width={1175} height={1} />
        </div>
      </div>

      {/* Find your matches text */}
      <div className="absolute font-[var(--font-instrument-sans)] font-normal leading-[0] left-1/2 transform -translate-x-1/2 text-[#83667e] text-[30px] text-nowrap top-[827px] tracking-[-1.2px]" data-scroll data-scroll-speed="0.1" data-node-id="27:371">
        <p className="leading-[normal] whitespace-pre">Find your matches below</p>
      </div>

      {/* Bottom spacing to ensure scrolling works */}
      <div className="absolute h-[300px] top-[1600px] w-full" />
    </div>
    
    {/* Compare Modal - Outside scroll container */}
    <CompareModal isOpen={isModalOpen} onClose={handleCloseModal} />
  </>
  );
}

// Search Bar Component
function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="absolute backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.5)] box-border content-stretch flex gap-[10px] h-[69.515px] items-center px-[29px] py-px rounded-[50px] top-[78px] translate-x-[-50%] w-[669px]" data-scroll data-scroll-sticky data-node-id="27:361" style={{ left: "calc(50% - 7.5px)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <div className="flex items-center justify-between w-full">
        <span className="font-[var(--font-instrument-sans)] font-normal leading-[0] text-[#83667e] text-[24px] text-nowrap tracking-[-0.96px]">
          {query ? `Searching for: "${query}"` : "Continue your search..."}
        </span>
        <Link 
          href="/"
          className="bg-[#fca4c0] hover:bg-[#f794b4] text-white px-4 py-2 rounded-[20px] font-[var(--font-instrument-sans)] font-medium transition-colors text-sm"
        >
          New Search
        </Link>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  onCompareClick: () => void;
}

function ProductCard({ onCompareClick }: ProductCardProps) {
  return (
    <div className="bg-white h-[447px] relative rounded-[40px] shrink-0 w-[342px]" data-node-id="55:23">
      <div aria-hidden="true" className="absolute border border-[#83667e] border-solid inset-0 pointer-events-none rounded-[40px] shadow-[0px_5px_9px_0px_rgba(0,0,0,0.25)]" />
      
      {/* Compare Button */}
      <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] h-[40px] items-end justify-center left-[163px] px-0 py-[26px] rounded-[30px] top-[382px] w-[154px]" data-node-id="55:24">
        <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[30px]" />
        <button 
          onClick={onCompareClick}
          className="box-border content-stretch flex gap-[5px] items-center justify-end px-[10px] py-0 relative shrink-0 w-[140px] bg-transparent border-none cursor-pointer hover:bg-[#f0f0f0] transition-colors rounded" 
          data-node-id="55:25"
        >
          <div className="font-[var(--font-instrument-sans)] font-normal leading-[0] relative shrink-0 text-[#83667e] text-[18px] text-nowrap" data-node-id="55:26">
            <p className="leading-[normal] whitespace-pre">COMPARE</p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-node-id="55:27">
            <div className="relative shrink-0 size-[24px]" data-name="arrow_forward" data-node-id="55:28">
              <Image alt="" className="block max-w-none size-full" src={imgArrowForward} width={24} height={24} />
            </div>
          </div>
        </button>
      </div>
      
      {/* Product Title */}
      <div className="absolute font-[var(--font-instrument-sans)] font-semibold leading-[normal] left-[18px] text-[#83667e] text-[24px] top-[265px] w-[324px]" data-node-id="55:31">
        <p className="mb-0">Bumble and bumble</p>
        <p>Blondish Tinted Dry Shampoo</p>
      </div>
      
      {/* Separator Line */}
      <div className="absolute h-0 left-0 top-[241px] w-[325px]" data-node-id="55:32">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine4} width={325} height={1} />
        </div>
      </div>
      
      {/* Product Image */}
      <div className="absolute h-[241px] left-0 pointer-events-none rounded-tl-[40px] rounded-tr-[40px] top-0 w-[342px]" data-node-id="55:33">
        <Image alt="" className="absolute inset-0 max-w-none object-center object-cover rounded-tl-[40px] rounded-tr-[40px] size-full" src={imgRectangle5} width={342} height={241} />
        <div aria-hidden="true" className="absolute border border-[#83667e] border-solid inset-0 rounded-tl-[40px] rounded-tr-[40px]" />
      </div>
      
      {/* Discount Badge */}
      <div className="absolute bg-[#fca4c0] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[272px] px-[11px] py-[38px] rounded-[44.708px] size-[89.417px] top-[-10px]" data-node-id="55:34">
        <div aria-hidden="true" className="absolute border border-[#83667e] border-solid inset-0 pointer-events-none rounded-[44.708px]" />
        <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
          <div className="flex-none rotate-[325.139deg]">
            <div className="font-[var(--font-instrument-sans)] font-bold leading-[0] relative text-[22px] text-nowrap text-white" data-node-id="55:35">
              <p className="leading-[normal] whitespace-pre">-20%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}