import { useState, useEffect } from "react";

const links = [
  { label: "$HOME", href: "/" },
  { label: "./Work", href: "/work" },
  { label: "./Team", href: "/team" },
  { label: "./Contact", href: "/contact" },
];

export const Nav = () => {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const isActive = (href: string) => {
    const linkPath = href.split("#")[0] || "/";
    return linkPath === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 flex justify-center">
      <div className="grid grid-cols-6 w-full max-w-4xl h-min py-2">
        <div className="flex flex-col col-start-1 col-span-2 row-start-1">
          <a
            href="/"
            className="eb-garamond text-lg text-neutral-900 hover:text-red-700 transition-colors"
          >
            CTL
          </a>
        </div>
        <div className="flex flex-col col-start-3 col-span-4 row-start-1 justify-center">
          <div className="flex justify-start items-center gap-8 pl-6">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`kode-mono text-sm transition-colors ${
                  isActive(href)
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-900"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
