import React, { useState, useEffect } from 'react';
import { useRouter, RoutePath } from '../../router';
import { sound } from '../../audio/soundEngine';
import { Network, Menu, X, Compass, BookOpen, Info } from 'lucide-react';
import { ReadingProgressBar } from '../layout/ReadingProgressBar';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: RoutePath) => {
    sound.playClick();
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navLinks: { label: string; path: RoutePath; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Monographs', path: '/articles/rip-routing-protocol', icon: BookOpen },
    { label: 'About', path: '/about', icon: Info },
  ];

  const isReadingArticle = currentPath === '/articles/rip-routing-protocol';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1E1E1C]/92 backdrop-blur-md border-b border-[#D8CBB3]/15 shadow-2xl py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        
        {/* Brandable Typography Wordmark with Hand-Drawn Sketch Accent */}
        <button
          onClick={() => handleNav('/')}
          className="group text-left focus:outline-none flex flex-col justify-center"
        >
          <div className="flex items-baseline gap-2 leading-none">
            <span className="font-sans uppercase tracking-[0.14em] text-sm sm:text-base font-extrabold text-[#FAF7F2] transition-colors group-hover:text-white">
              NETWORK
            </span>
            <span className="relative inline-block font-serif italic font-normal text-base sm:text-lg text-[#2F6BFF] transition-colors group-hover:text-[#4d82ff]">
              EXPLAINED
              {/* Hand-drawn golden sketch SVG underline overlapping bottom */}
              <svg
                className="absolute -bottom-0.5 left-0 w-[104%] h-2.5 overflow-visible pointer-events-none"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.2C18 2.2 44 6.8 68 3.5C80 1.8 90 4.2 99 2.8"
                  stroke="#C5A880"
                  strokeWidth="3.0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6.6C22 3.8 48 7.4 74 4.8C86 3.2 93 5.4 97 4.0"
                  stroke="#A8997C"
                  strokeWidth="1.8"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="text-[9px] uppercase font-mono tracking-[0.22em] text-[#A8997C] mt-2 font-medium">
            INTERACTIVE TECHNICAL MONOGRAPH
          </div>
        </button>

        {/* Symmetric Clean Top Navigation Pill matching Image 4 */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#141518]/90 backdrop-blur-md p-1.5 rounded-full border border-[#D8CBB3]/20 text-xs font-mono shadow-xl">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/articles' && currentPath.startsWith('/articles'));
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#18284B] border border-[#2F6BFF] text-white shadow-[0_0_14px_rgba(47,107,255,0.45)]'
                    : 'text-[#D8CBB3]/80 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2F6BFF]' : 'text-[#D8CBB3]/70'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Toggle (Only on small screens) */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#D8CBB3]/20 bg-[#181816] text-[#D8CBB3]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Reading Progress Bar when inside an article */}
      {isReadingArticle && <ReadingProgressBar />}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8CBB3]/20 bg-[#1E1E1C]/98 backdrop-blur-xl px-4 py-4 space-y-2 text-sm font-mono animate-fadeIn">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 text-white font-bold'
                    : 'border-[#D8CBB3]/15 bg-[#181816]/70 text-[#D8CBB3]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#2F6BFF]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
