import SearchInput from "@/components/SearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* top hero */}
      <section className="">
        <div className="mx-14">
          <div className="relative w-full h-[80vh] overflow-hidden">
            <Image
              src="/pink-hero.webp"
              alt="pink hero"
              fill
              className="object-cover opacity-59 filter blur-[2px]"
              priority
            />
            <div className="relative z-20 ml-14 mt-40">
              <p className="font-bold [text-shadow:#ffffff_0px_0px_46.042px] text-[#83667e] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-3.84px]">No Pink Tax</p>
              <div className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[128px] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-3.84px]">
                <span className="text-white">With </span>
                <span className="text-[#fca4c0]">PinkMatch</span>
              </div>
              <SearchInput />
            </div>
            <div className="absolute right-14 bottom-14 z-20">
              <p className="text-[#83667e] tracking-[-0.5px] sm:tracking-[-0.72px]">Let us help you find an alternative.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
