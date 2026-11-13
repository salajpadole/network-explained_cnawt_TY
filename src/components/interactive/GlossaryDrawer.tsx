import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../../data/publicationData';
import { GlossaryTerm } from '../../types/publication';
import { BookOpen, Search, Filter, ExternalLink } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export const GlossaryDrawer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Fundamentals', 'RIP Protocol', 'Loop Prevention', 'Metrics & Timers', 'Comparative Protocols'];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.shortDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="glossary" className="my-14 rounded-2xl glass-panel-elevated border border-sky-500/30 p-6 sm:p-8 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <BookOpen className="w-4 h-4" />
            <span>Technical Reference Compendium</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            Lexicon of Distributed Routing & RIP Architecture
          </h3>
        </div>

        <span className="text-xs font-mono text-slate-400">
          {filteredTerms.length} Terms Documented
        </span>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search terms, acronyms (e.g. CIDR, Split Horizon, AD)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { sound.playClick(); setSelectedCategory(cat); }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 font-bold border-sky-500/40 shadow-glow-cyan'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary List */}
      <div className="mt-6 space-y-3">
        {filteredTerms.length === 0 ? (
          <div className="py-8 text-center text-slate-500 font-mono text-xs">
            No terms matched your query.
          </div>
        ) : (
          filteredTerms.map((term) => {
            const isExpanded = expandedId === term.id;
            return (
              <div
                key={term.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all cursor-pointer"
                onClick={() => toggleExpand(term.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-white">{term.term}</span>
                      {term.acronym && (
                        <span className="px-1.5 py-0.2 rounded bg-sky-950 border border-sky-800 text-[10px] font-mono text-sky-400">
                          {term.acronym}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">
                        • {term.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {term.shortDefinition}
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 font-sans space-y-3 animate-fadeIn">
                    <p className="leading-relaxed">
                      {term.inDepthExplanation}
                    </p>
                    {term.rfcReferences && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-sky-400">
                        <span className="text-slate-500">Standards:</span>
                        {term.rfcReferences.map((rfc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                            {rfc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
