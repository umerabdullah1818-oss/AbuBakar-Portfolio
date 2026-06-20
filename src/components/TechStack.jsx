import { useEffect, useRef } from "react";

/* ── Tech Data — Updated to match Abubakar's resume ── */
const techs = [
  /* Languages & Frameworks */
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },

  /* AI & Automation */
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/ffffff" },
  {
    name: "Vapi",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#151719"/><path d="M33 28a5 5 0 0 1 9 0l8 27 8-27a5 5 0 0 1 9 0L54 70a5 5 0 0 1-8 0Z" fill="#54DCA8"/></svg>`,
  },
  {
    name: "GHL CRM",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#1a1a1a"/><polygon points="25,15 10,35 40,35" fill="#F0B323"/><polygon points="25,15 33,35 40,35" fill="#D4991A"/><rect x="17" y="35" width="16" height="55" fill="#F0B323"/><polygon points="50,40 35,60 65,60" fill="#2684FF"/><polygon points="50,40 58,60 65,60" fill="#1C65C7"/><rect x="42" y="60" width="16" height="30" fill="#2684FF"/><polygon points="75,10 60,30 90,30" fill="#21C45D"/><polygon points="75,10 83,30 90,30" fill="#169E48"/><rect x="67" y="30" width="16" height="60" fill="#21C45D"/></svg>`,
  },
  {
    name: "LangChain",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#1C3C3C"/><path d="M50 15 C55 25, 65 30, 60 45 C55 55, 65 60, 70 70 C60 75, 55 65, 50 55 C45 65, 40 75, 30 70 C35 60, 45 55, 40 45 C35 30, 45 25, 50 15Z" fill="#65E89D"/><circle cx="50" cy="50" r="6" fill="#1C3C3C"/></svg>`,
  },
  {
    name: "OpenAI",
    fallbackSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#10A37F"/><path d="M50 20c-8 0-15 5-18 12-6 2-11 8-11 15 0 5 2 9 5 12-1 3-1 7 1 10 3 6 9 9 16 9 3 3 8 5 13 5 8 0 15-5 18-12 6-2 11-8 11-15 0-5-2-9-5-12 1-3 1-7-1-10-3-6-9-9-16-9-3-3-8-5-13-5z" fill="white" stroke="white" stroke-width="2"/></svg>`,
  },

  /* Tools & Platforms */
  { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg" },
  { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", invert: true },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
];

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
        '--float-delay': `0s`,
        '--float-duration': `3s`,
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
        <h2 className="text-xs font-semibold tracking-[.2em] uppercase text-gray-500 mb-2 reveal">Tech Stack</h2>
        <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold reveal reveal-delay-1 text-gray-100">
          Technologies I <span className="text-cyan-400">work with</span>
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

      {/* ── GRID OF ALL TECH CARDS ── */}
      <div className="ts-grid-layout">
        {techs.map((t, idx) => (
          <TechCard key={t.name} t={t} idx={idx} />
        ))}
      </div>
    </section>
  );
}
