import React from 'react';

interface SectionHeaderProps {
  id?: string;
  chapterNumber: string;
  category: string;
  title: string;
  subtitle?: string;
  readTime?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  chapterNumber,
  category,
  title,
  subtitle,
  readTime,
}) => {
  return (
    <div id={id} className="pt-20 sm:pt-28 pb-10 border-b border-slate-800/60 scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 font-semibold">
            CHAPTER {chapterNumber}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{category}</span>
        </div>
        {readTime && (
          <span className="text-slate-400 font-normal">
            Reading Time: {readTime}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl font-serif italic leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
