import { useState, useEffect } from "react";

const services = [
  {
    name: "Full-Stack Web Development",
    color: "#4fc3f7",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`,
    bullets: [
      "End-to-end MERN stack applications",
      "Clean architecture & fast REST APIs",
      "Scalable, production-ready code",
      "Database design & optimization",
      "Seamless user experiences",
    ],
  },
  {
    name: "AI Automation Pipelines",
    color: "#4fc3f7",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>`,
    bullets: [
      "Intelligent N8N workflow design",
      "Vapi-powered voice & chat agents",
      "80%+ manual work elimination",
      "Multi-step AI orchestration",
      "Custom API integrations",
    ],
  },
  {
    name: "Voice AI & Conversational AI",
    color: "#4fc3f7",
    featured: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    bullets: [
      "Voice AI receptionists & assistants",
      "Automated call routing & scheduling",
      "CRM sync with GoHighLevel",
      "85%+ handling reduction",
      "Natural language understanding",
    ],
  },
  {
    name: "React.js UI Development",
    color: "#4fc3f7",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="4" rx="1"/><rect x="14" y="10" width="7" height="11" rx="1"/><rect x="3" y="13" width="7" height="8" rx="1"/></svg>`,
    bullets: [
      "Pixel-perfect responsive interfaces",
      "Tailwind CSS component systems",
      "Performance-optimized rendering",
      "Cross-device compatibility",
      "Modern accessible design",
    ],
  },
  {
    name: "GoHighLevel CRM & SEO",
    color: "#4fc3f7",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><path d="M3 20h18"/></svg>`,
    bullets: [
      "Full GHL CRM setup & config",
      "Customer journey workflows",
      "On-page SEO optimization",
      "40%+ organic traffic growth",
      "Analytics & conversion tracking",
    ],
  },
];

const tilts = [-6, -3, 0, 3, 6];
const yOffsets = [24, 10, 0, 10, 24];

function CheckIcon({ color }) {
  return (
    <div
      className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
      style={{ background: color, boxShadow: `0 2px 8px ${color}55` }}
    >
      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="services" className="relative px-4 md:px-6 py-24 overflow-hidden" style={{ background: "rgba(26,26,26,0.85)" }}>
      <h2 className="text-center text-xs font-semibold tracking-[.2em] uppercase text-white/35 mb-2 reveal">
        What I do
      </h2>
      <p className="text-center text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold mb-14 md:mb-20 reveal reveal-delay-1">
        My <span className="text-accent">Services</span>
      </p>

      <div
        className={`max-w-[1200px] mx-auto ${isMobile ? "flex flex-col items-center gap-5" : "relative flex justify-center items-center"}`}
        style={isMobile ? {} : { minHeight: 440 }}
      >
        {services.map((s, i) => {
          const isFeatured = s.featured;
          return (
            <div
              key={s.name}
              className={`reveal reveal-delay-${Math.min(i, 4)} service-tilt-card`}
              style={isMobile ? {} : {
                position: "absolute",
                left: `${10 + i * 17}%`,
                transform: `rotate(${tilts[i]}deg) translateY(${yOffsets[i]}px)`,
                transformOrigin: "center bottom",
                zIndex: isFeatured ? 10 : 5 - Math.abs(i - 2),
              }}
            >
              <div
                className="group relative rounded-2xl p-7 backdrop-blur-md service-card-inner"
                style={{
                  width: 230,
                  background: "rgba(26,26,26,0.92)",
                  border: "1.5px solid rgba(79,195,247,0.2)",
                  boxShadow: "0 12px 40px rgba(0,0,0,.4)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  <div className="w-5 h-5" style={{ color: s.color }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                </div>

                {/* Title */}
                <h3 className="text-[0.95rem] font-bold text-white/90 leading-snug mb-1">
                  {s.name}
                </h3>

                {/* Divider */}
                <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: s.color }}></div>

                {/* Bullets */}
                <ul className="flex flex-col gap-3.5">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckIcon color={s.color} />
                      <span className="text-[0.8rem] text-white/65 leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
