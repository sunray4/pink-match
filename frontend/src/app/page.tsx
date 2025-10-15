import FeatureCard from "@/components/FeatureCard";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* top hero */}
      <section className="mx-14">
          <div className="relative w-full h-[80vh] overflow-hidden">
            <Image
              src="/pink-hero.webp"
              alt="pink hero"
              fill
              className="object-cover opacity-59 filter blur-[2px]"
              priority
            />
            <div className="relative z-20 ml-14 mt-40">
              <p className="font-bold [text-shadow:#ffffff_0px_0px_46.042px] text-[#83667e] text-6xl lg:text-7xl xl:text-[6.25rem] tracking-[-0.038em]">No Pink Tax</p>
              <div className="font-cormorant text-7xl md:text-[8rem] tracking-[-0.055em]">
                <span className="text-white text-shadow-[0_0_20px_rgb(255_255_255_/_0.9)]">With </span>
                <span className="text-[#fca4c0] text-shadow-[0_0_20px_rgb(252_164_192_/_0.9)]">PinkMatch</span>
              </div>
              <SearchInput />
            </div>
            <div className="absolute right-14 bottom-14 z-20">
              <p className="text-[#83667e] text-xl tracking-tight sm:tracking-[-0.017em]">Let us help you find an alternative.</p>
            </div>
          </div>
      </section>

      {/* how-it-works section */}
      <div className="relative my-7 mb-8 mx-14 h-2" id="how-it-works">
        <Image alt="line" src="/line.svg" fill />
      </div>
      
      <section className="mx-14 bg-[#ffe8f0] p-14">
        <p className="text-[#83667e] font-bold font-cormorant text-4xl lg:text-5xl xl:text-[75px] tracking-[-2px] md:tracking-[-3.75px]">Search. Match. Compare.</p>
        {/* Three feature cards */}
        <div className="flex box-border content-stretch flex-col lg:flex-row items-center justify-between mt-10">
          <FeatureCard description="Start by entering the product you want, from razors to shampoo, and we'll begin the hunt for fairer alternatives." imgSrc="/frame-inspect.png" />
          <FeatureCard description="We'll find nearly identical men's or gender-neutral products that deliver the same quality at a lower cost." imgSrc="/folder-match.png" />
          <FeatureCard description="View both options side by side to compare the products and see the real impact of the pink tax." imgSrc="/compare-arrows.png" />
        </div>
      </section>

      {/* why section */}
      <div className="relative my-7 mb-8 mx-14 h-2" id="why">
        <Image alt="line" src="/line.svg" fill />
      </div>

      <section className="mx-14">
        <div className="relative w-full h-[80vh] overflow-hidden">
          <Image
            src="/white-hero.webp"
            alt="white hero"
            fill
            className="object-cover opacity-59 filter blur-[2px]"
            priority
          />
          <div className="relative z-20 flex justify-center pt-30">
            <div className="text-center">
              <p className="font-cormorant mb-10 text-[#fca4c0] text-6xl lg:text-7xl xl:text-[8rem] tracking-[-0.023em] md:tracking-[-0.031em] lg:tracking-[-0.05em]">Why We Care</p>
              <div className="max-w-5xl text-[#83667e] text-[1.125rem] md:text-[1.5rem] tracking-[-0.034em] mt-6">
                <p>
                  Everyday products marketed to women often cost more than nearly identical men&apos;s or gender-neutral versions. This unfair price gap, known as the
                  <span className="font-bold"> pink tax</span>
                  , means women are charged more for basics like razors, deodorant, and shampoo simply because of branding.
                </p>
                <p className="mt-4">We created this web app to help remove that imbalance. Our aim is to help people save money and also expose a hidden markup that too often goes unquestioned.</p>
                <p className="mt-4">
                  For us, <span className="font-bold">PinkMatch</span> means fairness, choice and making the cost of living more equitable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
