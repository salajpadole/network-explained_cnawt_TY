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
      border: 'border-sky-500/40',
      bg: 'bg-sky-950/20',
      text: 'text-sky-300',
      icon: Lightbulb,
      tag: 'Algorithmic Theorem'
    },
    warning: {
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/20',
      text: 'text-rose-300',
      icon: AlertTriangle,
      tag: 'Pathological Vulnerability'
    },
    rfc: {
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20',
      text: 'text-emerald-300',
      icon: ShieldCheck,
      tag: 'Internet Standard Mandate'
    },
    insight: {
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20',
      text: 'text-amber-300',
      icon: BookOpen,
      tag: 'Historical Insight'
    }
  };

  const current = configs[type];
  const Icon = current.icon;

  return (
    <div className={`my-8 p-6 rounded-2xl border ${current.border} ${current.bg} text-sm leading-relaxed backdrop-blur-sm`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${current.text}`} />
          <span className={`font-bold ${current.text}`}>{title}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-500">
          {current.tag}
        </span>
      </div>

      <div className="text-slate-300 font-sans leading-relaxed space-y-2">
        {children}
      </div>

      {cite && (
        <div className="mt-3 pt-2 border-t border-slate-800/40 text-[11px] font-mono text-slate-400 italic">
          Source Citation: {cite}
        </div>
      )}
    </div>
  );
};
