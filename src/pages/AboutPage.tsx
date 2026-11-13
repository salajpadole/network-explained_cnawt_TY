import React from 'react';
import { Colophon } from '../components/layout/Colophon';
import { BookOpen, ShieldCheck, Network, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative text-[#D8CBB3] bg-transparent min-h-screen pt-28 sm:pt-36 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-16 mb-16">
        
        {/* Header */}
        <div className="pb-8 border-b border-[#D8CBB3]/15">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-2 font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Academic Monograph & Research Context</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FAF7F2] tracking-tight">
            About NETWORK EXPLAINED
          </h1>
          <p className="mt-4 text-base sm:text-xl text-[#D8CBB3]/80 font-serif italic max-w-3xl leading-relaxed">
            An educational publication exploring foundational internet protocols, distributed Bellman-Ford computation, metric infinity constraints, and distance-vector convergence dynamics.
          </p>
        </div>

        {/* Content Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 flex items-center justify-center text-[#2F6BFF]">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#FAF7F2]">Protocol Architecture</h3>
            <p className="text-xs text-[#D8CBB3]/80 leading-relaxed font-sans">
              Comprehensive analysis of the Routing Information Protocol (RIPv1 & RIPv2), covering UDP port 520 packet formatting, subnet mask propagation, route tags, and multicast addressing.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 flex items-center justify-center text-[#2F6BFF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#FAF7F2]">Technical Accuracy & RFCs</h3>
            <p className="text-xs text-[#D8CBB3]/80 leading-relaxed font-sans">
              Every formula, metric limitation, and timer duration is grounded in primary IETF standards (RFC 1058, RFC 2453, RFC 2080) and peer-reviewed computer networking literature.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 flex items-center justify-center text-[#2F6BFF]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-[#FAF7F2]">Convergence & Loop Prevention</h3>
            <p className="text-xs text-[#D8CBB3]/80 leading-relaxed font-sans">
              In-depth coverage of distance-vector failure states, the count-to-infinity problem, and the mechanics of Split Horizon, Poison Reverse, and Triggered Updates.
            </p>
          </div>
        </div>

        {/* Academic Context & Authorship */}
        <div className="mt-12 p-8 rounded-2xl glass-panel space-y-4 text-xs sm:text-sm text-[#D8CBB3] font-sans leading-relaxed">
          <h2 className="text-xl font-serif text-[#FAF7F2]">Curriculum Context & Authorship</h2>
          <p>
            This monograph was researched and authored as part of the <strong>Computer Networks and Web Technology (CNAWT)</strong> academic curriculum and research track.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D8CBB3]/15 font-mono text-xs">
            <div>
              <span className="text-[#D8CBB3]/50 block uppercase text-[10px]">Author & Researcher:</span>
              <strong className="text-[#FAF7F2] text-sm">Salaj Padole</strong>
              <div className="text-[#D8CBB3]/70">Roll No: 43 • PRN: 12412336</div>
            </div>
            <div>
              <span className="text-[#D8CBB3]/50 block uppercase text-[10px]">Curriculum Track & Focus:</span>
              <strong className="text-[#FAF7F2] text-sm">Computer Networks and Web Technology (CNAWT)</strong>
              <div className="text-[#2F6BFF] font-bold">Volume 01: The Routing Information Protocol</div>
            </div>
          </div>
        </div>

      </div>

      {/* Primary References & Academic Citations */}
      <Colophon />
    </div>
  );
};
