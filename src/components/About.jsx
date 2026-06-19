export default function About() {
  const experiences = [
    { role: "AI Developer", company: "DBTronics.org — Canada (Remote)", date: "Jan 2026 – Present" },
    { role: "Full-Stack Web Developer", company: "Cogxioms — Pakistan", date: "2025" },
  ];

  return (
    <section id="about" className="px-12 py-24 max-md:px-6" style={{ background: "rgba(248,249,252,0.95)" }}>
      <h2 className="text-center text-xs font-semibold tracking-[.2em] uppercase text-slate-400 mb-2 reveal">About Me</h2>
      <p className="text-center text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold mb-12 reveal reveal-delay-1">
        <span className="text-slate-400">Get to</span> <span className="text-slate-800">know me</span>
      </p>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bio */}
        <div className="about-card bg-white border border-slate-200/80 rounded-2xl p-7 reveal shadow-sm">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-indigo-500 mb-4">Know who am I</h3>
          <p className="text-slate-500 leading-relaxed text-sm mb-3">
            I'm <span className="text-slate-800 font-medium">Abubakar Waseem</span>, a results-driven AI Automation Engineer & Full-Stack Developer delivering production-grade AI pipelines, CRM automation systems, and
            scalable MERN web applications for clients across{" "}
            <span className="text-slate-800">Canada</span> and globally.
          </p>
          <p className="text-slate-500 leading-relaxed text-sm mb-3">
            Expert at integrating LLMs, Voice AI, REST APIs, and distributed webhook architectures to eliminate operational overhead and accelerate measurable business growth.
          </p>
          <p className="text-slate-500 leading-relaxed text-sm mb-5">
            Whether it's engineering a Voice AI receptionist that eliminates 100% of manual call handling, or building a multi-agent patient monitoring platform — I turn complex problems into{" "}
            <span className="text-slate-800">elegant, scalable solutions</span> that deliver measurable business impact.
          </p>
          <a href="/Abubakar Resume (1).pdf" download="Abubakar_Resume.pdf" className="text-indigo-500 text-sm font-semibold hover:underline">Download Resume →</a>
        </div>

        {/* Experience */}
        <div className="about-card bg-white border border-slate-200/80 rounded-2xl p-7 reveal reveal-delay-1 shadow-sm">
          <div className="text-[0.72rem] font-semibold tracking-[.1em] uppercase text-indigo-500 mb-4 flex items-center gap-1.5">
            <span>✦</span> Experience
          </div>
          {experiences.map((e, i) => (
            <div key={i} className={`${i > 0 ? "mt-4 pt-4 border-t border-slate-100" : ""}`}>
              <div className="text-sm font-semibold text-slate-800">{e.role}</div>
              <div className="text-xs text-slate-400 mt-0.5">{e.company}</div>
              <div className="text-[0.68rem] text-indigo-400 mt-1">{e.date}</div>
            </div>
          ))}

          {/* Education */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="text-[0.72rem] font-semibold tracking-[.1em] uppercase text-indigo-500 mb-4 flex items-center gap-1.5">
              <span>✦</span> Education
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">BS Computer Science</div>
              <div className="text-xs text-slate-400 mt-0.5">FAST – National University of Computer & Emerging Sciences</div>
              <div className="text-[0.68rem] text-indigo-400 mt-1">2022 – 2026</div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="text-sm font-semibold text-slate-800">A Levels</div>
              <div className="text-[0.68rem] text-indigo-400 mt-1">2019 – 2021</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
