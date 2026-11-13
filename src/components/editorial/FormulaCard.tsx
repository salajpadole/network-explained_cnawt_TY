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
    <div className="my-10 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Cpu className="w-4 h-4" />
            <span>Theoretical Foundation (1956 - 1958)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            The Bellman-Ford Optimality Equation
          </h3>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
          Dynamic Programming Formulation
        </span>
      </div>

      {/* Rendered Math Formula */}
      <div className="py-8 px-4 bg-[#12141A]/50 backdrop-blur-md rounded-xl my-6 border border-[#D8CBB3]/20 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
        <div 
          className="text-2xl sm:text-3xl md:text-4xl select-none text-[#FAF7F2]"
          dangerouslySetInnerHTML={{ __html: formulaHtml }} 
        />
        <div className="text-xs font-mono text-[#D8CBB3]/60 mt-2 text-center">
          Click any component term below to inspect its physical meaning in router firmware
        </div>
      </div>

      {/* Interactive Token Buttons (Liquid Glass Styled) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TOKENS.map((item) => {
          const isSelected = selectedToken.token === item.token;
          return (
            <button
              key={item.token}
              onClick={() => handleSelectToken(item)}
              className={`p-3 rounded-xl border text-left transition-all backdrop-blur-md ${
                isSelected
                  ? 'border-[#2F6BFF] bg-[#18284B]/60 shadow-[0_0_16px_rgba(47,107,255,0.4)] text-[#FAF7F2]'
                  : 'border-[#D8CBB3]/20 bg-[#14161F]/60 hover:bg-[#18284B]/30 hover:border-[#2F6BFF] text-[#D8CBB3]/70 hover:text-[#FAF7F2]'
              }`}
            >
              <div className="font-mono text-xs text-[#2F6BFF] font-bold flex items-center justify-between">
                <span>{item.token}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6BFF]" />}
              </div>
              <div className="text-xs font-medium mt-1 truncate text-[#FAF7F2]">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Token Deep Dive */}
      <div className="mt-6 p-5 rounded-xl bg-[#12141A]/60 backdrop-blur-md border border-[#D8CBB3]/20 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 text-[#2F6BFF] shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-mono font-bold text-[#2F6BFF] mr-2">{selectedToken.name}:</span>
              <span className="text-[#D8CBB3]">{selectedToken.description}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#101217]/60 backdrop-blur-sm border border-[#D8CBB3]/15">
                <span className="text-[#D8CBB3]/50 block mb-1 uppercase tracking-wider text-[10px]">Physical Router Implementation:</span>
                <span className="text-[#FAF7F2]">{selectedToken.physicalRole}</span>
              </div>
              <div className="p-2.5 rounded bg-[#101217]/60 backdrop-blur-sm border border-[#D8CBB3]/15">
                <span className="text-[#2F6BFF] block mb-1 uppercase tracking-wider text-[10px] font-bold">RIP Protocol Behavior:</span>
                <span className="text-[#D8CBB3]">{selectedToken.ripContext}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
