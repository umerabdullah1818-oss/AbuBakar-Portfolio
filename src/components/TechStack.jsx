import { useEffect, useRef } from "react";

/* ── Tech Data ── */
const techs = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/white" },
  {
    name: "Vapi",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#151719"/><path d="M33 28a5 5 0 0 1 9 0l8 27 8-27a5 5 0 0 1 9 0L54 70a5 5 0 0 1-8 0Z" fill="#54DCA8"/></svg>`,
  },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  {
    name: "GHL CRM",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#FAFAFA"/><polygon points="25,15 10,35 40,35" fill="#F0B323"/><polygon points="25,15 33,35 40,35" fill="#D4991A"/><rect x="17" y="35" width="16" height="55" fill="#F0B323"/><polygon points="50,40 35,60 65,60" fill="#2684FF"/><polygon points="50,40 58,60 65,60" fill="#1C65C7"/><rect x="42" y="60" width="16" height="30" fill="#2684FF"/><polygon points="75,10 60,30 90,30" fill="#21C45D"/><polygon points="75,10 83,30 90,30" fill="#169E48"/><rect x="67" y="30" width="16" height="60" fill="#21C45D"/></svg>`,
  },
  { name: "Clerk", icon: "https://cdn.simpleicons.org/clerk/white" },
  {
    name: "Claude",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#CC6A4D"/><path d="M50 15L53 43L72 25L61 48L88 43L63 55L85 70L58 63L65 88L50 67L35 88L42 63L15 70L37 55L12 43L39 48L28 25L47 43Z" fill="#F2E8DF" stroke="#F2E8DF" stroke-width="4" stroke-linejoin="round"/></svg>`,
  },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  {
    name: "Vercel",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#F8F8F8"/><polygon points="50,20 20,75 80,75" fill="#000000"/></svg>`,
  },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", invert: true },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
];

/* ── Split techs into left (12) and right (12) columns ── */
const leftTechs = techs.slice(0, 12);
const rightTechs = techs.slice(12);

/* ── Column layouts to mimic the scattered mosaic look ── */
const leftCols = [
  leftTechs.slice(0, 4),
  leftTechs.slice(4, 8),
  leftTechs.slice(8, 12),
];
const rightCols = [
  rightTechs.slice(0, 4),
  rightTechs.slice(4, 8),
  rightTechs.slice(8, 12),
];

/* ── Stagger offsets per column to create organic scattered feel ── */
const leftOffsets = ["24px", "-12px", "36px"];
const rightOffsets = ["36px", "-12px", "24px"];

/* ── Column of Cards ── */
function CardColumn({ cards, offset, globalIdx, className = "" }) {
  return (
    <div className={`ts-galaxy-col ${className}`} style={{ paddingTop: offset }}>
      {cards.map((t, i) => (
        <TechCard key={t.name} t={t} idx={globalIdx + i} />
      ))}
    </div>
  );
}

function GalaxyOrb() {
  return (
    <div className="galaxy-container">
      <div className="galaxy-developer-parallax">
        <div className="galaxy-developer-wrapper">
          <img src="/developer.png" alt="Developer Coding" className="galaxy-developer" />
        </div>
      </div>
    </div>
  );
}

/* ── Single Animated Tech Card ── */
function TechCard({ t, idx }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotY = ((x - midX) / midX) * 12;
      const rotX = ((midY - y) / midY) * 12;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.05)`;
    };

    const handleLeave = () => {
      card.style.transform = '';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="ts-galaxy-card"
      style={{
        animationDelay: `${idx * 0.1}s`,
        '--float-delay': `${idx * 0.3}s`,
        '--float-duration': `${3 + (idx % 4) * 0.5}s`,
      }}
    >
      {/* Animated border glow */}
      <div className="ts-galaxy-card-glow" />
      <div className="ts-galaxy-card-inner">
        <div className="ts-galaxy-icon">
          {t.icon ? (
            <img
              src={t.icon}
              alt={t.name}
              loading="lazy"
              style={{ ...(t.invert ? { filter: "invert(1)" } : {}), ...(t.style || {}) }}
            />
          ) : t.fallbackSvg ? (
            <div dangerouslySetInnerHTML={{ __html: t.fallbackSvg }} />
          ) : null}
        </div>
        <span className="ts-galaxy-name">{t.name}</span>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function TechStack() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          section.classList.add("ts-visible");
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(section);

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      section.style.setProperty("--mouse-x", x);
      section.style.setProperty("--mouse-y", y);
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      obs.disconnect();
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="ts-galaxy-section"
    >
      {/* ── TOP: Heading & Description ── */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-xs font-semibold tracking-[.2em] uppercase text-white/35 mb-2 reveal">Tech Stack</h2>
        <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold reveal reveal-delay-1">
          Technologies I <span className="text-accent">work with</span>
        </p>
      </div>

      {/* ── GLOBAL ROTATING STAR FIELD ── */}
      <div className="ts-galaxy-stars-global">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="ts-global-star"
            style={{
              "--star-x": `${Math.random() * 100}%`,
              "--star-y": `${Math.random() * 100}%`,
              "--star-size": `${1 + Math.random() * 2}px`,
              "--star-delay": `${Math.random() * 5}s`,
              "--star-duration": `${2 + Math.random() * 3}s`,
              "--star-opacity": Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="ts-galaxy-layout">
        {/* ── LEFT SIDE CARDS ── */}
        <div className="ts-galaxy-side ts-galaxy-left">
          {leftCols.map((col, ci) => (
            <CardColumn
              key={ci}
              cards={col}
              offset={leftOffsets[ci]}
              globalIdx={ci * 4}
            />
          ))}
        </div>

        {/* ── CENTER: Galaxy ── */}
        <div className="ts-galaxy-center">
          <div className="ts-galaxy-visual reveal reveal-delay-3">
            <GalaxyOrb />
          </div>
        </div>

        {/* ── RIGHT SIDE CARDS ── */}
        <div className="ts-galaxy-side ts-galaxy-right">
          {rightCols.map((col, ci) => (
            <CardColumn
              key={ci}
              cards={col}
              offset={rightOffsets[ci]}
              globalIdx={11 + ci * 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
