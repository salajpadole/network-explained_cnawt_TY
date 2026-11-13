import React from 'react';
import { X, BookOpen, Cpu, ShieldCheck, Binary, Terminal, BarChart2, HelpCircle, Compass } from 'lucide-react';

interface TOCModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export const CHAPTERS = [
  { id: 'prologue', num: '00', title: 'Prologue & The Routing Imperative', icon: Compass, time: '3 min' },
  { id: 'bellman-ford', num: '01', title: 'The Mathematical Engine: Bellman-Ford', icon: Cpu, time: '5 min' },
  { id: 'architecture', num: '02', title: 'RIP Architecture & Packet Dissection', icon: Binary, time: '6 min' },
  { id: 'metric-infinity', num: '03', title: 'The Hop Metric & The 15-Hop Frontier', icon: Compass, time: '4 min' },
  { id: 'timers', num: '04', title: 'Temporal Mechanics: The 4 Core Timers', icon: Compass, time: '5 min' },
  { id: 'loop-pathologies', num: '05', title: 'Count-to-Infinity & Loop Prevention', icon: ShieldCheck, time: '7 min' },
  { id: 'simulator', num: '06', title: 'Signature Experience: Network Simulator', icon: Cpu, time: 'Interactive' },
  { id: 'configuration', num: '07', title: 'Real-World Production Configuration', icon: Terminal, time: '5 min' },
  { id: 'comparative-crucible', num: '08', title: 'The Protocol Crucible: RIP vs OSPF vs BGP', icon: BarChart2, time: '6 min' },
  { id: 'mastery-quiz', num: '09', title: 'Technical Mastery Examination', icon: HelpCircle, time: '8 min' },
  { id: 'glossary', num: '10', title: 'Lexicon of Distributed Routing', icon: BookOpen, time: 'Reference' },
  { id: 'colophon', num: '11', title: 'Critical Apparatus & References', icon: BookOpen, time: 'Reference' },
];

export const TableOfContentsModal: React.FC<TOCModalProps> = ({ isOpen, onClose, activeSection }) => {
  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel-elevated rounded-2xl p-6 sm:p-8 border border-sky-500/20 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-sky-400 font-mono">Monograph Navigation</div>
            <h2 className="text-2xl font-serif text-slate-100 mt-1">Table of Contents & Chapters</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close table of contents"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTERS.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeSection === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group ${
                  isActive 
                    ? 'border-sky-500/60 bg-sky-950/30 text-sky-200 shadow-glow-cyan' 
                    : 'border-slate-800/70 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800/60 text-slate-400 group-hover:text-sky-300'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>CH {ch.num}</span>
                    <span>{ch.time}</span>
                  </div>
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white mt-0.5 line-clamp-1">
                    {ch.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Esc</kbd> to close</span>
          <span>12 Modules • Complete Academic Edition</span>
        </div>
      </div>
    </div>
  );
};
