import { useEffect, useRef, useState, type FC } from "react";

interface ExpandableButtonProps {
  text: string[];
}

export const ExpandableButton: FC<ExpandableButtonProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
          ? "w-32 h-24 pointer-events-none"
          : "w-8 h-8" + " flex flex-col gap-2") +
        " " +
        "bg-white border-neutral-200 border rounded-sm flex flex-col items-center justify-center transition-[width,height]"
      }
    >
      {isOpen ? (
        text.map((str) => <p>{str}</p>)
      ) : (
        <button className="" onClick={() => setIsOpen(true)}>
          +
        </button>
      )}
    </div>
  );
};
