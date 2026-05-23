import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const dotRefs = useRef([]);

  /* ── Entrance animation ── */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  /* ── Active section tracking on scroll ── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const onScroll = () => {
      let cur = "Home";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) {
          const id = s.id;
          const match = navItems.find((n) => n.href === `#${id}`);
          if (match) cur = match.label;
        }
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Toggle mobile menu ── */
  const toggleMenu = () => {
    const opening = !menuOpen;
    setMenuOpen(opening);

    if (opening) {
      /* Morph dots → X */
      const dots = dotRefs.current;
      const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power3.inOut" } });
      tl.to(dots[0], { x: 3, y: 3, rotate: 45, scale: 1.3 })
        .to(dots[1], { x: -3, y: 3, rotate: -45, scale: 1.3 }, "<")
        .to(dots[2], { x: 3, y: -3, rotate: -45, scale: 1.3 }, "<")
        .to(dots[3], { x: -3, y: -3, rotate: 45, scale: 1.3 }, "<");

      /* Overlay in */
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });

      /* Stagger menu items */
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    } else {
      /* Morph X → dots */
      gsap.to(dotRefs.current, {
        x: 0, y: 0, rotate: 0, scale: 1,
        duration: 0.35, ease: "power3.inOut",
      });

      /* Overlay out */
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
      });
    }
  };

  const handleNavClick = (item) => {
    setActive(item.label);
    if (menuOpen) toggleMenu();
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        id="navbar"
        ref={navRef}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[860px]
                   flex items-center justify-between
                   px-4 sm:px-5 py-3
                   rounded-full
                   backdrop-blur-xl
                   shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{
          background: "rgba(26,26,26,0.45)",
          border: "1.5px solid rgba(255,255,255,0.06)",
          opacity: 0,
        }}
      >
        {/* Left — Logo */}
        <a href="#home" className="font-cursive" style={{ cursor: "none", fontFamily: "'Dancing Script', cursive", fontSize: "1.65rem", fontWeight: 700, color: "#fff" }}>
          Umer
        </a>

        {/* Center — Desktop Nav */}
        <ul className="nav-links hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setActive(item.label)}
                className={`
                  relative px-4 py-1.5 rounded-full text-[0.72rem] font-medium tracking-wide
                  transition-all duration-300 block
                  ${active === item.label
                    ? "text-white/90"
                    : "text-white/40 hover:text-white/65"
                  }
                `}
                style={active === item.label ? {
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                } : {}}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right — CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:block px-4 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wide transition-all duration-300"
            style={{
              color: "rgba(79,195,247,0.8)",
              border: "1px solid rgba(79,195,247,0.15)",
              cursor: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(79,195,247,0.1)";
              e.target.style.borderColor = "rgba(79,195,247,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(79,195,247,0.15)";
            }}
          >
            Hire Me
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "none",
            }}
          >
            <div className="grid grid-cols-2 gap-[3px] w-3.5 h-3.5 place-items-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  ref={(el) => (dotRefs.current[i] = el)}
                  className="w-[3px] h-[3px] rounded-full bg-white/50"
                />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* ── Fullscreen Mobile Overlay ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center opacity-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(10,10,12,0.97) 0%, rgba(15,20,28,0.98) 50%, rgba(10,10,12,0.97) 100%)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col items-center gap-5">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              ref={(el) => (menuItemsRef.current[i] = el)}
              onClick={() => handleNavClick(item)}
              className={`
                text-2xl sm:text-3xl font-light tracking-wide
                transition-all duration-400
                ${active === item.label
                  ? "text-white"
                  : "text-white/25 hover:text-white/60 hover:tracking-widest hover:scale-105"
                }
              `}
              style={{ opacity: 0, cursor: "none" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-12 w-16 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), transparent)" }}
        />
      </div>
    </>
  );
}
