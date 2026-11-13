import React, { useState } from 'react';
import { RFC_BIBLIOGRAPHY } from '../../data/publicationData';
import { Copy, Check, ExternalLink, Bookmark, Shield, Award, Terminal } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

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
    <footer id="colophon" className="relative border-t border-slate-800 bg-[#06080D] pt-20 pb-24 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Colophon Masthead */}
        <div className="pb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
            <Award className="w-4 h-4" />
            <span>Colophon & Critical Apparatus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            NETWORK EXPLAINED
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-serif italic">
            Volume 01: An interactive treatise on distributed Bellman-Ford computation, metric infinity, and convergence physics in autonomous network architectures.
          </p>
        </div>

        {/* Bibliography & Primary Sources */}
        <div className="py-12 border-b border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-sky-400" />
              <span>Primary References & Standards Track</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">{RFC_BIBLIOGRAPHY.length} Referenced Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RFC_BIBLIOGRAPHY.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="font-mono text-xs text-sky-400 font-semibold">{item.code}</div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.year}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-slate-200 mt-1 group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <div className="text-xs text-slate-500 font-serif italic mt-0.5">
                  {item.author} — <span className="text-slate-400">{item.status}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.summary}
                </p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 hover:underline"
                >
                  <span>Inspect Official Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Citation Generator */}
        <div className="py-12 border-b border-slate-800/80">
          <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Academic Citation Generator</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6 font-mono">
            Cite this interactive monograph in research papers, lecture materials, or curriculum documentation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BibTeX */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-slate-300">BibTeX Format</span>
                <button
                  onClick={() => copyToClipboard(bibtexCitation, 'bibtex')}
                  className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                >
                  {copiedFormat === 'bibtex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'bibtex' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto p-2 bg-slate-900/60 rounded">
                {bibtexCitation}
              </pre>
            </div>

            {/* IEEE */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-slate-300">IEEE Standard Format</span>
                <button
                  onClick={() => copyToClipboard(ieeeCitation, 'ieee')}
                  className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                >
                  {copiedFormat === 'ieee' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'ieee' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto p-2 bg-slate-900/60 rounded whitespace-pre-wrap leading-relaxed">
                {ieeeCitation}
              </pre>
            </div>
          </div>
        </div>

        {/* Technical Colophon Specifications */}
        <div className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <div className="text-slate-500 uppercase tracking-wider text-[10px]">Typography</div>
            <div className="text-slate-300 mt-1">Newsreader Variable</div>
            <div className="text-slate-400">Plus Jakarta Sans</div>
            <div className="text-slate-400">JetBrains Mono</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase tracking-wider text-[10px]">Engine & Physics</div>
            <div className="text-slate-300 mt-1">React 18 + TypeScript</div>
            <div className="text-slate-400">GSAP ScrollTrigger</div>
            <div className="text-slate-400">Studio Freight Lenis</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase tracking-wider text-[10px]">Acoustic Synthesis</div>
            <div className="text-slate-300 mt-1">Pure Web Audio API</div>
            <div className="text-slate-400">Zero Audio Dependencies</div>
            <div className="text-slate-400">Deterministic Waves</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase tracking-wider text-[10px]">Author & Verification</div>
            <div className="text-slate-300 mt-1">Salaj Padole</div>
            <div className="text-slate-400">Roll No: 43 • PRN: 12412336</div>
            <div className="text-emerald-400">Verified CNAWT Curriculum</div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Open Educational Resource • Free for academic & institutional use</span>
          </div>
          <div>
            Crafted for <span className="text-slate-300 font-medium">Network Explained</span> • Published 2026
          </div>
        </div>

      </div>
    </footer>
  );
};
