import React from 'react';
import { Colophon } from '../components/layout/Colophon';
import { Info, Award, ShieldCheck, Terminal, Compass, Bookmark, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative text-slate-100 bg-[#050811] min-h-screen pt-28 sm:pt-36 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-16 mb-16">
        
        {/* Header */}
        <div className="pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
            <Info className="w-4 h-4" />
            <span>Editorial Institution & Methodology</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            About NETWORK EXPLAINED
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-400 font-serif italic max-w-3xl leading-relaxed">
            An open educational publication exploring foundational internet protocols through high-craft creative development, mathematical rigor, and interactive digital laboratories.
          </p>
        </div>

        {/* Core Principles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Editorial Craft</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Rejecting generic software dashboards and repetitive blog templates in pursuit of long-form typography, considered negative space, and typographic beauty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Technical Accuracy</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Every formula, metric limitation, and timer duration is grounded in primary IETF RFC standards and peer-reviewed computer science literature.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white">Interactive Physics</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Replacing static screenshots with deterministic simulators that compute live Bellman-Ford exchanges and demonstrate failure modes.
            </p>
          </div>
        </div>

        {/* Academic Context */}
        <div className="mt-12 p-8 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          <h2 className="text-xl font-serif text-white">Curriculum Context & Authorship</h2>
          <p>
            This publication was engineered as part of the <strong>Computer Networks and Web Technology (CNAWT)</strong> academic tutorial and research track.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Author & Creative Engineer:</span>
              <strong className="text-white text-sm">Salaj Padole</strong>
              <div className="text-slate-400">Roll No: 43 • PRN: 12412336</div>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px]">Institutional Affiliation:</span>
              <strong className="text-white text-sm">Department of Computer Networks</strong>
              <div className="text-emerald-400 font-bold">Volume 01: The Routing Information Protocol</div>
            </div>
          </div>
        </div>

      </div>

      {/* Complete Colophon Apparatus */}
      <Colophon />
    </div>
  );
};
