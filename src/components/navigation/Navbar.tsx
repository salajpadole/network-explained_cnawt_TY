import React, { useState, useEffect } from 'react';
import { useRouter, RoutePath } from '../../router';
import { sound } from '../../audio/soundEngine';
import { Network, Volume2, VolumeX, Menu, X, Compass, BookOpen, Info } from 'lucide-react';
import { ReadingProgressBar } from '../layout/ReadingProgressBar';
import { LiquidMetalButton } from '../../effects/liquid-metal-button/LiquidMetalButton';
import '../../effects/liquid-metal-button/styles.css';
import { LiquidMetalAction, LiquidButton } from '../buttons/LiquidMetalAction';

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
        
        {/* Publication Wordmark */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2F6BFF]/15 border border-[#2F6BFF]/40 flex items-center justify-center text-[#2F6BFF] group-hover:border-[#2F6BFF] transition-colors shadow-glow-electric">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-[#D8CBB3] flex items-center gap-1.5">
              <span className="font-display uppercase tracking-widest text-xs sm:text-sm font-black text-[#F5EFE6]">NETWORK</span>
              <span className="font-serif italic font-normal text-[#2F6BFF]">EXPLAINED</span>
            </div>
            <div className="hidden sm:block text-[9px] uppercase font-mono tracking-widest text-[#A8997C]">
              Interactive Technical Monograph
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#181816]/90 p-1.5 rounded-full border border-[#D8CBB3]/20 text-xs font-mono">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/articles' && currentPath.startsWith('/articles'));
            const Icon = item.icon;
            return (
              <LiquidButton
                key={item.path}
                variant="pill"
                isActive={isActive}
                onClick={() => handleNav(item.path)}
                className="px-4 py-1.5 text-xs font-mono"
                icon={<Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#2F6BFF]'}`} />}
              >
                {item.label}
              </LiquidButton>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge matching Relay: '● all systems normal' */}
          <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-[#121316]/90 border border-[#2F6BFF]/30 text-[#D8CBB3] shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-pulse shadow-glow-electric" />
            <span className="text-[#FAF7F2] font-semibold">STD 56</span>
            <span className="text-[#A8997C]">•</span>
            <span className="text-[#D8CBB3]/80">all systems normal</span>
          </div>

          {/* Direct Monograph Action */}
          {currentPath !== '/articles/rip-routing-protocol' && (
            <LiquidMetalAction
              text="Read Monograph"
              onClick={() => handleNav('/articles/rip-routing-protocol')}
              className="hidden lg:flex"
              width={160}
              height={46}
            />
          )}

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Enable Synthetic Audio Feedback" : "Mute Sound Synthesizer"}
            className={`p-2 rounded-lg border transition-all ${
              !isMuted
                ? 'border-[#2F6BFF] bg-[#2F6BFF]/25 text-[#2F6BFF] shadow-glow-electric'
                : 'border-[#D8CBB3]/20 bg-[#181816]/80 text-[#A8997C] hover:text-[#D8CBB3] hover:border-[#D8CBB3]/40'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[#D8CBB3]/20 bg-[#181816] text-[#D8CBB3]"
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
