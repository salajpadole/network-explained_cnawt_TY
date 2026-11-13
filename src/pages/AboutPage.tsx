import React from 'react';
import { Colophon } from '../components/layout/Colophon';
import { Info, Award, ShieldCheck, Terminal, Compass, Bookmark, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative text-[#D8CBB3] bg-transparent min-h-screen pt-28 sm:pt-36 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-16 mb-16">
        
        {/* Header */}
        <div className="pb-8 border-b border-[#D8CBB3]/15">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-2 font-bold">
            <Info className="w-4 h-4" />
            <span>Editorial Institution & Methodology</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FAF7F2] tracking-tight">
            About NETWORK EXPLAINED
          </h1>
          <p className="mt-4 text-base sm:text-xl text-[#D8CBB3]/80 font-serif italic max-w-3xl leading-relaxed">
            An open educational publication exploring foundational internet protocols through high-craft creative development, mathematical rigor, and interactive digital laboratories.
          </p>
        </div>

        {/* Core Principles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-3 shadow-liquid-glass">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 flex items-center justify-center text-[#2F6BFF]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#FAF7F2]">Editorial Craft</h3>
            <p className="text-xs text-[#D8CBB3]/80 leading-relaxed font-sans">
              Rejecting generic software dashboards and repetitive blog templates in pursuit of long-form typography, considered negative space, and typographic beauty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-3 shadow-liquid-glass">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 flex items-center justify-center text-[#2F6BFF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#FAF7F2]">Technical Accuracy</h3>
            <p className="text-xs text-[#D8CBB3]/80 leading-relaxed font-sans">
              Every formula, metric limitation, and timer duration is grounded in primary IETF RFC standards and peer-reviewed computer science literature.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-3 shadow-liquid-glass">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 flex items-center justify-center text-[#2F6BFF]">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#FAF7F2]">Interactive Physics</h3>
            <p className="text-xs text-[#D8CBB3]/80 leading-relaxed font-sans">
              Replacing static screenshots with deterministic simulators that compute live Bellman-Ford exchanges and demonstrate failure modes.
            </p>
          </div>
        </div>

        {/* Academic Context */}
        <div className="mt-12 p-8 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-4 text-xs sm:text-sm text-[#D8CBB3] font-sans leading-relaxed">
          <h2 className="text-xl font-serif text-[#FAF7F2]">Curriculum Context & Authorship</h2>
          <p>
            This publication was engineered as part of the <strong>Computer Networks and Web Technology (CNAWT)</strong> academic tutorial and research track.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D8CBB3]/15 font-mono text-xs">
            <div>
              <span className="text-[#D8CBB3]/50 block uppercase text-[10px]">Author & Creative Engineer:</span>
              <strong className="text-[#FAF7F2] text-sm">Salaj Padole</strong>
              <div className="text-[#D8CBB3]/70">Roll No: 43 • PRN: 12412336</div>
            </div>
            <div>
              <span className="text-[#D8CBB3]/50 block uppercase text-[10px]">Institutional Affiliation:</span>
              <strong className="text-[#FAF7F2] text-sm">Department of Computer Networks</strong>
              <div className="text-[#2F6BFF] font-bold">Volume 01: The Routing Information Protocol</div>
            </div>
          </div>
        </div>

      </div>

      {/* Complete Colophon Apparatus */}
      <Colophon />
    </div>
  );
};
