import { useRef, useEffect } from "react";
import gsap from "gsap";
import avatarImg from "../assets/hero-portrait.png";


export default function Hero() {
  const sectionRef = useRef(null);
  const backLettersRef = useRef([]);
  const photoRef = useRef(null);

  const eyebrowRef = useRef(null);
  const contactRef = useRef(null);
  const circleRef = useRef(null);

  const descRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.4,
    });

    /* 1. Heading letters — staggered scaleY wipe */
    tl.fromTo(
      backLettersRef.current.filter(Boolean),
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.9, stagger: 0.04, transformOrigin: "bottom center" }
    )

      /* 2. Photo fades + slides up */
      .fromTo(
        photoRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
        "-=0.7"
      )

      /* 4. Eyebrow fades in last with upward drift */
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      )

      /* 5. Mobile description fade up */
      .fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )

      /* 6. Circle brand mark */
      .fromTo(
        circleRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      )

;
  }, []);

  const heading = "UMER ABDULLAH";
  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── Grid background ── */}
      <div className="grid-bg" style={{ zIndex: 10, opacity: 0.8 }} />

      {/* ── Back text layer — behind person ── */}
      <div
        className="absolute inset-0 flex items-start justify-center pt-[20vh] sm:pt-[24vh] pointer-events-none select-none"
        style={{ zIndex: 20 }}
      >
        <div className="flex flex-col items-center lg:items-start">
          {/* Eyebrow text — centered above the heading */}
          <div ref={eyebrowRef} style={{ opacity: 0, marginBottom: "-1vw" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(0.6rem, 2.5vw, 1.25rem)",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.65)",
                textTransform: "uppercase",
                paddingBottom: "4%",
                paddingTop: "5%"
              }}
            >
              Full-Stack AI Developer
            </p>
          </div>

          <h1
            className="flex whitespace-nowrap"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(3rem, 11vw, 12rem)",
              letterSpacing: "-0.02em",
              color: "#4fc3f7",
              lineHeight: 0.95,
            }}
          >
            {heading.split("").map((letter, i) => (
              <span
                key={`b${i}`}
                ref={(el) => (backLettersRef.current[i] = el)}
                className="inline-block"
                style={{ opacity: 0 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          {/* Mobile-only motivational description */}
          <p
            ref={descRef}
            className="sm:hidden text-center text-white/60 text-[0.85rem] leading-relaxed max-w-[90%] mt-6 mx-auto font-medium"
            style={{ opacity: 0, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}
          >
            Crafting intelligent, scalable digital experiences. Merging full-stack precision with cutting-edge AI to turn complex problems into elegant solutions.
          </p>
        </div>
      </div>

      {/* ── Person image — centered, layered IN FRONT of all text ── */}
      <div
        ref={photoRef}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
        style={{
          zIndex: 40,
          width: "clamp(340px, 85vw, 600px)",
          height: "90%",
          opacity: 0,
        }}
      >
        <img
          src={avatarImg}
          alt="Umer Abdullah Shah"
          className="w-full h-full object-contain object-bottom"
          draggable="false"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)",
            filter: "contrast(1.08) brightness(0.97)",
          }}
        />
      </div>



      {/* ── Bottom gradient for readability ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
        style={{
          zIndex: 19,
          background: "linear-gradient(to top, #080a0f 0%, transparent 100%)",
        }}
      />

      {/* ── Resume Download Button ── */}
      <a
        ref={circleRef}
        href="/resume.pdf"
        download="Umer_Abdullah_Resume.pdf"
        className="absolute hidden sm:flex group items-center gap-4 cursor-pointer pointer-events-auto"
        style={{ zIndex: 50, bottom: "7%", right: "6%" }}
      >
        <span
          className="text-white/80 font-sans font-medium uppercase tracking-[0.2em] text-[0.6rem] 
                     opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 
                     transition-all duration-500 ease-out whitespace-nowrap"
        >
          Click here to download resume
        </span>

        <div className="relative w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md overflow-hidden group-hover:border-[#4fc3f7]/50 group-hover:bg-[#4fc3f7]/10 transition-colors duration-500 shadow-lg">
          {/* Closed Envelope */}
          <svg
            className="absolute w-6 h-6 text-white/70 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:-translate-y-2"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>

          {/* Open Envelope */}
          <svg
            className="absolute w-6 h-6 text-[#4fc3f7] opacity-0 scale-75 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
            <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
            {/* Paper popping out slightly */}
            <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
          </svg>
        </div>
      </a>



      {/* ── Subtle noise / grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
