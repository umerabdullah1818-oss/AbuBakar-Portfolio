import { useState, useRef, useEffect, useCallback } from "react";

const categories = [
  {
    id: "fullstack",
    name: "Full-Stack Development",
    desc: "End-to-end web apps with robust backends and seamless frontends.",
    gradient: "linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(0,240,255,0.15) 50%, rgba(0,85,255,0.1) 100%)",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=95",
  },
  {
    id: "ai",
    name: "AI & Automation",
    desc: "Intelligent pipelines, voice agents, and multi-agent AI systems.",
    gradient: "linear-gradient(135deg, rgba(127,0,255,0.08) 0%, rgba(127,0,255,0.15) 50%, rgba(100,0,200,0.1) 100%)",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=95",
  },
  {
    id: "frontend",
    name: "Frontend & UI",
    desc: "Pixel-perfect interfaces that captivate and convert visitors.",
    gradient: "linear-gradient(135deg, rgba(0,85,255,0.08) 0%, rgba(0,85,255,0.15) 50%, rgba(0,60,200,0.1) 100%)",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=95",
  },
  {
    id: "wordpress",
    name: "WordPress & CMS",
    desc: "Professional business websites with CMS, SEO, and performance.",
    gradient: "linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(0,240,255,0.15) 50%, rgba(0,200,220,0.1) 100%)",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=95",
  },
  {
    id: "crm",
    name: "CRM & SEO",
    desc: "GoHighLevel CRM setups, SEO optimization, and growth strategies.",
    gradient: "linear-gradient(135deg, rgba(0,85,255,0.08) 0%, rgba(0,85,255,0.15) 50%, rgba(0,60,200,0.1) 100%)",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=95",
  },
];

const projects = {
  fullstack: [
    {
      name: "AegisCare — Multi-Agent Elderly Care",
      desc: "A full-stack MERN platform with multi-agent AI for real-time elderly patient monitoring, health alerts, caregiver dashboards, telemedicine, and smart health analytics.",
      tech: ["React.js", "Node.js", "MongoDB", "Multi-Agent AI", "Socket.io"],
      github: "https://github.com/abubakarwaseem/AegisCare-FYP",
      live: "popup",
      img: "/projects/aegis-main.png",
    },
    {
      name: "Cogxioms — Corporate MERN Stack Website",
      desc: "Delivered a scalable, high-performance MERN corporate website with modern responsive UI and an optimized Express.js/MongoDB backend achieving sub-200ms average API response times.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      github: "https://github.com/abubakarwaseem",
      live: "popup",
      img: "/projects/lms.png",
    },
  ],
  ai: [
    {
      name: "AI Inbound Receptionist System",
      desc: "Voice AI receptionist using Vapi for natural-language call handling, appointment scheduling, and live GHL CRM sync via N8N — automating 100% of routine inbound calls and eliminating staffing overhead entirely.",
      tech: ["Vapi", "N8N", "GoHighLevel CRM", "Voice AI", "Webhooks"],
      github: "",
      live: "https://dbtronics.org/inbound-receptionist/",
      img: "/projects/inbound.png",
    },
    {
      name: "AI Chatbot Automation System",
      desc: "N8N-powered conversational AI system automating customer query resolution, lead qualification, and cross-platform CRM sync via webhook triggers — reducing manual response overhead by 80%.",
      tech: ["N8N", "OpenAI APIs", "LangChain", "Webhooks", "REST APIs"],
      github: "",
      live: "popup",
      img: "/projects/chatbot.png",
    },
    {
      name: "Telegram Automation Bot",
      desc: "High-volume Telegram bots via Selenium & Playwright for automated data extraction, real-time content updates, and scheduled delivery pipelines — processing thousands of records per session at scale.",
      tech: ["Python", "Selenium", "Playwright", "Web Scraping"],
      github: "https://github.com/abubakarwaseem",
      live: "popup",
      img: "/projects/chatbot.png",
    },
  ],
  frontend: [
    {
      name: "Personal Portfolio — Abu Bakar",
      desc: "A highly interactive, 3D-inspired developer portfolio featuring immersive GSAP animations, custom modern UI components, and a sleek professional aesthetic.",
      tech: ["React.js", "Tailwind CSS", "GSAP", "Vite"],
      github: "https://github.com/abubakarwaseem",
      live: "https://portfolio-chi-snowy-18.vercel.app/",
      img: "/projects/portfolio-hd.png",
    },
    {
      name: "Glide Chemicals — Corporate Website",
      desc: "A sleek corporate website with modern UI, product showcase, and optimized performance across all devices.",
      tech: ["React.js", "Tailwind CSS", "Express.js", "Framer Motion"],
      github: "https://github.com/abubakarwaseem",
      live: "https://glidechemicals.com/",
      img: "/projects/glide.png",
    },
  ],
  wordpress: [
    {
      name: "DBtronics.org — Business Website",
      desc: "Professional WordPress site with custom theme, on-page SEO, blog management, achieving 40%+ traffic growth.",
      tech: ["WordPress", "Custom Theme", "SEO", "Google Analytics"],
      github: "",
      live: "https://dbtronics.org",
      img: "/projects/dbtronics.png",
    },
  ],
  crm: [
    {
      name: "GoHighLevel CRM Automation",
      desc: "Full CRM pipeline setup with automated customer journeys, lead nurturing workflows, and analytics dashboards.",
      tech: ["GoHighLevel", "Zapier", "Google Analytics", "SEO Tools"],
      github: "",
      live: "popup",
      images: [
        "/projects/ghl1.png",
        "/projects/ghl2.png",
      ],
    },
  ],
};

const ProjectImageCarousel = ({ images, img, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative h-[220px] md:h-[400px] overflow-hidden bg-[#111]">
        <img src={img} alt={name} className="w-full h-full object-cover object-center project-img-hd transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent opacity-80"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[220px] md:h-[400px] overflow-hidden group/carousel bg-[#111]">
      <img src={images[currentIndex]} alt={`${name} - ${currentIndex + 1}`} className="w-full h-full object-cover object-center project-img-hd transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent opacity-80"></div>

      {/* Controls */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#111]/70 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 opacity-0 group-hover/carousel:opacity-100 hover:bg-cyan-950 hover:text-cyan-400 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#111]/70 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 opacity-0 group-hover/carousel:opacity-100 hover:bg-cyan-950 hover:text-cyan-400 transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-cyan-400 w-3" : "bg-gray-600 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (!activeCategory) startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [activeCategory, startAutoplay]);

  const pauseAutoplay = () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };

  const scrollTo = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  const goBack = () => {
    setActiveCategory(null);
    setTimeout(() => {
      document.querySelectorAll("#projects .reveal:not(.visible)").forEach((el) => el.classList.add("visible"));
    }, 50);
  };

  const handleLiveClick = (url) => {
    if (url === "popup") {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden" style={{ background: "rgba(14,14,14,0.95)" }}>
      <div className="px-5 md:px-12">
        <h2 className="text-center text-xs font-semibold tracking-[.2em] uppercase text-gray-500 mb-2 reveal">Projects</h2>
        <p className="text-center text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold mb-4 reveal reveal-delay-1 text-gray-100">
          Some of my <span className="text-cyan-400">Work</span>
        </p>
        <p className="text-center text-sm text-gray-500 mb-12 reveal reveal-delay-2 max-w-lg mx-auto">
          Browse by category — click a card to explore projects within.
        </p>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowPopup(false)}>
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl" style={{ animation: "fadeUp .3s ease both" }}>
            <div className="w-14 h-14 rounded-full bg-cyan-950/50 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            </div>
            <h4 className="text-lg font-bold text-gray-100 mb-2">Not Live Yet</h4>
            <p className="text-sm text-gray-400">This project is currently not deployed. Check back soon for the live version!</p>
          </div>
        </div>
      )}

      {/* CAROUSEL */}
      {!activeCategory && (
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-14">
          <button onClick={() => { scrollTo(-1); pauseAutoplay(); }} className="absolute left-0 md:left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#111]/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-cyan-950 hover:border-cyan-500/50 hover:text-cyan-400 transition-all shadow-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <button onClick={() => { scrollTo(1); pauseAutoplay(); }} className="absolute right-0 md:right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#111]/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-cyan-950 hover:border-cyan-500/50 hover:text-cyan-400 transition-all shadow-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={startAutoplay}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); pauseAutoplay(); }}
                className="snap-start shrink-0 w-[240px] md:w-[270px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,240,255,.1)]"
                style={{ border: "1.5px solid rgba(50,50,50,0.8)", background: "rgba(17,17,17,0.95)" }}
              >
                <div className="p-4 md:p-5 pb-3">
                  <h3 className="text-[0.9rem] md:text-[0.95rem] font-bold text-gray-100 mb-1.5 group-hover:text-cyan-400 transition-colors duration-300">{cat.name}</h3>
                  <p className="text-[0.68rem] md:text-[0.72rem] text-gray-500 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="relative h-[140px] md:h-[170px] mx-3 mb-3 rounded-xl overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: cat.gradient, opacity: 0.55 }}></div>
                  <div className="absolute bottom-3 left-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#111]/70 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-cyan-950 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#111]/70 backdrop-blur-sm text-[0.58rem] text-gray-300 font-semibold">
                    {projects[cat.id]?.length || 0} projects
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL VIEW */}
      {activeCategory && (
        <div className="px-4 md:px-12 max-w-[1100px] mx-auto" style={{ animation: "fadeUp .5s ease both" }}>
          <button onClick={goBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors mb-8 group">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-1 transition-transform"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Back to categories
          </button>

          <div className="mb-8 md:mb-10">
            <h3 className="font-display text-xl md:text-2xl font-bold text-gray-100 mb-2">
              {categories.find((c) => c.id === activeCategory)?.name}
            </h3>
            <div className="w-16 h-[3px] rounded-full bg-cyan-400"></div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {(projects[activeCategory] || []).map((p, i) => (
              <div
                key={p.name}
                className="group rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all duration-500"
                style={{ background: "rgba(17,17,17,0.9)", animation: `fadeUp .5s ${i * 0.15}s ease both` }}
              >
                {/* Image Carousel */}
                <ProjectImageCarousel images={p.images} img={p.img} name={p.name} />

                {/* Content */}
                <div className="p-5 md:p-7">
                  <h4 className="text-base md:text-lg font-bold text-gray-100 mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors duration-300">{p.name}</h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4 md:mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-6">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-gray-700 bg-[#1a1a1a] text-[0.62rem] md:text-[0.68rem] text-gray-400 font-medium">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-xs font-semibold text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        GitHub
                      </a>
                    )}
                    <button onClick={() => handleLiveClick(p.live)} className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-semibold text-cyan-400 hover:bg-cyan-900/40 transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Live Site
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
