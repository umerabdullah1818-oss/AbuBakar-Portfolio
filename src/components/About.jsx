export default function About() {
  const experiences = [
    { role: "AI Developer Intern", company: "DBtronics.org — Canada ", date: "Jan 2026 – Present" },
    { role: "Web Developer Intern", company: "Reownlogics — Pakistan", date: "2025" },
    { role: "Frontend Developer Intern", company: "US Group — Pakistan", date: "2024" },
  ];

  return (
    <section id="about" className="px-12 py-24 max-md:px-6" style={{ background: "rgba(26,26,26,0.88)" }}>
      <h2 className="text-center text-xs font-semibold tracking-[.2em] uppercase text-white/35 mb-2 reveal">About Me</h2>
      <p className="text-center text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold mb-12 reveal reveal-delay-1">
        <span className="text-white/35">Get to</span> know me
      </p>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bio */}
        <div className="about-card bg-dark-600 border border-white/[.06] rounded-2xl p-7 reveal">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-accent mb-4">Know who am I</h3>
          <p className="text-white/50 leading-relaxed text-sm mb-3">
            I'm <span className="text-white/90 font-medium">Umer Abdullah Shah</span>, a Full-Stack Developer and AI Automation Engineer with internship experience across{" "}
            <span className="text-white/90">Pakistan</span> and <span className="text-white/90">Canada</span>. I specialise in the MERN stack, React.js, and AI automation tools — N8N, Vapi, and GoHighLevel CRM.
          </p>
          <p className="text-white/50 leading-relaxed text-sm mb-5">
            Whether it's engineering a Voice AI receptionist that cuts manual call-handling by 85%, or building a multi-agent patient monitoring platform — I turn complex problems into{" "}
            <span className="text-white/90">elegant, scalable solutions</span> that deliver measurable business impact.
          </p>
          <a href="/resume.pdf" download="Umer_Abdullah_Resume.pdf" className="text-accent text-sm font-semibold hover:underline">Download Resume →</a>
        </div>

        {/* Experience */}
        <div className="about-card bg-dark-600 border border-white/[.06] rounded-2xl p-7 reveal reveal-delay-1">
          <div className="text-[0.72rem] font-semibold tracking-[.1em] uppercase text-accent mb-4 flex items-center gap-1.5">
            <span>✦</span> Experience
          </div>
          {experiences.map((e, i) => (
            <div key={i} className={`${i > 0 ? "mt-4 pt-4 border-t border-white/[.06]" : ""}`}>
              <div className="text-sm font-semibold text-white/90">{e.role}</div>
              <div className="text-xs text-white/40 mt-0.5">{e.company}</div>
              <div className="text-[0.68rem] text-accent/70 mt-1">{e.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
