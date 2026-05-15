import { useEffect, useRef } from "react";

const techs = [
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", pct: 95 },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", pct: 92 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", pct: 96 },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", pct: 95 },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", pct: 93 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", pct: 94 },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", pct: 93, invert: true },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", pct: 92 },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", pct: 91 },
  {
    name: "N8N",
    icon: "https://n8n.io/favicon.ico",
    pct: 94,
    fallbackSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#EA4B71"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="sans-serif">n8n</text></svg>`,
  },
  {
    name: "Vapi",
    pct: 93,
    fallbackSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#5B5FC7"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="11" font-weight="bold" font-family="sans-serif">Vapi</text></svg>`,
  },
  {
    name: "GHL CRM",
    pct: 91,
    fallbackSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#FF6B35"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">GHL</text></svg>`,
  },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", pct: 92, invert: true },
  {
    name: "Open ai API",
    pct: 95,
    fallbackSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="transparent" stroke="white" stroke-width="1.2"/><path fill="white" transform="scale(0.55) translate(10, 10)" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.989-2.9 6.051 6.051 0 0 0-.7388-7.0732zm-8.622 10.9415c-2.0232.0622-3.9782-.7169-5.419-2.1643-.2432-.2444-.393-.5662-.4225-.9118a.9333.9333 0 0 1 .2886-.7779L10.59 14.545c.4217.4192.9904.6548 1.5878.6534h6.0558c-.1434 1.503-.9845 2.8258-2.285 3.5936a5.008 5.008 0 0 1-2.2887.6206zm-8.818-3.078c-1.3932-1.464-1.6366-3.6267-.6113-5.3214.1264-.208.2884-.3944.4786-.549.2974-.2423.6705-.36561 1.0544-.3494L8.358 4.706c.461-.2645.989-.403 1.523-.4002 1.6214.0044 3.0906.8797 3.864 2.2598L10.366 8.5283c-1.0494.6067-1.7483 1.7005-1.8488 2.9038v5.5263l-2.001-1.1578c-.6114-.3537-1.1118-.853-1.456-1.4593zm5.674-10.4281c1.9213-1.0567 4.331-1.0567 6.2523 0 .2645.1432.4934.3392.6738.5752.196.2555.302.5707.302.894L18.91 5.3402c0 .5243-.1385 1.036-.4004 1.4883L15.131 12.68c-.604-1.0506-1.701-1.749-2.905-1.8485h-6.111L8.116 8.513c.7725-1.3656 2.228-2.227 3.818-2.2345zm9.957 4.4124c1.3932 1.464 1.6366 3.6267.6113 5.3214-.1264.208-.2884.3944-.4786.549-.2974.2423-.6705.3656-1.0544.3494L15.642 19.294c-.461.2645-.989.403-1.523.4002-1.6214-.0044-3.0906-.8797-3.864-2.2598l3.379-1.9627c1.0494-.6067 1.7483-1.7005 1.8488-2.9038V7.0416l2.001 1.1578c.6114.3537 1.1118.853 1.456 1.4593zm-5.674 10.4281c-1.9213 1.0567-4.331 1.0567-6.2523 0-.2645-.1432-.4934-.3392-.6738-.5752-.196-.2555-.302-.5707-.302-.894l2.427-1.3995c0-.5243.1385-1.036.4004-1.4883l3.3785-5.852c.604 1.0506 1.701 1.749 2.905 1.8485h6.111l-2.001 2.3185c-.7725 1.3656-2.228 2.227-3.818 2.2345z"/></svg>`
  },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", pct: 90, invert: true },
  { name: "Git / GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", pct: 95, invert: true },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", pct: 96 },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", pct: 93 },
];

function TechCard({ t, delay }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && barRef.current) {
          barRef.current.style.width = t.pct + "%";
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [t.pct]);

  return (
    <div className={`ts-item bg-dark-600 border border-white/[.06] rounded-2xl p-6 pb-5 flex flex-col items-center gap-3 reveal ${delay}`}>
      <div className="ts-icon w-12 h-12 flex items-center justify-center transition-transform duration-300">
        {t.icon ? (
          <img src={t.icon} alt={t.name} className="w-full h-full object-contain" style={t.invert ? { filter: "invert(1)" } : {}} />
        ) : t.fallbackSvg ? (
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: t.fallbackSvg }} />
        ) : (
          <span className="text-3xl">{t.emoji}</span>
        )}
      </div>

      <div className="ts-label text-[0.7rem] font-semibold text-white/60 tracking-wider uppercase text-center transition-colors">
        {t.name}
      </div>

      <div className="w-full mt-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[0.6rem] text-white/30 tracking-wider uppercase">Proficiency</span>
          <span className="text-[0.65rem] text-accent font-bold">{t.pct}%</span>
        </div>
        <div className="w-full h-[5px] rounded-full bg-white/[.06] overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-accent transition-all duration-1000 ease-out"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="techstack" className="px-12 py-24 max-md:px-6" style={{ background: "rgba(22,22,22,0.88)" }}>
      <h2 className="text-center text-xs font-semibold tracking-[.2em] uppercase text-white/35 mb-2 reveal">Tech Stack</h2>
      <p className="text-center text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold mb-12 reveal reveal-delay-1">
        Technologies I <span className="text-accent">work with</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-[1100px] mx-auto">
        {techs.map((t, i) => (
          <TechCard key={t.name} t={t} delay={`reveal-delay-${i % 5}`} />
        ))}
      </div>
    </section>
  );
}
