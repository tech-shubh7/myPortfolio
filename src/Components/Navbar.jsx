import React, { useEffect, useState } from 'react';

function Navbar({ menuOpen, setmenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0C0C0C]/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_2px_40px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold group">
            <span className="text-[#EDE8E3]">S</span>
            <span className="text-[#FF6B6B] group-hover:text-[#F6B93B] transition-colors duration-500">.</span>
            <span className="text-[#9A9590] text-base sm:text-lg ml-1 font-normal tracking-wide group-hover:text-[#EDE8E3] transition-colors duration-500">
              Patel
            </span>
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="w-8 h-8 z-40 lg:hidden flex flex-col justify-center items-center gap-1.5 cursor-pointer group"
            onClick={() => setmenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#EDE8E3] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#EDE8E3] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#EDE8E3] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-10">
            {['home', 'about', 'projects', 'contact'].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="nav-link-warm text-sm text-[#9A9590] hover:text-[#EDE8E3] transition-colors duration-300 tracking-wide"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
            <a
              href="/ShubhamResume.pdf"
              download="ShubhamResume.pdf"
              className="text-sm bg-[#FF6B6B] text-[#0C0C0C] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#F6B93B] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,107,107,0.3)]"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
