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
    <div className="bg-white relative size-full" data-name="Home" data-node-id="1:2">
      {/* Background Image 2 */}
      <div className="absolute blur-[2px] filter h-[756px] translate-x-[-50%] translate-y-[-50%] w-[1155px]" data-name="image 2" data-node-id="21:257" style={{ top: "calc(50% - 797px)", left: "calc(50% + 2.5px)" }}>
        <Image alt="" className="absolute inset-0 max-w-none object-center object-cover opacity-[0.59] pointer-events-none size-full" src={imgImage2} width={1155} height={756} />
      </div>
      
      {/* Background Image 3 */}
      <div className="absolute blur-[2px] filter h-[920px] translate-x-[-50%] translate-y-[-50%] w-[1276px]" data-name="image 3" data-node-id="55:7" style={{ top: "calc(50% + 860px)", left: "calc(50% + 2px)" }}>
        <Image alt="" className="absolute inset-0 max-w-none object-center object-cover opacity-[0.59] pointer-events-none size-full" src={imgImage3} width={1276} height={920} />
      </div>
      
      {/* Pink background section */}
      <div className="absolute bg-[#ffe8f0] h-[724px] left-[-2px] top-[981px] w-[1282px]" data-node-id="37:592" />
      
      {/* Search input */}
      <SearchInput />
      
      {/* Three feature cards */}
      <div className="absolute box-border content-stretch flex gap-[33px] items-center px-[72px] py-0 top-[1162px] translate-x-[-50%]" data-node-id="6:51" style={{ left: "calc(50% - 7.5px)" }}>
        <div className="bg-white box-border content-stretch flex flex-col gap-[36px] h-[413px] items-center px-[29px] py-[24px] relative rounded-[30px] shrink-0 w-[349px]" data-node-id="37:640">
          <div aria-hidden="true" className="absolute border-2 border-[#b398ae] border-solid inset-0 pointer-events-none rounded-[30px] shadow-[0px_6px_7px_0px_rgba(0,0,0,0.25)]" />
          <div className="relative shrink-0 size-[219px]" data-name="frame_inspect" data-node-id="37:635">
            <Image alt="Search inspection icon" className="block max-w-none size-full" src={imgFrameInspect} width={219} height={219} />
          </div>
          <div className="font-[var(--font-instrument-sans)] font-medium leading-[0] relative shrink-0 text-[#b398ae] text-[18px] tracking-[-0.72px] w-[291px]" data-node-id="37:629">
            <p className="leading-[normal]">Start by entering the product you want, from razors to shampoo, and we'll begin the hunt for fairer alternatives.</p>
          </div>
        </div>
        <div className="bg-white box-border content-stretch flex flex-col gap-[36px] h-[413px] items-center px-[29px] py-[24px] relative rounded-[30px] shrink-0 w-[349px]" data-node-id="37:641">
          <div aria-hidden="true" className="absolute border-2 border-[#b398ae] border-solid inset-0 pointer-events-none rounded-[30px] shadow-[0px_6px_7px_0px_rgba(0,0,0,0.25)]" />
          <div className="relative shrink-0 size-[219px]" data-name="folder_match" data-node-id="37:658">
            <Image alt="Folder matching icon" className="block max-w-none size-full" src={imgFolderMatch} width={219} height={219} />
          </div>
          <div className="font-[var(--font-instrument-sans)] font-medium leading-[0] relative shrink-0 text-[#b398ae] text-[18px] tracking-[-0.72px] w-[291px]" data-node-id="37:645">
            <p className="leading-[normal]">We'll find nearly identical men's or gender-neutral products that deliver the same quality at a lower cost.</p>
          </div>
        </div>
        <div className="bg-white box-border content-stretch flex flex-col gap-[36px] h-[413px] items-center px-[29px] py-[24px] relative rounded-[30px] shrink-0 w-[349px]" data-node-id="37:647">
          <div aria-hidden="true" className="absolute border-2 border-[#b398ae] border-solid inset-0 pointer-events-none rounded-[30px] shadow-[0px_6px_7px_0px_rgba(0,0,0,0.25)]" />
          <div className="relative shrink-0 size-[219px]" data-name="compare_arrows" data-node-id="37:664">
            <Image alt="Compare arrows icon" className="block max-w-none size-full" src={imgCompareArrows} width={219} height={219} />
          </div>
          <div className="font-[var(--font-instrument-sans)] font-medium leading-[0] relative shrink-0 text-[#b398ae] text-[18px] tracking-[-0.72px] w-[291px]" data-node-id="37:651">
            <p className="leading-[normal]">View both options side by side to compare the products and see the real impact of the pink tax.</p>
          </div>
        </div>
      </div>
      
      {/* Main title "With PinkMatch" */}
      <div className="[text-shadow:rgba(255,255,255,0.5)_0px_0px_0.745px,rgba(255,255,255,0.5)_0px_0px_1.49px,rgba(255,255,255,0.5)_0px_0px_5.216px,rgba(255,255,255,0.5)_0px_0px_10.433px,rgba(255,255,255,0.5)_0px_0px_17.885px,rgba(255,255,255,0.5)_0px_0px_31.298px] absolute font-[var(--font-cormorant-garamond)] italic leading-[0] left-[119px] text-[128px] text-nowrap text-white top-[446px] tracking-[-3.84px]" data-node-id="2:2">
        <p className="leading-[normal] whitespace-pre">
          <span>With </span>
          <span className="text-[#fca4c0]">PinkMatch</span>
        </p>
      </div>
      
      {/* "No Pink Tax" title */}
      <div className="[text-shadow:#ffffff_0px_0px_46.042px] absolute font-[var(--font-instrument-sans)] font-bold leading-[0] left-[131px] text-[#83667e] text-[100px] text-nowrap top-[335px] tracking-[-4px]" data-node-id="2:3">
        <p className="leading-[normal] whitespace-pre">No Pink Tax </p>
      </div>
      
      {/* Horizontal lines */}
      <div className="absolute h-0 left-1/2 top-[85px] translate-x-[-50%] w-[1150px]" data-node-id="3:5">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine1} width={1150} height={1} />
        </div>
      </div>
      <div className="absolute h-0 left-[45px] top-[927px] w-[1175px]" data-node-id="5:33">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine2} width={1175} height={1} />
        </div>
      </div>
      <div className="absolute h-0 left-[45px] top-[1759px] w-[1175px]" data-node-id="5:35">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <Image alt="" className="block max-w-none size-full" src={imgLine3} width={1175} height={1} />
        </div>
      </div>
      
      {/* Navigation menu */}
      <div className="absolute content-stretch flex font-[var(--font-instrument-sans)] font-normal gap-[400px] h-[37px] items-center justify-center leading-[0] left-[453px] text-[#83667e] text-[18px] text-nowrap top-[24px] tracking-[-0.72px] w-[374px]" data-node-id="3:12">
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
      

      
      {/* "Search. Match. Compare." title */}
      <div className="absolute font-[var(--font-cormorant-garamond)] italic leading-[0] left-[80px] text-[#83667e] text-[75px] text-nowrap top-[1046px] tracking-[-3.75px]" data-node-id="7:54">
        <p className="leading-[normal] whitespace-pre">Search. Match. Compare.</p>
      </div>
      
      {/* "Why We Care." title */}
      <div className="absolute font-[var(--font-cormorant-garamond)] italic leading-[0] left-[330px] text-[#fca4c0] text-[128px] text-nowrap top-[1896px] tracking-[-6.4px]" data-node-id="45:669">
        <p className="leading-[normal] whitespace-pre">Why We Care.</p>
      </div>
      
      {/* Help text */}
      <div className="absolute font-[var(--font-instrument-sans)] font-normal leading-[0] left-[1180px] text-[#83667e] text-[18px] text-right top-[815px] tracking-[-0.72px] translate-x-[-100%] w-[561px]" data-node-id="7:56">
        <p className="leading-[normal] whitespace-pre-wrap">Let us  help you find an alternative.</p>
      </div>
      
      {/* Main description text */}
      <div className="absolute font-[var(--font-instrument-sans)] font-normal leading-[0] text-[#83667e] text-[24px] top-[2087px] tracking-[-0.96px] w-[815px]" data-node-id="45:671" style={{ left: "calc(50% - 407px)" }}>
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
    </div>
  );
}
