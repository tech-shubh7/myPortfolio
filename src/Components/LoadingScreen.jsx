import React, { useState, useEffect } from 'react';
import '../index.css';

function LoadingScreen({ onComplete }) {
  const [text, setText] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "<Hello, I'm Shubham Patel />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 700);
        }, 600);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0C0C0C] flex flex-col items-center justify-center transition-all duration-700 ${
        fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Concentric warm rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 sm:w-60 sm:h-60 border border-[#FF6B6B]/10 rounded-full animate-pulse-ring" />
        <div
          className="absolute w-56 h-56 sm:w-80 sm:h-80 border border-[#F6B93B]/8 rounded-full animate-pulse-ring"
          style={{ animationDelay: '0.6s' }}
        />
        <div
          className="absolute w-72 h-72 sm:w-[26rem] sm:h-[26rem] border border-[#2ECC71]/5 rounded-full animate-pulse-ring"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      {/* Small ember particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-ember pointer-events-none"
          style={{
            width: `${3 + i}px`,
            height: `${3 + i}px`,
            background:
              i % 3 === 0
                ? 'rgba(255,107,107,0.4)'
                : i % 3 === 1
                ? 'rgba(246,185,59,0.35)'
                : 'rgba(46,204,113,0.3)',
            top: `${25 + i * 10}%`,
            left: `${20 + i * 14}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${7 + i * 2}s`,
          }}
        />
      ))}

      {/* Typed text */}
      <div className="relative z-10 mb-10 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-center px-4">
        <span className="text-[#FF6B6B]">&lt;</span>
        <span className="text-[#EDE8E3]">{text.replace(/^< ?/, '').replace(/ ?\/>$/, '')}</span>
        <span className="text-[#F6B93B]"> /&gt;</span>
        <span className="animate-blink ml-1 text-[#FF6B6B]">_</span>
      </div>

      {/* Warm loading bar */}
      <div className="relative z-10 w-48 h-[3px] bg-white/5 rounded-full overflow-hidden">
        <div className="w-[35%] h-full rounded-full bg-gradient-to-r from-[#FF6B6B] via-[#F6B93B] to-[#2ECC71] shadow-[0_0_16px_rgba(255,107,107,0.5)] animate-sweep" />
      </div>

      <p className="relative z-10 mt-5 text-xs text-[#9A9590] tracking-[0.3em] uppercase">
        Warming up
      </p>
    </div>
  );
}

export default LoadingScreen;
