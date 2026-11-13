import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../../data/publicationData';
import { GlossaryTerm } from '../../types/publication';
import { BookOpen, Search, Filter, ExternalLink } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

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
    <div id="glossary" className="my-14 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 p-6 sm:p-8 scroll-mt-20 shadow-liquid-glass">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Technical Reference Compendium</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            Lexicon of Distributed Routing & RIP Architecture
          </h3>
        </div>

        <span className="text-xs font-mono text-[#D8CBB3]/70">
          {filteredTerms.length} Terms Documented
        </span>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#D8CBB3]/50 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search terms, acronyms (e.g. CIDR, Split Horizon, AD)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#121210] border border-[#D8CBB3]/25 rounded-xl text-xs sm:text-sm text-[#FAF7F2] placeholder-[#D8CBB3]/40 focus:outline-none focus:border-[#2F6BFF] font-mono transition-colors shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          {categories.map((cat) => (
            <LiquidButton
              key={cat}
              variant="pill"
              isActive={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </LiquidButton>
          ))}
        </div>
      </div>

      {/* Glossary List */}
      <div className="mt-6 space-y-3">
        {filteredTerms.length === 0 ? (
          <div className="py-8 text-center text-[#D8CBB3]/50 font-mono text-xs">
            No terms matched your query.
          </div>
        ) : (
          filteredTerms.map((term) => {
            const isExpanded = expandedId === term.id;
            return (
              <div
                key={term.id}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 bg-[#121210] hover:border-[#2F6BFF] transition-all cursor-pointer group"
                onClick={() => toggleExpand(term.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#FAF7F2] group-hover:text-[#2F6BFF] transition-colors">{term.term}</span>
                      {term.acronym && (
                        <span className="px-2 py-0.5 rounded bg-[#2F6BFF]/20 border border-[#2F6BFF]/40 text-[10px] font-mono text-[#2F6BFF] font-bold">
                          {term.acronym}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-[#D8CBB3]/50">
                        • {term.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#D8CBB3] font-sans leading-relaxed">
                      {term.shortDefinition}
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#D8CBB3]/15 text-xs text-[#D8CBB3] font-sans space-y-3 animate-fadeIn">
                    <p className="leading-relaxed">
                      {term.inDepthExplanation}
                    </p>
                    {term.rfcReferences && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#2F6BFF]">
                        <span className="text-[#D8CBB3]/60">Standards:</span>
                        {term.rfcReferences.map((rfc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#1E1E1C] border border-[#D8CBB3]/20 text-[#FAF7F2]">
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
