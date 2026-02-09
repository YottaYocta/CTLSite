import { useEffect, useRef, useState, type FC } from "react";

interface ExpandableButtonProps {
  text: string[];
}

export const ExpandableButton: FC<ExpandableButtonProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const minimizeButton = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", minimizeButton);

    return () => {
      document.removeEventListener("mousedown", minimizeButton);
    };
  }, []);

  return (
    <div
      className={
        (isOpen
          ? "w-32 h-24 pointer-events-none -translate-x-4 translate-y-4"
          : "w-8 h-8" + " flex flex-col gap-2") +
        " " +
        "bg-white border-neutral-100 border rounded-sm flex flex-col items-center justify-center transition-[width,height,translate] overflow-clip duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm"
      }
    >
      {isOpen ? (
        text.map((str) => <p>{str}</p>)
      ) : (
        <button
          className="w-full h-full bg-white hover:bg-neutral-50 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      )}
    </div>
  );
};
