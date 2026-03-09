import React, { useRef, useState, useEffect } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import devconnect from "../assets/Devconnect.png";
import Portfolio from "../assets/Portfolio.png";
import Buynow from "../assets/buynow.png";

const projectsData = [
  {
    id: 1,
    title: "DevConnect",
    description: "A full-stack developer networking platform enabling seamless collaboration, profile discovery, and real-time connections — powered by the MERN stack with a responsive Tailwind CSS interface.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    githubUrl: "https://github.com/tech-shubh7/DevConnectFE.git",
    liveUrl: "#",
    imageUrl: devconnect,
  },
  {
    id: 2,
    title: "BuyNow",
    description: "A feature-rich e-commerce platform offering product browsing, cart management, secure checkout, and order tracking — built with a MERN stack architecture and a polished Tailwind UI.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind"],
    githubUrl: "https://github.com/tech-shubh7/buynow.git",
    liveUrl: "#",
    imageUrl: Buynow,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A visually engaging personal portfolio featuring interactive 3D tilt effects, smooth scroll-driven animations, and a fully responsive layout — crafted with React, Tailwind CSS, and Vite.",
    technologies: ["React.js", "Tailwind CSS", "Vite", "EmailJS"],
    githubUrl: "https://github.com/tech-shubh7/myPortfolio.git",
    liveUrl: "https://shubhamptl.netlify.app/",
    imageUrl: Portfolio,
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const accentColor = index % 3 === 0 ? "#FF6B6B" : index % 3 === 1 ? "#F6B93B" : "#2ECC71";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-800"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div
        className="glass-warm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          boxShadow: tilt.x || tilt.y ? `${-tilt.x * 2}px ${tilt.y * 2}px 30px rgba(0,0,0,0.3)` : "none",
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-70" />
          {/* Overlay links */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0C0C0C]/80 flex items-center justify-center text-[#EDE8E3] hover:text-[#FF6B6B] transition-colors border border-white/10"
            >
              <FiGithub size={18} />
            </a>
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0C0C0C]/80 flex items-center justify-center text-[#EDE8E3] hover:text-[#F6B93B] transition-colors border border-white/10"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
            <h3 className="text-lg font-semibold text-[#EDE8E3] group-hover:text-[#FF6B6B] transition-colors">
              {project.title}
            </h3>
          </div>
          <p className="text-sm text-[#9A9590] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-0.5 rounded-full border border-white/6 text-[#9A9590] bg-white/3"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`min-h-screen py-24 px-4 sm:px-6 relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-[#9A9590]/40 text-xs font-mono tracking-wider mb-4">
            <span className="text-[#2ECC71]/50">// things I&apos;ve built</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E3] mb-4">
            Projects<span className="text-[#F6B93B]">.</span>
          </h2>
          <div className="w-12 h-0.5 mx-auto rounded-full bg-gradient-to-r from-[#F6B93B] to-[#2ECC71]" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
