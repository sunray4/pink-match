import React from "react";
import svgPaths from "../imports/svg-cxzoh2cc71";
import imgRectangle5 from "figma:asset/8af058e7303988c186014ffe116c9b31580ecabf.png";
import imgEllipse1 from "figma:asset/51f47ca382db1ab45075b887c5d55967be4696b7.png";
import imgEllipse2 from "figma:asset/4b9e791b29a2e7e546b4e5c3b025c6da3525a8a3.png";
import imgImage3 from "figma:asset/137b1782b8c792b8605dbd53d071013766d1767a.png";

interface MacBookAir2Props {
  onCompareClick: () => void;
}

function ArrowForward1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_forward">
          <mask height="24" id="mask0_1_297" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_297)">
            <path d={svgPaths.p54e7200} fill="var(--fill-0, #83667E)" id="arrow_forward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <ArrowForward1 />
    </div>
  );
}

interface Frame11Props {
  onCompareClick: () => void;
}

function Frame11({ onCompareClick }: Frame11Props) {
  return (
    <div className="box-border content-stretch flex gap-[5px] items-center justify-end px-[10px] py-0 relative shrink-0 w-[140px]">
      <button 
        onClick={onCompareClick}
        className="font-['Instrument_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#83667e] text-[18px] text-nowrap cursor-pointer bg-transparent border-none p-0" 
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="leading-[normal] whitespace-pre">COMPARE</p>
      </button>
      <Frame10 />
    </div>
  );
}

interface Frame12Props {
  onCompareClick: () => void;
}

function Frame12({ onCompareClick }: Frame12Props) {
  return (
    <div className="absolute bg-white h-[40px] left-[163px] rounded-[30px] top-[382px] w-[154px]">
      <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="flex flex-col items-end justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[40px] items-end justify-center px-0 py-[26px] relative w-[154px]">
          <Frame11 onCompareClick={onCompareClick} />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-[#fca4c0] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[272px] px-[11px] py-[38px] rounded-[44.708px] size-[89.417px] top-[-10px]">
      <div aria-hidden="true" className="absolute border border-[#83667e] border-solid inset-0 pointer-events-none rounded-[44.708px]" />
      <div className="flex h-[49.87px] items-center justify-center relative shrink-0 w-[56.432px]">
        <div className="flex-none rotate-[325.139deg]">
          <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold leading-[0] relative text-[22px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre">-20%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Frame7Props {
  onCompareClick: () => void;
}

function Frame7({ onCompareClick }: Frame7Props) {
  return (
    <div className="bg-white h-[447px] relative rounded-[40px] shrink-0 w-[342px] transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
      <div aria-hidden="true" className="absolute border border-[#83667e] border-solid inset-0 pointer-events-none rounded-[40px] shadow-[0px_5px_9px_0px_rgba(0,0,0,0.25)]" />
      <Frame12 onCompareClick={onCompareClick} />
      <div className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] left-[18px] text-[#83667e] text-[24px] top-[265px] w-[324px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Bumble and bumble</p>
        <p>Blondish Tinted Dry Shampoo</p>
      </div>
      <div className="absolute h-0 left-0 top-[241px] w-[325px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 325 1">
            <line id="Line 4" stroke="var(--stroke-0, #83667E)" x2="325" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[241px] left-0 pointer-events-none rounded-tl-[40px] rounded-tr-[40px] top-0 w-[342px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-tl-[40px] rounded-tr-[40px] size-full" src={imgRectangle5} />
        <div aria-hidden="true" className="absolute border border-[#83667e] border-solid inset-0 rounded-tl-[40px] rounded-tr-[40px]" />
      </div>
      <Frame13 />
    </div>
  );
}

interface Frame22Props {
  onCompareClick: () => void;
}

function Frame22({ onCompareClick }: Frame22Props) {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[86px] top-[1091px] w-[1094px]">
      {[...Array(3).keys()].map((_, i) => (
        <Frame7 key={i} onCompareClick={onCompareClick} />
      ))}
    </div>
  );
}

interface Group2Props {
  onCompareClick: () => void;
}

function Group2({ onCompareClick }: Group2Props) {
  return (
    <div className="absolute contents left-[86px] top-[1009px]">
      <Frame22 onCompareClick={onCompareClick} />
      <div className="absolute font-['Cormorant_Garamond:Bold_Italic',_sans-serif] italic leading-[0] left-[86px] text-[#83667e] text-[75px] text-nowrap top-[1009px] tracking-[-2.25px]">
        <p className="leading-[normal] whitespace-pre">Product Matches</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[114px] top-[228px]">
      <div className="absolute h-[530px] left-[114px] opacity-[0.78] top-[271px] w-[1050px]">
        <div className="absolute inset-[-18.87%_-9.52%]">
          <img alt="" className="block max-w-none size-full" height="730" src={imgEllipse1} width="1250" />
        </div>
      </div>
      <div className="absolute h-[530px] left-[114px] opacity-[0.78] top-[228px] w-[1050px]">
        <div className="absolute inset-[-0.75%_-0.38%]">
          <img alt="" className="block max-w-none size-full" height="538" src={imgEllipse2} width="1058" />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.5)] box-border content-stretch flex gap-[10px] h-[69.515px] items-center px-[29px] py-px rounded-[50px] top-[78px] translate-x-[-50%] w-[669px]" style={{ left: "calc(50% - 7.5px)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[#83667e] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <div className="font-['Instrument_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#83667e] text-[24px] text-nowrap tracking-[-0.96px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{`Continue searching <3`}</p>
      </div>
    </div>
  );
}

export default function MacBookAir2({ onCompareClick }: MacBookAir2Props) {
  return (
    <div className="bg-white relative size-full" data-name="MacBook Air - 2">
      <Group2 onCompareClick={onCompareClick} />
      <Group3 />
      <div className="absolute h-[395px] left-[244px] top-[493px] w-[791px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <Frame23 />
      <div className="absolute h-0 left-[45px] top-[927px] w-[1175px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1175 2">
            <path d="M0 1H1175" id="Line 2" stroke="var(--stroke-0, #B398AE)" />
          </svg>
        </div>
      </div>
      <div className="absolute font-['Instrument_Sans:Regular',_sans-serif] font-normal leading-[0] left-[482px] text-[#83667e] text-[30px] text-nowrap top-[827px] tracking-[-1.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Find your matches below</p>
      </div>
    </div>
  );
}