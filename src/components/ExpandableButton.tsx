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
          ? "w-48 h-28 pointer-events-none -translate-x-4 translate-y-4"
          : "w-8 h-8" + " flex flex-col gap-2") +
        " " +
        "bg-white border-neutral-100 border rounded-md flex flex-col items-center justify-center transition-all overflow-clip duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm kode-mono"
      }
    >
      <span
        className={
          "text-sm flex flex-col gap-4 p-4 justify-center w-48 h-32" +
          " " +
          `${isOpen ? "opacity-100" : "opacity-0 hidden"}`
        }
      >
        <p className="text-neutral-400">Credits:</p>
        <div className="flex flex-col gap-2">
          {text.map((str) => (
            <p>{str}</p>
          ))}
        </div>
      </span>

      <button
        className={
          "w-full h-full bg-white hover:bg-neutral-50 cursor-pointer" +
          " " +
          `${isOpen ? "opacity-0 hidden" : "opacity-100"}`
        }
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
    </div>
  );
};
