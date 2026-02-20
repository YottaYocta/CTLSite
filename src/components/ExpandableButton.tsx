import { useEffect, useRef, useState, type FC } from "react";

interface ExpandableButtonProps {
  text: string[];
}

export const ExpandableButton: FC<ExpandableButtonProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex">
      <button
        className={"button w-8 h-8 p-0 z-10"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${isOpen ? "rotate-0" : "rotate-45"} transition-transform flex justify-center items-center`}
        >
          <svg
            className="w-4 h-4 text-neutral-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      </button>
      <div
        className={
          (isOpen
            ? "w-52 h-32 right-12 top-0 shadow-xs bg-white"
            : "w-8 h-8  right-0 top-0 border-0 bg-neutral-50") +
          " " +
          "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] kode-mono absolute overflow-clip z-0 p-4 flex items-center border pointer-events-none border-neutral-100 rounded-2xl"
        }
      >
        <span
          className={`text-sm flex flex-col gap-4 justify-center z-0 text-nowrap w-52 transition-all 
           ${isOpen ? "opacity-100 h-32" : "opacity-0 h-0"} 
            `}
        >
          <p className="text-neutral-400">Credits:</p>
          <div className="flex flex-col gap-1">
            {text.map((str) => (
              <p>{str}</p>
            ))}
          </div>
        </span>
      </div>
    </div>
  );
};
