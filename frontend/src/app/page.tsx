import Image from "next/image";
import Link from "next/link";
import SearchInput from "./components/SearchInput";

// Asset URLs from Figma
const imgImage2 = "http://localhost:3845/assets/21f130b4d4fb9c249c7c7ec8837e2c7e8166cacc.png";
const imgImage3 = "http://localhost:3845/assets/826efe8a4f623e873e77a1c546bafd3469c5621e.png";
const imgRectangle1 = "http://localhost:3845/assets/d093bb3d66c5f3059b00f071c8c278bb83b546a5.svg";
const imgFrameInspect = "http://localhost:3845/assets/4a9a303b888351c7a727fb93f5fd24051d1f724a.svg";
const imgFolderMatch = "http://localhost:3845/assets/25f0647a153c831e167b6c42fa0a48174458f9ef.svg";
const imgCompareArrows = "http://localhost:3845/assets/a17256917008d39cebd3b8a3f3a9e6e449142739.svg";
const imgLine1 = "http://localhost:3845/assets/b9c72c45498732779e67673e69d9e921ece55f45.svg";
const imgLine2 = "http://localhost:3845/assets/2b96ad001cbab55d4073a8a4067ee31f55b1e4c1.svg";
const imgLine3 = "http://localhost:3845/assets/df4adf99452314a323cf28da66737126bcd26d16.svg";

export default function Home() {
  return (
    <div className="bg-white relative w-full" style={{ minHeight: '2610px' }} data-scroll-section data-name="Home" data-node-id="1:2">
      {/* Background Image 2 - positioned with proper spacing from header */}
      <div className="absolute blur-[2px] filter h-[400px] sm:h-[500px] md:h-[600px] lg:h-[756px] left-1/2 transform translate-x-[-50%] w-[600px] sm:w-[800px] md:w-[1000px] lg:w-[1155px] top-[100px] sm:top-[110px] md:top-[120px] lg:top-[130px]" data-name="image 2" data-node-id="21:257">
        <Image alt="" className="absolute inset-0 max-w-none object-center object-cover opacity-[0.59] pointer-events-none size-full" src={imgImage2} width={1155} height={756} />
      </div>
      
      {/* Background Image 3 - fitted to screen width and positioned to match Figma */}
      <div className="absolute blur-[2px] filter h-[500px] sm:h-[650px] md:h-[780px] lg:h-[920px] left-0 right-0 w-full min-w-[1276px] translate-y-[-50%]" data-name="image 3" data-node-id="55:7" style={{ top: "calc(50% + 860px)" }}>
        <Image alt="" className="absolute inset-0 w-full h-full max-w-none object-center object-cover opacity-[0.59] pointer-events-none" src={imgImage3} width={1276} height={920} />
      </div>
      
      {/* Pink background section - positioned to match Figma */}
      <div className="absolute bg-[#ffe8f0] h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[724px] left-[-2px] right-[-2px] top-[800px] sm:top-[850px] md:top-[920px] lg:top-[960px] xl:top-[981px] w-[calc(100%+4px)] overflow-hidden" data-node-id="37:592" />
      
      {/* Search input */}
      <SearchInput />
      
      {/* Three feature cards */}
      <div className="absolute box-border content-stretch flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[33px] items-center justify-center px-4 sm:px-8 lg:px-[72px] py-0 top-[1100px] sm:top-[1130px] lg:top-[1162px] left-1/2 transform -translate-x-1/2 w-full max-w-7xl" data-scroll data-scroll-speed="0.5" data-node-id="6:51">
        <div className="bg-white box-border content-stretch flex flex-col gap-[36px] h-[413px] items-center px-[29px] py-[24px] relative rounded-[30px] shrink-0 w-full max-w-[349px] lg:w-[349px] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0px_12px_20px_0px_rgba(0,0,0,0.15)]" data-node-id="37:640">
          <div aria-hidden="true" className="absolute border-2 border-[#b398ae] border-solid inset-0 pointer-events-none rounded-[30px] shadow-[0px_6px_7px_0px_rgba(0,0,0,0.25)] transition-all duration-300" />
          <div className="relative shrink-0 size-[219px]" data-name="frame_inspect" data-node-id="37:635">
            <Image alt="Search inspection icon" className="block max-w-none size-full" src={imgFrameInspect} width={219} height={219} />
          </div>
          <div className="font-[var(--font-instrument-sans)] font-medium leading-[0] relative shrink-0 text-[#b398ae] text-[18px] tracking-[-0.72px] w-[291px]" data-node-id="37:629">
            <p className="leading-[normal]">Start by entering the product you want, from razors to shampoo, and we'll begin the hunt for fairer alternatives.</p>
          </div>
        </div>
        <div className="bg-white box-border content-stretch flex flex-col gap-[36px] h-[413px] items-center px-[29px] py-[24px] relative rounded-[30px] shrink-0 w-full max-w-[349px] lg:w-[349px] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0px_12px_20px_0px_rgba(0,0,0,0.15)]" data-node-id="37:641">
          <div aria-hidden="true" className="absolute border-2 border-[#b398ae] border-solid inset-0 pointer-events-none rounded-[30px] shadow-[0px_6px_7px_0px_rgba(0,0,0,0.25)] transition-all duration-300" />
          <div className="relative shrink-0 size-[219px]" data-name="folder_match" data-node-id="37:658">
            <Image alt="Folder matching icon" className="block max-w-none size-full" src={imgFolderMatch} width={219} height={219} />
          </div>
          <div className="font-[var(--font-instrument-sans)] font-medium leading-[0] relative shrink-0 text-[#b398ae] text-[18px] tracking-[-0.72px] w-[291px]" data-node-id="37:645">
            <p className="leading-[normal]">We'll find nearly identical men's or gender-neutral products that deliver the same quality at a lower cost.</p>
          </div>
        </div>
        <div className="bg-white box-border content-stretch flex flex-col gap-[36px] h-[413px] items-center px-[29px] py-[24px] relative rounded-[30px] shrink-0 w-full max-w-[349px] lg:w-[349px] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0px_12px_20px_0px_rgba(0,0,0,0.15)]" data-node-id="37:647">
          <div aria-hidden="true" className="absolute border-2 border-[#b398ae] border-solid inset-0 pointer-events-none rounded-[30px] shadow-[0px_6px_7px_0px_rgba(0,0,0,0.25)] transition-all duration-300" />
          <div className="relative shrink-0 size-[219px]" data-name="compare_arrows" data-node-id="37:664">
            <Image alt="Compare arrows icon" className="block max-w-none size-full" src={imgCompareArrows} width={219} height={219} />
          </div>
          <div className="font-[var(--font-instrument-sans)] font-medium leading-[0] relative shrink-0 text-[#b398ae] text-[18px] tracking-[-0.72px] w-[291px]" data-node-id="37:651">
            <p className="leading-[normal]">View both options side by side to compare the products and see the real impact of the pink tax.</p>
          </div>
        </div>
      </div>
      
      {/* Main title "With PinkMatch" - aligned with other titles */}
      <div className="[text-shadow:rgba(255,255,255,0.5)_0px_0px_0.745px,rgba(255,255,255,0.5)_0px_0px_1.49px,rgba(255,255,255,0.5)_0px_0px_5.216px,rgba(255,255,255,0.5)_0px_0px_10.433px,rgba(255,255,255,0.5)_0px_0px_17.885px,rgba(255,255,255,0.5)_0px_0px_31.298px] absolute font-cormorant leading-[0] left-[20px] sm:left-[40px] md:left-[80px] lg:left-[120px] xl:left-[150px] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[128px] text-white top-[380px] sm:top-[420px] md:top-[446px] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-3.84px]" data-scroll data-scroll-speed="1" data-node-id="2:2">
        <p className="leading-[normal] whitespace-pre">
          <span>With </span>
          <span className="text-[#fca4c0]">PinkMatch</span>
        </p>
      </div>
      
      {/* "No Pink Tax" title - aligned with other titles */}
      <div className="[text-shadow:#ffffff_0px_0px_46.042px] absolute font-[var(--font-instrument-sans)] font-bold leading-[0] left-[20px] sm:left-[40px] md:left-[80px] lg:left-[120px] xl:left-[150px] text-[#83667e] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] top-[290px] sm:top-[315px] md:top-[335px] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-4px]" data-node-id="2:3">
        <p className="leading-[normal] whitespace-pre">No Pink Tax </p>
      </div>
      
      {/* Horizontal lines */}
      <div className="absolute h-0 left-1/2 top-[85px] translate-x-[-50%] w-[1150px]" data-node-id="3:5">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine1} width={1150} height={1} />
        </div>
      </div>
      <div className="absolute h-0 left-1/2 top-[927px] translate-x-[-50%] w-[1150px]" data-node-id="5:33">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine2} width={1175} height={1} />
        </div>
      </div>
      <div className="absolute h-0 left-1/2 top-[1759px] translate-x-[-50%] w-[1150px]" data-node-id="5:35">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine3} width={1175} height={1} />
        </div>
      </div>
      
      {/* Navigation menu */}
      <div className="absolute content-stretch flex font-[var(--font-instrument-sans)] font-normal gap-4 sm:gap-8 md:gap-16 lg:gap-[400px] h-[37px] items-center justify-center leading-[0] left-4 right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-auto text-[#83667e] text-sm sm:text-base md:text-[18px] text-nowrap top-[24px] tracking-[-0.5px] sm:tracking-[-0.72px]" data-node-id="3:12">
        <div className="relative shrink-0" data-node-id="3:13">
          <Link href="/" className="leading-[normal] text-nowrap whitespace-pre hover:text-[#fca4c0] transition-colors">Home</Link>
        </div>
        <div className="relative shrink-0" data-node-id="3:14">
          <p className="leading-[normal] text-nowrap whitespace-pre">How It Works</p>
        </div>
        <div className="relative shrink-0" data-node-id="3:15">
          <p className="leading-[normal] text-nowrap whitespace-pre">Why</p>
        </div>
      </div>
      

      
      {/* "Search. Match. Compare." title - aligned with other titles */}
      <div className="absolute font-cormorant leading-[0] left-[20px] sm:left-[40px] md:left-[80px] lg:left-[120px] xl:left-[150px] text-[#83667e] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[75px] top-[950px] sm:top-[1000px] md:top-[1046px] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3.75px]" data-node-id="7:54">
        <p className="leading-[normal] whitespace-pre">Search. Match. Compare.</p>
      </div>
      
      {/* "Why We Care." title */}
      <div className="absolute font-cormorant leading-[0] left-1/2 transform -translate-x-1/2 text-[#fca4c0] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[128px] top-[1700px] sm:top-[1800px] md:top-[1896px] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-4px] lg:tracking-[-6.4px]" data-node-id="45:669">
        <p className="leading-[normal] whitespace-pre">Why We Care.</p>
      </div>
      
      {/* Help text - with proper horizontal spacing from background image */}
      <div className="absolute font-[var(--font-instrument-sans)] font-normal leading-[0] right-[20px] sm:right-[60px] md:right-[80px] lg:right-[150px] text-[#83667e] text-sm sm:text-base md:text-[18px] text-right top-[750px] sm:top-[780px] md:top-[815px] tracking-[-0.5px] sm:tracking-[-0.72px] w-[300px] sm:w-[400px] md:w-[561px]" data-node-id="7:56">
        <p className="leading-[normal] whitespace-pre-wrap">Let us  help you find an alternative.</p>
      </div>no
      
      {/* Main description text */}
      <div className="absolute font-[var(--font-instrument-sans)] font-normal leading-[0] text-[#83667e] text-lg sm:text-xl md:text-[24px] top-[1900px] sm:top-[2000px] md:top-[2087px] tracking-[-0.5px] sm:tracking-[-0.8px] md:tracking-[-0.96px] left-4 right-4 sm:left-8 sm:right-8 md:left-1/2 md:transform md:-translate-x-1/2 md:w-[815px]" data-node-id="45:671">
        <p className="leading-[normal] mb-0">
          <span>Everyday products marketed to women often cost more than nearly identical men's or gender-neutral versions. This unfair price gap, known as the </span>
          <span className="font-[var(--font-instrument-sans)] font-bold">pink tax</span>
          <span>, means women are charged more for basics like razors, deodorant, and shampoo simply because of branding. </span>
        </p>
        <p className="leading-[normal] mb-0">&nbsp;</p>
        <p className="leading-[normal] mb-0 whitespace-pre-wrap">We created this web app to help remove that imbalance.  Our aim is to help people save money and also expose a hidden markup that too often goes unquestioned. </p>
        <p className="leading-[normal] mb-0">&nbsp;</p>
        <p className="leading-[normal]">
          <span>For us, </span>
          <span className="font-[var(--font-instrument-sans)] font-bold">PinkMatch</span>
          <span> means fairness, choice and making the cost of living more equitable.</span>
        </p>
      </div>
      
      {/* Extra spacing to match Figma design height */}
      <div className="absolute h-[300px] top-[2400px] w-full" />
    </div>
  );
}
