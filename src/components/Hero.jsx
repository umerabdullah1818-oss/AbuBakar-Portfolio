import { useRef, useEffect } from "react";
import gsap from "gsap";
import avatarImg from "../assets/hero-portrait.webp";


export default function Hero() {
  const sectionRef = useRef(null);
  const backLettersRef = useRef([]);
  const photoRef = useRef(null);

  const eyebrowRef = useRef(null);
  const contactRef = useRef(null);
  const circleRef = useRef(null);
  const socialRef = useRef(null);

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
      
      /* 7. Social Links */
      .fromTo(
        socialRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.4"
      );
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
        className="absolute inset-0 flex items-start justify-center pt-[14vh] sm:pt-[24vh] pointer-events-none select-none"
        style={{ zIndex: 20 }}
      >
        <div className="flex flex-col items-center lg:items-start">
          {/* Eyebrow text — centered above the heading */}
          <div ref={eyebrowRef} className="lg:self-center" style={{ opacity: 0, marginBottom: "-1vw" }}>
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
              Full Stack AI Developer
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
          height: "70%",
          opacity: 0,
        }}
      >
        <img
          src={avatarImg}
          alt="Umer Abdullah Shah"
          className="w-full h-full object-contain object-bottom"
          draggable="false"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)",
            filter: "contrast(1.08) brightness(0.97)",
          }}
        />
      </div>



      {/* ── Smoky Fog Animation at Bottom ── */}
      <div className="hero-smoke-container" style={{ zIndex: 35 }}>
        <div className="hero-smoke-layer hero-smoke-1" />
        <div className="hero-smoke-layer hero-smoke-2" />
        <div className="hero-smoke-layer hero-smoke-3" />
        <div className="hero-smoke-layer hero-smoke-4" />
        <div className="hero-smoke-layer hero-smoke-5" />
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



      {/* ── Social Links ── */}
      <div ref={socialRef} className="absolute left-6 bottom-10 z-50 hidden md:flex flex-col gap-4 items-center">
        {[
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/umer-abdullah-shah-423870356?utm_source=share_via&utm_content=profile&utm_medium=member_android",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            ),
          },
          {
            name: "Instagram",
            url: "https://www.instagram.com/umershah1818?utm_source=qr&igsh=NWZzaHc4bGoyMDJw",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            ),
          },
          {
            name: "WhatsApp",
            url: "https://wa.me/923244519323",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                <path d="M16.5 14.5c-.5.5-1 1-1.5 1.5s-1.5.5-2.5-.5-2-2-2.5-2.5.5-1 1-1.5a1 1 0 0 0 .3-1c-.2-.5-.5-1-.8-1.5a1 1 0 0 0-1.4-.3c-.6.6-1 1.5-.7 2.5.5 1.5 1.5 3 2.5 4s2.5 2 4 2.5c1 .3 2-.1 2.5-.7a1 1 0 0 0-.3-1.4c-.5-.3-1-.6-1.5-.8a1 1 0 0 0-1 .2z"></path>
              </svg>
            ),
          },
          {
            name: "Email",
            url: "mailto:umerabdullah1818@gmail.com",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            ),
          },
          {
            name: "GitHub",
            url: "https://github.com/umerabdullah1818-oss",
            icon: (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            ),
          },
        ].map((social, i) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-[#4fc3f7]/50 hover:bg-[#4fc3f7]/10 transition-all duration-300 transform hover:scale-110"
          >
            {social.icon}
          </a>
        ))}
      </div>

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
