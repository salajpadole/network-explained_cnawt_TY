import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, Network, BookOpen } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { ReadingProgressBar } from './ReadingProgressBar';
import { TableOfContentsModal } from './TableOfContentsModal';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isTOCActive, setIsTOCActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTOCActive(false);
      } else if (e.key === 't' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setIsTOCActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setIsMuted(!newState);
  };

  const scrollToSimulator = () => {
    const elem = document.getElementById('simulator');
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070A0F]/90 backdrop-blur-md border-b border-slate-800/80 shadow-subtle py-3'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Masthead Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-glow-cyan">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <a 
                href="#prologue"
                className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-sky-300 transition-colors flex items-center gap-2"
              >
                <span className="font-display uppercase tracking-widest text-xs sm:text-sm">NETWORK</span>
                <span className="font-serif italic font-normal text-sky-400">EXPLAINED</span>
              </a>
              <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-slate-400">
                <span>VOL. 01</span>
                <span>•</span>
                <span className="text-slate-300">ROUTING INFORMATION PROTOCOL</span>
                <span>•</span>
                <span className="text-emerald-400/90 font-medium">PEER-REVIEWED</span>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick jump to Simulator button */}
            <button
              onClick={scrollToSimulator}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:border-sky-500/50 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>RIP Simulator</span>
            </button>

            {/* Sound Synthesizer Toggle */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? "Enable Audio Synthesizer Feedback" : "Mute Audio Feedback"}
              aria-label="Toggle Sound Synthesizer"
              className={`p-2 rounded-lg border transition-all ${
                !isMuted 
                  ? 'border-sky-500/50 bg-sky-500/20 text-sky-300 shadow-glow-cyan' 
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Table of Contents Button */}
            <button
              onClick={() => setIsTOCActive(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-mono"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Index</span>
              <kbd className="hidden lg:inline text-[10px] px-1 bg-slate-800 rounded border border-slate-700 text-slate-400">T</kbd>
            </button>
          </div>
        </div>

        <ReadingProgressBar />
      </header>

      <TableOfContentsModal 
        isOpen={isTOCActive} 
        onClose={() => setIsTOCActive(false)} 
        activeSection={activeSection} 
      />
    </>
  );
};
