import { useState, useRef, useEffect } from "react";

const serviceIcons = {
  code: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  ai: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8"/></svg>`,
  voice: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>`,
  ui: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="4" rx="1"/><rect x="14" y="10" width="7" height="11" rx="1"/><rect x="3" y="13" width="7" height="8" rx="1"/></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
};

const serviceOptions = [
  { label: "Full-Stack Web Development", icon: serviceIcons.code },
  { label: "AI Automation Pipelines", icon: serviceIcons.ai },
  { label: "Voice AI / Conversational AI", icon: serviceIcons.voice },
  { label: "React.js UI Development", icon: serviceIcons.ui },
  { label: "GoHighLevel CRM & SEO", icon: serviceIcons.chart },
];

export default function Contact() {
  const [selected, setSelected] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendMsg = async () => {
    const n = document.getElementById("cName")?.value.trim();
    const e = document.getElementById("cEmail")?.value.trim();
    const m = document.getElementById("cMessage")?.value.trim();

    if (!n || !e || !m) {
      setSubmitStatus("validation");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // TODO: Replace with your actual Web3Forms access key
          access_key: "ef8c7c72-f0b7-4f3e-846b-d1cf6d19ff4e",
          name: n,
          email: e,
          service: selected || "General Inquiry",
          message: m,
          subject: `New Portfolio Inquiry from ${n}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        // Clear form
        document.getElementById("cName").value = "";
        document.getElementById("cEmail").value = "";
        document.getElementById("cMessage").value = "";
        setSelected("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-12 py-24 max-md:px-6" style={{ background: "rgba(26,26,26,0.88)" }}>
      <h2 className="text-center text-xs font-semibold tracking-[.2em] uppercase text-white/35 mb-2 reveal">Get In Touch</h2>
      <p className="text-center text-[clamp(1.6rem,3vw,2.2rem)] font-display font-bold mb-12 reveal reveal-delay-1">
        Let's work together
      </p>

      <div className="max-w-[600px] mx-auto flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="reveal reveal-delay-2">
            <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">Name</label>
            <input id="cName" type="text" placeholder="Your full name" className="form-input" />
          </div>
          <div className="reveal reveal-delay-2">
            <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">Email</label>
            <input id="cEmail" type="email" placeholder="example@email.com" className="form-input" />
          </div>
        </div>

        {/* Custom dropdown */}
        <div className="reveal reveal-delay-3" ref={dropRef}>
          <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">Service</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropOpen(!dropOpen)}
              className="w-full text-left bg-[rgba(31,31,31,.9)] border-[1.5px] border-white/[.12] rounded-lg px-4 py-[14px] text-sm transition-all duration-300 flex items-center justify-between hover:border-accent/40 focus:border-accent/50 focus:outline-none"
              style={{ color: selected ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.25)" }}
            >
              <span className="flex items-center gap-2.5">
                {selected ? (
                  <>
                    <span className="w-5 h-5 text-accent" dangerouslySetInnerHTML={{ __html: serviceOptions.find((s) => s.label === selected)?.icon }} />
                    {selected}
                  </>
                ) : (
                  "Select a service"
                )}
              </span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`}>
                <path d="M1 1.5L6 6.5L11 1.5" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/[.08] overflow-hidden z-20 transition-all duration-300 ${dropOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              style={{ background: "rgba(28,28,28,0.98)", backdropFilter: "blur(16px)", boxShadow: "0 16px 48px rgba(0,0,0,.5)" }}
            >
              {serviceOptions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => { setSelected(s.label); setDropOpen(false); }}
                  className={`w-full text-left px-4 py-3.5 flex items-center gap-3 text-sm transition-all duration-200 hover:bg-accent/[.08] ${selected === s.label ? "bg-accent/[.06] text-accent" : "text-white/60 hover:text-white/90"}`}
                >
                  <span className="w-5 h-5 shrink-0" style={{ color: selected === s.label ? '#4fc3f7' : 'rgba(255,255,255,.45)' }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                  <span>{s.label}</span>
                  {selected === s.label && (
                    <svg className="ml-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 3.5" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-3">
          <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">Message</label>
          <textarea id="cMessage" placeholder="Tell me about your project…" className="form-textarea min-h-[140px]"></textarea>
        </div>

        {submitStatus === "success" && (
          <div className="reveal p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center" style={{ animation: "fadeUp .3s ease both" }}>
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="reveal p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center" style={{ animation: "fadeUp .3s ease both" }}>
            Failed to send message. Please try again or email me directly.
          </div>
        )}
        {submitStatus === "validation" && (
          <div className="reveal p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm text-center flex items-center justify-center gap-2" style={{ animation: "fadeUp .3s ease both" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Please fill in your Name, Email, and Message before sending.
          </div>
        )}

        <button
          onClick={sendMsg}
          disabled={isSubmitting}
          className="reveal reveal-delay-4 w-full py-4 bg-gradient-to-r from-blue-600 to-accent text-white font-semibold rounded-xl text-sm tracking-wide hover:shadow-[0_6px_28px_rgba(41,121,255,.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Get in Touch"
          )}
        </button>
      </div>
    </section>
  );
}
