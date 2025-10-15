import React from 'react'
import Image from 'next/image'

interface FeatureCardProps {
  description: string;
  imgSrc: string;
}

function FeatureCard({ description, imgSrc }: FeatureCardProps) {

  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[52vh] border-2 border-[#b398ae] border-solid  items-center relative rounded-4xl shrink-0 w-full max-w-[22rem] lg:w-[23rem] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0px_12px_20px_0px_rgba(0,0,0,0.15)]">
        <div className="relative shrink-0 m-12 size-[13.7rem]">
            <Image alt="Search inspection icon" className="block max-w-none size-full" src={imgSrc} width={219} height={219} />
        </div>
        <div className="px-4 font-medium shrink-0 text-[#b398ae] text-lg tracking-tight w-72">
            <p>{description}</p>
        </div>
    </div>
  )
}

export default FeatureCard
