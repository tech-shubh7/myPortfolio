import React from "react";

const sections = ["home", "about", "projects", "contact"];

function MobileMenu({ menuOpen, setmenuOpen }) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-[#0C0C0C]/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        menuOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Warm ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-56 h-56 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[25%] right-[20%] w-48 h-48 bg-[#F6B93B]/5 rounded-full blur-3xl" />
      </div>

      {/* Close */}
      <button
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[#9A9590] hover:text-[#FF6B6B] transition-all duration-300 hover:rotate-90"
        onClick={() => setmenuOpen(false)}
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Nav items */}
      <nav className="flex flex-col items-center space-y-10">
        {sections.map((section, i) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={() => setmenuOpen(false)}
            className={`text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? `${0.08 * i}s` : "0s",
              color: i === 0 ? '#FF6B6B' : i === 1 ? '#F6B93B' : i === 2 ? '#2ECC71' : '#EDE8E3',
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default MobileMenu;
