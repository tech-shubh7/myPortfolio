import React, { useState, useEffect, useRef } from "react";
import DSIMG from "../assets/myphoto.jpeg";

const dynamicTexts = [
  "Aspiring SDE",
  "Full Stack Developer",
  "MERN Stack Engineer",
  "Competitive Programmer",
  "Problem Solver",
  "Tech Enthusiast",
  "IT Engineering Student",
  "System Design Learner",
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayedText.length < dynamicTexts[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText(dynamicTexts[currentIndex].slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
      } else {
        setTyping(true);
        setCurrentIndex((prev) => (prev + 1) % dynamicTexts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, typing, currentIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 16,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 16,
      });
    };
    const section = sectionRef.current;
    if (section) section.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (section) section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center pt-28 sm:pt-32 lg:pt-24 pb-12 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Floating ember particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-ember pointer-events-none"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background:
              i % 3 === 0
                ? "rgba(255,107,107,0.3)"
                : i % 3 === 1
                ? "rgba(246,185,59,0.25)"
                : "rgba(46,204,113,0.25)",
            top: `${5 + i * 9}%`,
            left: `${2 + i * 10}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${6 + i * 1.2}s`,
          }}
        />
      ))}

      {/* Decorative corner accents */}
      <div className="absolute top-20 left-6 w-16 h-px bg-gradient-to-r from-[#FF6B6B]/30 to-transparent hidden lg:block" />
      <div className="absolute top-20 left-6 w-px h-16 bg-gradient-to-b from-[#FF6B6B]/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-12 right-6 w-16 h-px bg-gradient-to-l from-[#F6B93B]/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-12 right-6 w-px h-16 bg-gradient-to-t from-[#F6B93B]/20 to-transparent hidden lg:block" />

      {/* Left — text */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative z-10">
        <div className="text-center lg:text-left max-w-2xl space-y-6 animate-slide-in">
          {/* Status badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2ECC71]/20 bg-[#2ECC71]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
              <span className="text-[#9A9590] text-xs sm:text-sm tracking-wide">Available for work</span>
            </div>
          </div>

          {/* Code-style flair */}
          <p className="text-[#9A9590]/50 text-xs sm:text-sm font-mono tracking-wider">
            <span className="text-[#FF6B6B]/60">const</span> developer <span className="text-[#FF6B6B]/60">=</span> <span className="text-[#F6B93B]/70">&quot;who ships&quot;</span><span className="text-[#9A9590]/40">;</span>
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            <span className="text-[#EDE8E3]">Hi, I&apos;m</span>
            <br />
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#E85D5D] to-[#FF6B6B] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-march">Shubham</span>
            <span className="text-[#F6B93B]"> Patel</span>
          </h1>

          <h2 className="text-base sm:text-2xl md:text-3xl font-medium min-h-[2rem] sm:min-h-[2.5rem] break-words">
            <span className="text-[#F6B93B] font-semibold">
              {displayedText}
              <span className="animate-blink ml-0.5 border-r-2 border-[#F6B93B] text-transparent">|</span>
            </span>
          </h2>

          <p className="text-[#9A9590] text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
            Full-stack developer specializing in building high-performance web
            applications with the MERN stack. Passionate about writing clean,
            scalable code and crafting seamless user experiences — with a keen
            interest in AI and intelligent systems.
          </p>

          {/* Current status line */}
          <p className="text-[#9A9590]/40 text-xs font-mono tracking-wider">
            <span className="text-[#2ECC71]/60">// currently:</span> exploring AI &amp; intelligent systems
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-2">
            <a
              href="#projects"
              className="group relative bg-[#FF6B6B] text-[#0C0C0C] font-semibold px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,107,107,0.3)] text-xs sm:text-base overflow-hidden"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#E85D5D] to-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              className="border border-[#F6B93B]/30 text-[#F6B93B] px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-[#F6B93B]/8 hover:border-[#F6B93B]/50 hover:shadow-[0_8px_25px_rgba(246,185,59,0.1)] text-xs sm:text-base"
            >
              Contact Me
            </a>
            <a
              href="/ShubhamResume.pdf"
              download="ShubhamResume.pdf"
              className="border border-white/8 text-[#9A9590] px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:text-[#EDE8E3] hover:border-white/15 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] text-xs sm:text-base"
            >
              Resume &darr;
            </a>
          </div>
        </div>
      </div>

      {/* Right — 3D photo */}
      <div className="w-full lg:w-1/2 mt-14 lg:mt-0 flex justify-center items-center relative z-10 perspective-1200">
        <div className="relative">
          {/* Warm glow behind */}
          <div className="absolute inset-[-35px] rounded-full bg-gradient-to-br from-[#FF6B6B]/15 via-[#F6B93B]/10 to-[#2ECC71]/8 blur-3xl animate-warm-glow" />

          {/* Orbiting rings */}
          <div className="absolute inset-[-14px] rounded-full border border-[#FF6B6B]/10 animate-orbit" />
          <div
            className="absolute inset-[-26px] rounded-full border border-dashed border-[#F6B93B]/6 animate-orbit"
            style={{ animationDirection: 'reverse', animationDuration: '40s' }}
          />
          <div
            className="absolute inset-[-38px] rounded-full border border-dotted border-[#2ECC71]/4 animate-orbit"
            style={{ animationDuration: '55s' }}
          />

          {/* Floating tech badges around photo */}
          {[
            { label: "React", top: "5%", left: "-15%", color: "#FF6B6B" },
            { label: "Node", top: "70%", left: "-12%", color: "#2ECC71" },
            { label: "MongoDB", top: "15%", right: "-18%", color: "#F6B93B" },
            { label: "JS", bottom: "5%", right: "-10%", color: "#F6B93B" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="absolute hidden sm:flex items-center px-2.5 py-1 rounded-full border text-[10px] font-medium animate-drift pointer-events-none"
              style={{
                top: badge.top,
                left: badge.left,
                right: badge.right,
                bottom: badge.bottom,
                borderColor: `${badge.color}25`,
                color: `${badge.color}90`,
                background: `${badge.color}08`,
              }}
            >
              {badge.label}
            </div>
          ))}

          <img
            src={DSIMG}
            alt="Shubham Patel"
            className="relative rounded-full w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-76 lg:h-76 xl:w-80 xl:h-80 object-cover object-top-right shadow-[0_0_60px_rgba(255,107,107,0.12)] border-2 border-[#FF6B6B]/15 transition-all duration-500 hover:border-[#F6B93B]/35 hover:shadow-[0_0_80px_rgba(246,185,59,0.15)]"
            style={{
              transform: `rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
              transition: "transform 0.12s ease-out",
            }}
          />

          {/* Bottom floating label */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 glass-warm rounded-full px-5 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
            <span className="text-xs text-[#9A9590] whitespace-nowrap">Building something cool</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
