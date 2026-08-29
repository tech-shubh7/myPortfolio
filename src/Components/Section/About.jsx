import React, { useEffect, useRef, useState, useCallback } from "react";

/* ───── Flat skill list */
const allSkills = [
  // LANGUAGES
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    cat: "lang",
    level: 80,
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    cat: "lang",
    level: 85,
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    cat: "lang",
    level: 90,
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    cat: "lang",
    level: 70,
  },
  {
    name: "SQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    cat: "lang",
    level: 80,
  },

  // BACKEND
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    cat: "back",
    level: 90,
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    cat: "back",
    level: 90,
  },
  {
    name: "Fastify",
    logo: "https://cdn.simpleicons.org/fastify",
    cat: "back",
    level: 75,
  },
  {
    name: "FastAPI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    cat: "back",
    level: 80,
  },
  {
    name: "Sequelize",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg",
    cat: "back",
    level: 85,
  },
  {
    name: "Prisma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    cat: "back",
    level: 80,
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    cat: "back",
    level: 82,
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    cat: "back",
    level: 85,
  },
  {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    cat: "back",
    level: 80,
  },

  // AI ENGINEERING
  {
    name: "LangChain",
    logo: "/icons/langchain.png",
    cat: "ai",
    level: 85,
  },
  {
    name: "LangGraph",
    logo: "/icons/langgraph.png",
    cat: "ai",
    level: 82,
  },
  {
    name: "RAG",
    logo: "/icons/rag.svg",
    cat: "ai",
    level: 88,
  },
  {
    name: "LLM Agents",
    logo: "/icons/llm-agents.svg",
    cat: "ai",
    level: 85,
  },
  {
    name: "Tool Calling",
    logo: "/icons/tool-calling.svg",
    cat: "ai",
    level: 84,
  },
  {
    name: "Query Rewriting",
    logo: "/icons/query-rewriting.svg",
    cat: "ai",
    level: 82,
  },
  {
    name: "Re-ranking",
    logo: "/icons/re-ranking.svg",
    cat: "ai",
    level: 80,
  },
  {
    name: "Langfuse",
    logo: "/icons/langfuse.png",
    cat: "ai",
    level: 75,
  },

  // FRONTEND
  {
    name: "React.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    cat: "front",
    level: 88,
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    cat: "front",
    level: 82,
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    cat: "front",
    level: 86,
  },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    cat: "front",
    level: 90,
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    cat: "front",
    level: 85,
  },

  // TOOLS / INFRASTRUCTURE
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    cat: "tools",
    level: 75,
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    cat: "tools",
    level: 88,
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    cat: "tools",
    level: 88,
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    cat: "tools",
    level: 85,
  },
  {
    name: "RabbitMQ",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg",
    cat: "tools",
    level: 76,
  },
  {
    name: "BullMQ",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    cat: "tools",
    level: 78,
  },
  {
    name: "ARQ",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    cat: "tools",
    level: 78,
  },
];

const tabs = [
  { key: "all", label: "All" },
  { key: "lang", label: "Languages" },
  { key: "back", label: "Backend" },
  { key: "ai", label: "AI Engineering" },
  { key: "front", label: "Frontend" },
  { key: "tools", label: "Tools / Infrastructure" },
];

const educationData = [
  {
    degree: "B.Tech in Information Technology",
    school: "Gujarat Technological University (GTU)",
    location: "Ahmedabad, India",
    years: "2022 – 2026",
    grade: "CGPA: 9.10",
    color: "#FF6B6B",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    school: "New Education High School",
    location: "Gujarat, India",
    years: "2021 – 2022",
    grade: "80%",
    color: "#F6B93B",
  },
];

const workData = [
  {
    role: "Software Developer",
    company: "KrishaWeb Technologies Pvt Ltd",
    location: "Ahmedabad, India",
    period: "Apr. 2026 – Present",
    bullets: [
      "Built Node.js microservices for admin, subscription, and user services, and moved email tasks to the background to speed up API responses.",
      "Developed an Enterprise Policy AI with LangChain, using query rewriting and re-ranking to improve the quality of policy-related answers.",
      "Moved the HRMS Agent from LangChain to LangGraph and switched from GPT-4o to GPT-5.6 Luna, cutting LLM costs by 92% while improving answer accuracy.",
    ],
  },
  {
    role: "Web Developer Trainee",
    company: "KrishaWeb Technologies Pvt Ltd",
    location: "Ahmedabad, India",
    period: "Jan. 2026 – Apr. 2026",
    bullets: [
      "Developed a Blog Management System using JavaScript, HTML, CSS, and DOM manipulation for managing blog content and user interactions.",
      "Built a Library Management System using core PHP to manage books, users, and library operations.",
      "Worked with PHP, JavaScript, HTML, CSS, and SQL while building and maintaining web applications.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Tech Elecon Pvt. Ltd.",
    location: "Anand, India",
    period: "Jun. 2025 – Jul. 2025",
    bullets: [
      "Built and maintained an HRMS (Human Resource Management System) for employee data and attendance tracking.",
      "Implemented custom React hooks, Context API, and structured state management for application features.",
      "Improved component reuse and simplified the structure of the frontend codebase.",
    ],
  },
];

const catColors = {
  lang: "#FF6B6B",
  back: "#2ECC71",
  ai: "#F6B93B",
  front: "#FF9F43",
  tools: "#EDE8E3",
};

/* ─────── 3D Skill Card ─────── */
function SkillCard3D({ skill, visible, i }) {
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const color = catColors[skill.cat] || "#FF6B6B";

  const handleMouse = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || flipped) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 22;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -22;
      el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.06)`;
    },
    [flipped],
  );

  const resetMouse = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (!flipped)
      el.style.transform = "perspective(600px) rotateY(0) rotateX(0) scale(1)";
    setFlipped(false);
  }, [flipped]);

  const levelLabel =
    skill.level >= 85
      ? "Advanced"
      : skill.level >= 70
        ? "Proficient"
        : skill.level >= 55
          ? "Intermediate"
          : "Learning";

  return (
    <div
      className="relative h-36 sm:h-40 cursor-pointer"
      style={{
        perspective: "800px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms`,
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped
            ? "perspective(600px) rotateY(180deg)"
            : "perspective(600px) rotateY(0)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2.5 border border-white/[0.06] overflow-hidden p-2 text-center"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              boxShadow: `inset 0 0 20px ${color}08, 0 0 25px ${color}06`,
            }}
          />
          {/* Floating shimmer line */}
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div
              className="h-full w-1/3 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
                animation: `shimmer-slide 3s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          </div>

          <img
            src={skill.logo}
            alt={skill.name}
            className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-lg object-contain"
          />
          <span className="text-[#EDE8E3] text-xs sm:text-sm font-semibold tracking-wide truncate max-w-full">
            {skill.name}
          </span>

          {/* Level dots */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, d) => (
              <div
                key={d}
                className="w-1.5 h-1.5 rounded-full transition-all duration-700"
                style={{
                  background:
                    d < Math.round(skill.level / 20)
                      ? color
                      : "rgba(255,255,255,0.08)",
                  boxShadow:
                    d < Math.round(skill.level / 20)
                      ? `0 0 6px ${color}40`
                      : "none",
                  transitionDelay: visible ? `${i * 70 + d * 100}ms` : "0ms",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 border p-4 text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${color}30`,
            background: `linear-gradient(135deg, ${color}10, rgba(12,12,12,0.95))`,
          }}
        >
          <span className="text-[#EDE8E3] text-sm font-bold truncate max-w-full">{skill.name}</span>
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mt-1">
            <div
              className="h-full rounded-full"
              style={{
                width: `${skill.level}%`,
                background: `linear-gradient(90deg, ${color}, ${color}90)`,
                boxShadow: `0 0 10px ${color}30`,
              }}
            />
          </div>
          <span className="text-xs font-mono mt-1" style={{ color }}>
            {skill.level}%
          </span>
          <span className="text-[10px] text-[#9A9590] uppercase tracking-widest">
            {levelLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

function About() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [gridTilt, setGridTilt] = useState({ x: 0, y: 0 });
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const rafId = useRef(null);
  const currentHeight = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Scroll-driven timeline line — direct DOM for smooth animation */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!timelineRef.current || !lineRef.current || !dotRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrolledInto = viewportH - rect.top;
      const totalHeight = rect.height;

      let pct = 0;
      if (scrolledInto <= 0) pct = 0;
      else if (scrolledInto >= totalHeight) pct = 100;
      else pct = (scrolledInto / totalHeight) * 100;

      // Smooth lerp towards target
      currentHeight.current += (pct - currentHeight.current) * 0.15;
      const h = currentHeight.current;

      // Update line
      lineRef.current.style.height = `${h}%`;

      // Update dot
      const color = h < 50 ? "#FF6B6B" : h < 80 ? "#F6B93B" : "#2ECC71";
      dotRef.current.style.top = `calc(8px + ${h}% - 3.5px)`;
      dotRef.current.style.background = color;
      dotRef.current.style.boxShadow = `0 0 10px ${color}60`;
      dotRef.current.style.opacity = h > 0 ? "1" : "0";

      // Update cards
      const count = cardRefs.current.length;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const threshold = ((i + 0.5) / count) * 100;
        const vis = h >= threshold;
        card.style.opacity = vis ? "1" : "0.15";
        card.style.transform = vis ? "translateX(0)" : "translateX(-12px)";
        const dotEl = dotRefs.current[i];
        if (dotEl) {
          const dc = i === 0 ? "#FF6B6B" : i === 1 ? "#F6B93B" : "#2ECC71";
          dotEl.style.borderColor = vis ? dc : "rgba(255,255,255,0.1)";
          dotEl.style.background = vis ? `${dc}25` : "transparent";
          dotEl.style.boxShadow = vis ? `0 0 10px ${dc}30` : "none";
        }
      });

      // Keep looping for lerp smoothness
      if (Math.abs(pct - currentHeight.current) > 0.1) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleGridMouse = useCallback((e) => {
    if (!gridRef.current) return;
    const r = gridRef.current.getBoundingClientRect();
    setGridTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 6,
      y: ((e.clientY - r.top) / r.height - 0.5) * -6,
    });
  }, []);

  const resetGridTilt = useCallback(() => setGridTilt({ x: 0, y: 0 }), []);

  const filtered =
    activeTab === "all"
      ? allSkills
      : allSkills.filter((s) => s.cat === activeTab);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`min-h-screen py-24 px-4 sm:px-6 relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-[#9A9590]/40 text-xs font-mono tracking-wider mb-4">
            <span className="text-[#FF6B6B]/50">&lt;</span>About{" "}
            <span className="text-[#F6B93B]/50">className</span>=
            <span className="text-[#2ECC71]/50">&quot;me&quot;</span>
            <span className="text-[#FF6B6B]/50">&gt;</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E3] mb-4">
            About<span className="text-[#FF6B6B]">.</span>
          </h2>
          <div className="w-12 h-0.5 mx-auto rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#F6B93B]" />
        </div>

        {/* ════════ SKILLS 3D ════════ */}
        <div className="mb-24">
          <h3 className="text-xl font-semibold text-[#EDE8E3] mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#F6B93B]" />
            Technical Skills
            <span className="text-xs font-mono text-[#9A9590]/30 font-normal ml-2">
              // what I work with
            </span>
          </h3>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((t) => {
              const isActive = activeTab === t.key;
              const accent =
                t.key === "all" ? "#FF6B6B" : catColors[t.key] || "#FF6B6B";
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className="relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-400 border"
                  style={{
                    color: isActive ? "#0C0C0C" : "#9A9590",
                    background: isActive ? accent : "rgba(255,255,255,0.02)",
                    borderColor: isActive ? accent : "rgba(255,255,255,0.06)",
                    boxShadow: isActive ? `0 4px 20px ${accent}25` : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* 3D Perspective Grid */}
          <div
            ref={gridRef}
            onMouseMove={handleGridMouse}
            onMouseLeave={resetGridTilt}
            className="relative"
            style={{
              perspective: "1200px",
            }}
          >
            {/* Ambient glow behind grid */}
            <div
              className="absolute inset-0 -z-10 rounded-3xl opacity-30 blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${catColors[activeTab === "all" ? "lang" : activeTab] || "#FF6B6B"}12, transparent 70%)`,
              }}
            />

            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${gridTilt.x}deg) rotateX(${gridTilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {filtered.map((skill, i) => (
                <SkillCard3D
                  key={skill.name}
                  skill={skill}
                  visible={visible}
                  i={i}
                />
              ))}
            </div>
          </div>

          {/* Skill count */}
          <p className="text-xs text-[#9A9590]/40 font-mono mt-4 text-center">
            {filtered.length} skill{filtered.length !== 1 ? "s" : ""} loaded
          </p>
        </div>

        {/* Education */}
        <div className="mb-24">
          <h3 className="text-xl font-semibold text-[#EDE8E3] mb-10 flex items-center gap-3">
            <span className="w-6 h-px bg-[#2ECC71]" />
            Education
            <span className="text-xs font-mono text-[#9A9590]/30 font-normal ml-2">
              // where I studied
            </span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {educationData.map((ed, i) => (
              <div
                key={i}
                className="glass-warm rounded-xl p-6 border-l-2 transition-all duration-300 hover:-translate-y-1"
                style={{ borderLeftColor: ed.color }}
              >
                <h4 className="text-[#EDE8E3] font-semibold mb-1">
                  {ed.degree}
                </h4>
                <p className="text-[#9A9590] text-sm">{ed.school}</p>
                <p className="text-xs text-[#9A9590]/70 font-mono mt-1">{ed.location}</p>
                <div className="flex items-center justify-between mt-4 text-xs">
                  <span className="text-[#9A9590]">{ed.years}</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[#EDE8E3] text-xs font-medium"
                    style={{ background: `${ed.color}20`, color: ed.color }}
                  >
                    {ed.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="text-xl font-semibold text-[#EDE8E3] mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[#FF6B6B]" />
            Work Experience
            <span className="text-xs font-mono text-[#9A9590]/30 font-normal ml-2">
              // professional background
            </span>
          </h3>

          {/* Experience positioning summary chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["Backend & AI: Current", "Full Stack: Practical Experience", "Frontend: Internship"].map((chip) => (
              <span
                key={chip}
                className="text-xs px-3.5 py-1.5 rounded-full border border-[#FF6B6B]/20 bg-[#FF6B6B]/5 text-[#EDE8E3] font-medium"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Timeline track (dim background) */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />
            {/* Animated fill line */}
            <div
              ref={lineRef}
              className="absolute left-[7px] top-2 w-px origin-top"
              style={{
                height: "0%",
                background:
                  "linear-gradient(to bottom, #FF6B6B, #F6B93B, #2ECC71)",
                boxShadow:
                  "0 0 8px rgba(255,107,107,0.3), 0 0 20px rgba(255,107,107,0.1)",
                willChange: "height",
              }}
            />
            {/* Glowing dot at line tip */}
            <div
              ref={dotRef}
              className="absolute left-[4px] w-[7px] h-[7px] rounded-full pointer-events-none"
              style={{
                top: "8px",
                opacity: 0,
                willChange: "top, opacity",
              }}
            />

            <div className="space-y-10 pl-8">
              {workData.map((w, i) => {
                return (
                  <div
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className="relative"
                    style={{
                      opacity: 0.15,
                      transform: "translateX(-12px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                  >
                    {/* Dot */}
                    <div
                      ref={(el) => (dotRefs.current[i] = el)}
                      className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2"
                      style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        background: "transparent",
                        boxShadow: "none",
                        transition:
                          "border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
                      }}
                    />
                    <div className="glass-warm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <h4 className="text-[#EDE8E3] font-semibold text-base sm:text-lg">
                          {w.role}
                        </h4>
                        <span className="text-xs text-[#9A9590] font-mono">
                          {w.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <p className="text-[#F6B93B] text-sm font-medium">
                          {w.company}
                        </p>
                        {w.location && (
                          <span className="text-xs text-[#9A9590]/70 font-mono">
                            {w.location}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2 text-sm text-[#9A9590] leading-relaxed">
                        {w.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#FF6B6B] mt-1 text-xs">&#9656;</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
