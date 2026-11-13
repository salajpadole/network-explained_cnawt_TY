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
    { label: 'Monographs', path: '/articles', icon: BookOpen },
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
        
        {/* Publication Wordmark matching Image 4 */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#141518]/90 border border-[#2F6BFF]/50 flex items-center justify-center text-[#2F6BFF] group-hover:border-[#2F6BFF] transition-all shadow-[0_0_15px_rgba(47,107,255,0.25)]">
            <Network className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-[#D8CBB3] flex items-center gap-1.5">
              <span className="font-sans uppercase tracking-wider text-xs sm:text-sm font-extrabold text-[#F5EFE6]">NETWORK</span>
              <span className="font-serif italic font-normal text-[#2F6BFF]">EXPLAINED</span>
            </div>
            <div className="text-[9px] uppercase font-mono tracking-widest text-[#A8997C]">
              INTERACTIVE TECHNICAL MONOGRAPH
            </div>
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
