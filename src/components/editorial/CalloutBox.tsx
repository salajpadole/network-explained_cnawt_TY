import React from 'react';
import { ShieldCheck, AlertTriangle, Info, BookOpen, Lightbulb } from 'lucide-react';

interface CalloutBoxProps {
  type?: 'theorem' | 'warning' | 'rfc' | 'insight';
  title: string;
  children: React.ReactNode;
  cite?: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({
  type = 'insight',
  title,
  children,
  cite
}) => {
  const configs = {
    theorem: {
      border: 'border-[#2F6BFF]/50',
      bg: 'bg-[#12141A]/60 backdrop-blur-xl',
      text: 'text-[#2F6BFF]',
      icon: Lightbulb,
      tag: 'Algorithmic Theorem'
    },
    warning: {
      border: 'border-rose-500/50',
      bg: 'bg-rose-950/20 backdrop-blur-xl',
      text: 'text-rose-400',
      icon: AlertTriangle,
      tag: 'Pathological Vulnerability'
    },
    rfc: {
      border: 'border-[#D8CBB3]/40',
      bg: 'bg-[#12141A]/60 backdrop-blur-xl',
      text: 'text-[#FAF7F2]',
      icon: ShieldCheck,
      tag: 'Internet Standard Mandate'
    },
    insight: {
      border: 'border-[#2F6BFF]/40',
      bg: 'bg-[#12141A]/60 backdrop-blur-xl',
      text: 'text-[#2F6BFF]',
      icon: BookOpen,
      tag: 'Historical Insight'
    }
  };

  const current = configs[type];
  const Icon = current.icon;

  return (
    <div className={`my-8 p-6 rounded-2xl border ${current.border} ${current.bg} text-sm leading-relaxed shadow-liquid-glass`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8CBB3]/15 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${current.text}`} />
          <span className={`font-bold ${current.text}`}>{title}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[#D8CBB3]/60 font-bold">
          {current.tag}
        </span>
      </div>

      <div className="text-[#D8CBB3] font-sans leading-relaxed space-y-2">
        {children}
      </div>

      {cite && (
        <div className="mt-3 pt-2 border-t border-[#D8CBB3]/15 text-[11px] font-mono text-[#D8CBB3]/60 italic">
          Source Citation: {cite}
        </div>
      )}
    </div>
  );
};
