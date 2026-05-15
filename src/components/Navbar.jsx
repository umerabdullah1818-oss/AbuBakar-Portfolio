import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-[68px] bg-dark-700/[.92] backdrop-blur-lg border-b border-white/[.06] transition-colors max-md:px-6"
    >
      <a href="#home" className="font-cursive text-[1.65rem] font-bold text-white">
        Umer
      </a>

      <ul className="nav-links hidden md:flex gap-9 items-center">
        {["Home", "About", "Projects", "Services", "Resume"].map((t, i) => {
          const href = i === 4 ? "#contact" : `#${t.toLowerCase()}`;
          return (
            <li key={t}>
              <a
                href={href}
                className={`text-[0.875rem] font-normal tracking-wide transition-colors hover:text-white/90 ${i === 0 ? "active text-accent" : "text-white/55"}`}
              >
                {t}
              </a>
            </li>
          );
        })}
      </ul>

      <a
        href="#contact"
        className="nav-contact hidden md:inline-block px-5 py-[7px] border border-white/35 rounded-md text-[0.85rem] text-white/75 hover:border-white hover:text-white transition-all"
      >
        Contact Me
      </a>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] cursor-none bg-transparent border-none p-1"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span className={`block w-[22px] h-[2px] bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`}></span>
        <span className={`block w-[22px] h-[2px] bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
        <span className={`block w-[22px] h-[2px] bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
      </button>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-[68px] left-0 right-0 bg-dark-700/95 backdrop-blur-xl border-b border-white/[.06] transition-all duration-400 overflow-hidden ${open ? "max-h-[400px] py-6" : "max-h-0 py-0"}`}>
        <ul className="flex flex-col items-center gap-5">
          {["Home", "About", "Projects", "Services", "Contact"].map((t) => (
            <li key={t}>
              <a
                href={`#${t.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-[1rem] font-medium text-white/70 hover:text-accent transition-colors"
              >
                {t}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="px-6 py-2 border border-accent/40 rounded-lg text-accent text-sm font-semibold hover:bg-accent/10 transition-all"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
