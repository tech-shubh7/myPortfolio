import React, { useRef, useState, useEffect } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import devconnect from "../assets/Devconnect.png";
import Buynow from "../assets/buynow.png";

const projectsData = [
  {
    id: 1,
    title: "BuyNow",
    description:
      "Built a full-stack e-commerce platform using React, Redux Toolkit, Node.js, Express, and MongoDB with JWT and Google authentication. Features a complete shopping flow (browsing, categories, cart, wishlist, checkout, order tracking) and an admin dashboard for product and order management.",
    technologies: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Cloudinary"],
    githubUrl: "https://github.com/tech-shubh7/buynow.git",
    liveUrl: "#",
    imageUrl: Buynow,
  },
  {
    id: 2,
    title: "DevConnect",
    description:
      "Built a developer networking platform using React, Redux, and Tailwind CSS for connecting and interacting with other developers. Features user authentication, profiles, real-time messaging, and reusable responsive components.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/tech-shubh7/DevConnectFE.git",
    liveUrl: "#",
    imageUrl: devconnect,
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

  const accentColor = index % 2 === 0 ? "#FF6B6B" : "#F6B93B";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-800"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div
        className="glass-warm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col justify-between"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          boxShadow: tilt.x || tilt.y ? `${-tilt.x * 2}px ${tilt.y * 2}px 30px rgba(0,0,0,0.3)` : "none",
        }}
      >
        <div>
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-70" />
            {/* Overlay links */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0C0C0C]/80 flex items-center justify-center text-[#EDE8E3] hover:text-[#FF6B6B] transition-colors border border-white/10"
                >
                  <FiGithub size={18} />
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
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
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
                <h3 className="text-xl font-semibold text-[#EDE8E3] group-hover:text-[#FF6B6B] transition-colors">
                  {project.title}
                </h3>
              </div>
              {/* Always-visible icon links */}
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-[#9A9590] hover:text-[#FF6B6B] transition-colors border border-white/8"
                    title="View GitHub Repository"
                  >
                    <FiGithub size={15} />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-[#9A9590] hover:text-[#F6B93B] transition-colors border border-white/8"
                    title="Live Demo"
                  >
                    <FiExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm text-[#9A9590] leading-relaxed mb-5">
              {project.description}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full border border-white/6 text-[#9A9590] bg-white/3 font-medium"
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
            <span className="text-[#2ECC71]/50">// personal projects</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E3] mb-4">
            Projects<span className="text-[#F6B93B]">.</span>
          </h2>
          <div className="w-12 h-0.5 mx-auto rounded-full bg-gradient-to-r from-[#F6B93B] to-[#2ECC71]" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
