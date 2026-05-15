import { useEffect, useRef } from "react";
import avatarImg from "../assets/avatar.jpg";

export default function Hero() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const cardRef = useRef(null);

  /* Particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas); resize();
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.45 + 0.08,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,195,247,${p.o})`; ctx.fill();
      });
      pts.forEach((a, i) =>
        pts.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 95) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(79,195,247,${(1 - d / 95) * 0.07})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        })
      );
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  /* Avatar parallax */
  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;
    const move = (e) => {
      const r = stage.getBoundingClientRect();
      const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 2;
      const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 2;
      card.style.transform = `rotateX(${dy * 11}deg) rotateY(${-dx * 11}deg) translateZ(20px)`;
      stage.style.transform = `perspective(800px) rotateX(${dy * 3.5}deg) rotateY(${-dx * 3.5}deg)`;
    };
    const leave = () => { card.style.transform = ""; stage.style.transform = ""; };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);

  const pills = ["React.js", "Node.js", "Next.js", "Python", "OpenAI", "LangChain", "N8N", "PostgreSQL", "Vapi"];

  return (
    <section id="home" className="relative min-h-screen flex flex-col md:flex-row items-center px-5 md:px-12 py-20 pt-28 gap-6 md:gap-10 overflow-hidden">
      <div className="grid-bg"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

      {/* Left */}
      <div className="relative z-10 flex-1 min-w-0 max-md:text-center">

        <h1 className="hero-name font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-[1.08] mb-4">
          <span>Umer</span><br />
          <span className="bg-gradient-to-r from-blue-500 via-accent to-purple-500 bg-clip-text text-transparent">Abdullah Shah</span>
        </h1>

        <div className="hero-role flex flex-wrap items-center gap-2 text-sm text-white/55 mb-5">
          <span className="text-accent font-semibold">Full Stack Developer</span>
          <span className="text-white/20">◆</span>
          <span>AI Engineer</span>
          <span className="text-white/20">◆</span>
          <span>Automation Architect</span>
        </div>

        <p className="hero-desc text-white/55 leading-relaxed max-w-lg mb-6 max-md:max-w-full max-md:mx-auto max-md:text-sm">
          Building <em className="text-white/80">intelligent digital experiences</em> — from robust full-stack systems to{" "}
          <em className="text-white/80">multi-agent AI pipelines</em>. I turn complex problems into elegant, scalable solutions.
        </p>

        <div className="hero-tech flex flex-wrap gap-2 mb-8">
          {pills.map((t) => (
            <span key={t} className="px-3 py-[5px] rounded-full border border-white/10 bg-white/[.04] text-xs text-white/50 font-medium tracking-wide hover:border-accent/40 hover:text-accent transition-colors">
              {t}
            </span>
          ))}
        </div>

        <div className="hero-btns flex flex-wrap gap-3">
          <a href="#projects" className="hbtn hbtn-primary">View Projects ↗</a>
          <a href="#contact" className="hbtn hbtn-secondary">Contact Me →</a>
          <a href="/resume.pdf" download="Umer_Abdullah_Resume.pdf" className="hbtn hbtn-hire">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 inline-block"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Right: Avatar */}
      <div className="relative z-10 flex-1 flex justify-center items-center w-full">
        <div ref={stageRef} className="relative w-[220px] h-[220px] md:w-[360px] md:h-[360px] flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <div ref={cardRef} className="av-card" style={{ transformStyle: "preserve-3d" }}>
            <img src={avatarImg} alt="Umer Abdullah Shah" />
            <div className="av-overlay"></div>
            <div className="av-scan"></div>
          </div>
          <div className="av-chip absolute -top-4 -right-8" style={{ animationDelay: "0s" }}><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-1"></span>MERN Stack</div>
          <div className="av-chip absolute top-1/4 -left-16" style={{ animationDelay: "1.2s" }}><span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block mr-1"></span>AI &amp; LLMs</div>
          <div className="av-chip absolute bottom-4 -right-12" style={{ animationDelay: "2.5s" }}><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1"></span>Voice AI</div>
          <div className="av-chip absolute -bottom-6 left-0" style={{ animationDelay: "3.8s" }}><span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block mr-1"></span>N8N Flows</div>
        </div>
      </div>


      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="scroll-line"></div>
        <span className="text-[0.68rem] tracking-[0.12em] text-white/35 uppercase">Scroll</span>
      </div>
    </section>
  );
}
