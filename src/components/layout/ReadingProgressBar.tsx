import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="w-full bg-slate-900/40 h-[2px] absolute bottom-0 left-0 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-150 ease-out shadow-glow-cyan"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};
