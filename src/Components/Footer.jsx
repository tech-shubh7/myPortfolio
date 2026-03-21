import React from "react";
import { FaLinkedin,FaGithub } from "react-icons/fa6";

const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/shubhampatel8604", color: "#FF6B6B" },
  { name: "GitHub", icon: FaGithub, url: "https://github.com/tech-shubh7", color: "#2ECC71" },
];

function Footer() {
  return (
    <footer className="relative py-10 px-4 border-t border-white/5">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#FF6B6B]/40 to-transparent" />

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#9A9590] border border-white/5 transition-all duration-300 hover:-translate-y-1"
                style={{ "--hover-c": link.color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = link.color;
                  e.currentTarget.style.borderColor = `${link.color}40`;
                  e.currentTarget.style.boxShadow = `0 4px 15px ${link.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#9A9590]/60 tracking-wide">
          &copy; {new Date().getFullYear()}
          <span className="text-[#FF6B6B] mx-1">·</span>
          Built with &#10084; By Shubham Patel.
           </p>
      </div>
    </footer>
  );
}

export default Footer;
