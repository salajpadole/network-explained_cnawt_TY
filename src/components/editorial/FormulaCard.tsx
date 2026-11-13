import React, { useState } from 'react';
import katex from 'katex';
import { Cpu, Info, CheckCircle2 } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface TokenDetail {
  token: string;
  mathSymbol: string;
  name: string;
  description: string;
  physicalRole: string;
  ripContext: string;
}

const TOKENS: TokenDetail[] = [
  {
    token: 'Dx(y)',
    mathSymbol: 'D_x(y)',
    name: 'Shortest Distance Vector Entry',
    description: 'The minimum cost path from source node x to destination node y as calculated by router x.',
    physicalRole: 'The exact metric recorded in router x’s routing table for destination subnet y.',
    ripContext: 'An integer hop count between 1 and 15 (with 16 indicating unreachable infinity).'
  },
  {
    token: 'min_v',
    mathSymbol: '\\min_v',
    name: 'Optimization Over Neighbors',
    description: 'The mathematical minimum taken over all immediate direct neighbors v connected to router x.',
    physicalRole: 'Router x compares the vector advertisements received across all its active physical interfaces.',
    ripContext: 'If neighbor v2 advertises a lower total cost to destination y than neighbor v1, router x selects v2 as its next hop.'
  },
  {
    token: 'c(x,v)',
    mathSymbol: 'c(x, v)',
    name: 'Direct Link Cost',
    description: 'The operational cost to traverse the single physical edge connecting router x to immediate neighbor v.',
    physicalRole: 'The metric penalty incurred by transmitting out the specific physical egress interface.',
    ripContext: 'In standard unweighted RIP, c(x, v) = 1 for every operational link, regardless of whether it is 100GbE fiber or a 56kbps satellite link.'
  },
  {
    token: 'Dv(y)',
    mathSymbol: 'D_v(y)',
    name: 'Neighbor Vector Advertisement',
    description: 'The shortest distance from neighbor v to destination y, as claimed by neighbor v in its periodic broadcast.',
    physicalRole: 'The metric advertised inside the RIP Response packet received on port 520.',
    ripContext: 'This embodies the "routing by rumor" principle: router x assumes neighbor v is reporting its true distance.'
  }
];

export const FormulaCard: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<TokenDetail>(TOKENS[0]);

  // Generate KaTeX HTML
  const formulaHtml = katex.renderToString(
    'D_x(y) = \\min_{v} \\Big\\{ c(x,v) + D_v(y) \\Big\\}',
    { displayMode: true, throwOnError: false }
  );

  const handleSelectToken = (t: TokenDetail) => {
    sound.playClick();
    setSelectedToken(t);
  };

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Cpu className="w-4 h-4" />
            <span>Theoretical Foundation (1956 - 1958)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            The Bellman-Ford Optimality Equation
          </h3>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/40 text-sky-300">
          Dynamic Programming Formulation
        </span>
      </div>

      {/* Rendered Math Formula */}
      <div className="py-8 px-4 bg-slate-950/70 rounded-xl my-6 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto">
        <div 
          className="text-2xl sm:text-3xl md:text-4xl select-none"
          dangerouslySetInnerHTML={{ __html: formulaHtml }} 
        />
        <div className="text-xs font-mono text-slate-500 mt-2 text-center">
          Click any component term below to inspect its physical meaning in router firmware
        </div>
      </div>

      {/* Interactive Token Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TOKENS.map((item) => {
          const isSelected = selectedToken.token === item.token;
          return (
            <button
              key={item.token}
              onClick={() => handleSelectToken(item)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-sky-400 bg-sky-950/40 shadow-glow-cyan text-white'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-mono text-xs text-sky-400 font-bold flex items-center justify-between">
                <span>{item.token}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
              </div>
              <div className="text-xs font-medium mt-1 truncate text-slate-300">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Token Deep Dive */}
      <div className="mt-6 p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-mono font-bold text-sky-300 mr-2">{selectedToken.name}:</span>
              <span className="text-slate-300">{selectedToken.description}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px]">Physical Router Implementation:</span>
                <span className="text-slate-300">{selectedToken.physicalRole}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-emerald-400 block mb-1 uppercase tracking-wider text-[10px]">RIP Protocol Behavior:</span>
                <span className="text-emerald-200">{selectedToken.ripContext}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
