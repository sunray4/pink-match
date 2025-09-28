interface MacBookAir3Props {
  onBackClick: () => void;
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 text-[#83667e] text-[40px] text-nowrap text-right tracking-[-1.6px] w-full">
      <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">$10.99</p>
      </div>
      <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[text-underline-position:from-font] decoration-solid leading-[normal] text-nowrap underline whitespace-pre">Purchase Here</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full">
      <div className="font-['Cormorant_Garamond:Bold_Italic',_sans-serif] italic leading-[0] min-w-full relative shrink-0 text-[#83667e] text-[75px] tracking-[-4.5px]" style={{ width: "min-content" }}>
        <p className="leading-[normal]">Product 1</p>
      </div>
      <div className="h-0 relative shrink-0 w-[511px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 511 1">
            <line id="Line 5" stroke="var(--stroke-0, #83667E)" x2="511" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full">
      <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Product Description</p>
      </div>
      <div className="font-['Instrument_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full">
      <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Key Ingredients</p>
      </div>
      <div className="font-['Instrument_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[50px] items-start ml-0 mt-[489px] relative w-[511px]">
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-white h-[420px] ml-px mt-0 relative rounded-[40px] w-[512px]">
        <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[40px]" />
      </div>
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 text-[#83667e] text-[40px] text-nowrap text-right tracking-[-1.6px] w-full">
      <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">$10.99</p>
      </div>
      <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="[text-underline-position:from-font] decoration-solid leading-[normal] text-nowrap underline whitespace-pre">Purchase Here</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[18px] items-center justify-center px-0 py-[12px] relative shrink-0 w-full">
      <div className="font-['Cormorant_Garamond:Bold_Italic',_sans-serif] italic leading-[0] min-w-full relative shrink-0 text-[#83667e] text-[75px] tracking-[-4.5px]" style={{ width: "min-content" }}>
        <p className="leading-[normal]">Product 2</p>
      </div>
      <div className="h-0 relative shrink-0 w-[511px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 511 1">
            <line id="Line 5" stroke="var(--stroke-0, #83667E)" x2="511" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame10 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full">
      <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Product Description</p>
      </div>
      <div className="font-['Instrument_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-[#83667e] w-full">
      <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold relative shrink-0 text-[40px] tracking-[-1.6px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Key Ingredients</p>
      </div>
      <div className="font-['Instrument_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-[50px] items-start ml-0 mt-[489px] relative w-[511px]">
      <Frame11 />
      <Frame14 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-white h-[420px] ml-px mt-0 relative rounded-[40px] w-[512px]">
        <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[40px]" />
      </div>
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex gap-[80px] items-center leading-[0] left-1/2 top-[85px] translate-x-[-50%]">
      <Group4 />
      <Group5 />
    </div>
  );
}

export default function MacBookAir3({ onBackClick }: MacBookAir3Props) {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] from-[89.423%] relative size-full to-[#fff3f6]" data-name="MacBook Air - 3">
      <button 
        onClick={onBackClick}
        className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-lg border-2 border-[#83667e] text-[#83667e] hover:bg-[#83667e] hover:text-white transition-colors duration-200"
      >
        ← Back to Search
      </button>
      <Frame16 />
    </div>
  );
}