import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThreeBackground from "./components/ThreeBackground";
import useScrollReveal from "./hooks/useScrollReveal";

export default function App() {
  const cursorRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a,button,.project-card,.service-card");
    const enter = () => cursor.classList.add("grow");
    const leave = () => cursor.classList.remove("grow");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    /* nav active on scroll */
    const sections = document.querySelectorAll("section[id]");
    const navAs = document.querySelectorAll(".nav-links a");
    const onScroll = () => {
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) cur = s.id;
      });
      navAs.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + cur)
      );
      const nav = document.getElementById("navbar");
      if (nav) nav.style.background = window.scrollY > 20 ? "rgba(26,26,26,0.97)" : "rgba(26,26,26,0.92)";
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <ThreeBackground />
      <div className="cursor" ref={cursorRef}></div>
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
