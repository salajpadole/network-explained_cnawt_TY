import React, { useState, useEffect } from 'react';
import { useRouter, RoutePath } from '../../router';
import { sound } from '../../audio/soundEngine';
import { Network, Volume2, VolumeX, Menu, X, Compass, FlaskConical, BookOpen, Info } from 'lucide-react';
import { ReadingProgressBar } from '../layout/ReadingProgressBar';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [isMuted, setIsMuted] = useState(true);
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

  const handleToggleSound = () => {
    const active = sound.toggle();
    setIsMuted(!active);
  };

  const navLinks: { label: string; path: RoutePath; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Articles', path: '/articles', icon: BookOpen },
    { label: 'Lab', path: '/lab', icon: FlaskConical },
    { label: 'About', path: '/about', icon: Info },
  ];

  const isReadingArticle = currentPath === '/articles/rip-routing-protocol';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/90 backdrop-blur-md border-b border-slate-800/80 shadow-subtle py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        
        {/* Publication Wordmark */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors shadow-glow-cyan">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              <span className="font-display uppercase tracking-widest text-xs sm:text-sm font-black">NETWORK</span>
              <span className="font-serif italic font-normal text-sky-400">EXPLAINED</span>
            </div>
            <div className="hidden sm:block text-[9px] uppercase font-mono tracking-widest text-slate-500">
              Interactive Technical Monograph
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950/70 p-1 rounded-full border border-slate-800/80 text-xs font-mono">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/articles' && currentPath.startsWith('/articles'));
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/40 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Lab CTA */}
          {currentPath !== '/lab' && (
            <button
              onClick={() => handleNav('/lab')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Lab</span>
            </button>
          )}

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Enable Synthetic Audio Feedback" : "Mute Sound Synthesizer"}
            className={`p-2 rounded-lg border transition-all ${
              !isMuted
                ? 'border-sky-500/50 bg-sky-500/20 text-sky-300 shadow-glow-cyan'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
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
        <div className="md:hidden border-b border-slate-800 bg-[#050811]/95 backdrop-blur-xl px-4 py-4 space-y-2 text-sm font-mono animate-fadeIn">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left ${
                  isActive
                    ? 'border-sky-500/50 bg-sky-950/40 text-sky-300 font-bold'
                    : 'border-slate-800/80 bg-slate-900/40 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-sky-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
