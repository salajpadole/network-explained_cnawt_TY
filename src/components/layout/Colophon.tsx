import React, { useState } from 'react';
import { RFC_BIBLIOGRAPHY } from '../../data/publicationData';
import { Copy, Check, ExternalLink, Bookmark, Shield, Award, Terminal } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

export const Colophon: React.FC = () => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const bibtexCitation = `@article{padole2026rip,
  title={The Routing Information Protocol & Distance-Vector Convergence Dynamics},
  author={Padole, Salaj},
  journal={Network Explained: Interactive Technical Monographs},
  volume={1},
  number={RFC-2453},
  pages={1--42},
  year={2026},
  publisher={Network Explained Foundation}
}`;

  const ieeeCitation = `S. Padole, "The Routing Information Protocol & Distance-Vector Convergence Dynamics," Network Explained: Interactive Technical Monographs, vol. 1, no. RFC-2453, Nov. 2026.`;

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    sound.playClick();
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <footer id="colophon" className="relative border-t border-[#D8CBB3]/15 glass-panel pt-20 pb-24 text-[#D8CBB3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Colophon Masthead */}
        <div className="pb-12 border-b border-[#D8CBB3]/15">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-2 font-bold">
            <Award className="w-4 h-4" />
            <span>Academic References & Bibliography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">
            NETWORK EXPLAINED
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D8CBB3]/80 max-w-2xl font-serif italic">
            Volume 01: An academic treatise on distributed Bellman-Ford computation, metric infinity, and convergence dynamics in autonomous network architectures.
          </p>
        </div>

        {/* Bibliography & Primary Sources */}
        <div className="py-12 border-b border-[#D8CBB3]/15">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif text-[#FAF7F2] flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#2F6BFF]" />
              <span>Primary References & Standards Track</span>
            </h3>
            <span className="text-xs font-mono text-[#D8CBB3]/60">{RFC_BIBLIOGRAPHY.length} Referenced Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RFC_BIBLIOGRAPHY.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 bg-[#1E1E1C] hover:border-[#2F6BFF] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="font-mono text-xs text-[#2F6BFF] font-semibold">{item.code}</div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121210] text-[#D8CBB3]/70 border border-[#D8CBB3]/15">
                    {item.year}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-[#FAF7F2] mt-1 group-hover:text-[#D8CBB3] transition-colors">
                  {item.title}
                </h4>
                <div className="text-xs text-[#D8CBB3]/60 font-serif italic mt-0.5">
                  {item.author} — <span className="text-[#D8CBB3]/80">{item.status}</span>
                </div>
                <p className="text-xs text-[#D8CBB3]/75 mt-2 leading-relaxed">
                  {item.summary}
                </p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-[#2F6BFF] hover:text-[#FAF7F2] hover:underline"
                >
                  <span>Inspect Official Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Citation Generator */}
        <div className="py-12 border-b border-[#D8CBB3]/15">
          <h3 className="text-lg font-serif text-[#FAF7F2] mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#2F6BFF]" />
            <span>Academic Citation Generator</span>
          </h3>
          <p className="text-xs text-[#D8CBB3]/70 mb-6 font-mono">
            Cite this interactive monograph in research papers, lecture materials, or curriculum documentation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BibTeX */}
            <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-[#FAF7F2]">BibTeX Format</span>
                <LiquidButton
                  size="sm"
                  onClick={() => copyToClipboard(bibtexCitation, 'bibtex')}
                  icon={copiedFormat === 'bibtex' ? <Check className="w-3 h-3 text-[#2F6BFF]" /> : <Copy className="w-3 h-3" />}
                >
                  {copiedFormat === 'bibtex' ? 'Copied' : 'Copy'}
                </LiquidButton>
              </div>
              <pre className="text-[11px] font-mono text-[#D8CBB3]/80 overflow-x-auto p-2.5 bg-[#121210] rounded-lg border border-[#D8CBB3]/15">
                {bibtexCitation}
              </pre>
            </div>

            {/* IEEE */}
            <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-[#FAF7F2]">IEEE Standard Format</span>
                <LiquidButton
                  size="sm"
                  onClick={() => copyToClipboard(ieeeCitation, 'ieee')}
                  icon={copiedFormat === 'ieee' ? <Check className="w-3 h-3 text-[#2F6BFF]" /> : <Copy className="w-3 h-3" />}
                >
                  {copiedFormat === 'ieee' ? 'Copied' : 'Copy'}
                </LiquidButton>
              </div>
              <pre className="text-[11px] font-mono text-[#D8CBB3]/80 overflow-x-auto p-2.5 bg-[#121210] rounded-lg border border-[#D8CBB3]/15 whitespace-pre-wrap leading-relaxed">
                {ieeeCitation}
              </pre>
            </div>
          </div>
        </div>

        {/* Subject Matter & Academic Specifications */}
        <div className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <div className="text-[#D8CBB3]/50 uppercase tracking-wider text-[10px]">Protocol Focus</div>
            <div className="text-[#FAF7F2] mt-1 font-sans font-medium">Routing Information Protocol</div>
            <div className="text-[#D8CBB3]/70">RIPv1, RIPv2 & RIPng</div>
            <div className="text-[#D8CBB3]/70">Interior Gateway Routing (IGP)</div>
          </div>
          <div>
            <div className="text-[#D8CBB3]/50 uppercase tracking-wider text-[10px]">Algorithmic Foundations</div>
            <div className="text-[#FAF7F2] mt-1 font-sans font-medium">Bellman-Ford Algorithm</div>
            <div className="text-[#D8CBB3]/70">Distance-Vector Convergence</div>
            <div className="text-[#D8CBB3]/70">Split Horizon & Poison Reverse</div>
          </div>
          <div>
            <div className="text-[#D8CBB3]/50 uppercase tracking-wider text-[10px]">Standards Track</div>
            <div className="text-[#FAF7F2] mt-1 font-sans font-medium">IETF RFC 1058 & 2453</div>
            <div className="text-[#D8CBB3]/70">RFC 2080 (IPv6 Extension)</div>
            <div className="text-[#D8CBB3]/70">RFC 1724 (RIP Version 2 MIB)</div>
          </div>
          <div>
            <div className="text-[#D8CBB3]/50 uppercase tracking-wider text-[10px]">Author & Curriculum</div>
            <div className="text-[#FAF7F2] mt-1 font-sans font-medium">Salaj Padole</div>
            <div className="text-[#D8CBB3]/70">Roll No: 43 • PRN: 12412336</div>
            <div className="text-[#2F6BFF] font-bold">CNAWT Academic Research</div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 border-t border-[#D8CBB3]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D8CBB3]/50 font-mono gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#2F6BFF]" />
            <span>Open Educational Resource • Free for academic & curriculum research</span>
          </div>
          <div>
            Authored by <span className="text-[#FAF7F2] font-medium">Salaj Padole</span> • <span className="text-[#FAF7F2] font-medium">Network Explained</span> • Published 2026
          </div>
        </div>

      </div>
    </footer>
  );
};
