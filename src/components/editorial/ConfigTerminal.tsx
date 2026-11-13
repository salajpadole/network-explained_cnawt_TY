import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, Code2 } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface ConfigSnippet {
  vendor: string;
  filename: string;
  language: string;
  code: string;
  annotations: { line: number; explanation: string }[];
}

const CONFIGS: Record<string, ConfigSnippet> = {
  cisco: {
    vendor: 'Cisco IOS-XE (17.x / 15.x)',
    filename: 'Router-R1# configure terminal',
    language: 'ios',
    code: `! Enable RIP routing process
router rip
 ! Mandate Version 2 for CIDR / VLSM and Multicast support
 version 2
 ! Disable legacy Classful auto-summarization on class boundaries
 no auto-summary
 ! Advertise attached subnets within 10.0.0.0 and 192.168.1.0
 network 10.0.0.0
 network 192.168.1.0
 ! Suppress periodic RIP broadcasts on user-facing LAN access port
 passive-interface GigabitEthernet0/2
 ! Explicitly configure RFC standard timers (Update, Invalid, Holddown, Flush)
 timers basic 30 180 180 240
exit`,
    annotations: [
      { line: 2, explanation: 'Enables the RIP routing daemon process in the IOS kernel.' },
      { line: 4, explanation: 'Forces RIPv2 (RFC 2453) which adds subnet masks, 224.0.0.9 multicast, and authentication.' },
      { line: 6, explanation: 'CRITICAL: Without "no auto-summary", RIP collapses subnets like 10.1.2.0/24 to classful 10.0.0.0/8.' },
      { line: 11, explanation: 'passive-interface stops sending periodic updates to end-user PCs while still advertising that subnet to neighbors.' },
      { line: 13, explanation: 'Configures standard timers: 30s update, 180s invalid, 180s holddown, 240s flush.' }
    ]
  },
  juniper: {
    vendor: 'Juniper Junos OS',
    filename: 'user@R1# edit protocols rip',
    language: 'junos',
    code: `group RIP-CAMPUS {
    export EXPORT-DIRECT-ROUTES;
    neighbor ge-0/0/0.0 {
        metric-out 1;
        receive version-2;
        send version-2;
    }
    neighbor ge-0/0/1.0 {
        metric-out 1;
        receive version-2;
        send version-2;
    }
}`,
    annotations: [
      { line: 1, explanation: 'In Junos, RIP neighbors are grouped logically into peer groups.' },
      { line: 2, explanation: 'Junos requires explicit export policy to redistribute connected interfaces into RIP.' },
      { line: 5, explanation: 'Locks both ingress and egress protocol version to RIPv2.' }
    ]
  },
  linuxFrr: {
    vendor: 'Linux FRRouting (FRR Daemon)',
    filename: '/etc/frr/ripd.conf',
    language: 'bash',
    code: `router rip
 version 2
 network 10.0.12.0/30
 network 192.168.1.0/24
 redistribute connected
 timers basic 30 180 240
!
interface eth0
 ip rip split-horizon poisoned-reverse
!
log file /var/log/frr/ripd.log`,
    annotations: [
      { line: 1, explanation: 'Runs RIP inside the modern Linux FRR network stack.' },
      { line: 5, explanation: 'Dynamically redistributes all local Linux kernel interfaces into RIP.' },
      { line: 9, explanation: 'Explicitly turns on Poison Reverse on interface eth0.' }
    ]
  }
};

export const ConfigTerminal: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<string>('cisco');
  const [copied, setCopied] = useState<boolean>(false);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null);

  const activeConfig = CONFIGS[activePlatform];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeConfig.code);
    sound.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Terminal className="w-4 h-4" />
            <span>Industrial Configuration Artifacts</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            Production Router Deployments
          </h3>
        </div>

        {/* Platform Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => { sound.playClick(); setActivePlatform('cisco'); }}
            className={`px-3 py-1.5 rounded transition-all ${
              activePlatform === 'cisco'
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cisco IOS
          </button>
          <button
            onClick={() => { sound.playClick(); setActivePlatform('juniper'); }}
            className={`px-3 py-1.5 rounded transition-all ${
              activePlatform === 'juniper'
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Juniper Junos
          </button>
          <button
            onClick={() => { sound.playClick(); setActivePlatform('linuxFrr'); }}
            className={`px-3 py-1.5 rounded transition-all ${
              activePlatform === 'linuxFrr'
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Linux FRRouting
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="ml-2 font-mono text-xs text-slate-400 truncate">
              {activeConfig.filename}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
          <pre>
            {activeConfig.code.split('\n').map((line, idx) => {
              const lineNum = idx + 1;
              const annotation = activeConfig.annotations.find((a) => a.line === lineNum);
              return (
                <div
                  key={idx}
                  onMouseEnter={() => annotation && setHoveredAnnotation(annotation.explanation)}
                  onMouseLeave={() => setHoveredAnnotation(null)}
                  className={`flex items-start gap-4 px-2 py-0.5 rounded transition-colors ${
                    annotation ? 'hover:bg-sky-950/40 cursor-help' : ''
                  }`}
                >
                  <span className="text-slate-600 select-none w-6 text-right shrink-0">{lineNum}</span>
                  <span className={`flex-1 ${line.startsWith('!') || line.startsWith('#') ? 'text-slate-500 italic' : line.startsWith(' ') ? 'text-sky-200' : 'text-white font-semibold'}`}>
                    {line}
                  </span>
                  {annotation && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 border border-sky-800/80 text-sky-400 select-none">
                      Note
                    </span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        {/* Interactive Annotation Status Bar */}
        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 text-xs font-mono flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-slate-300">
            {hoveredAnnotation || 'Hover over annotated lines above to inspect vendor command semantics.'}
          </span>
        </div>
      </div>

    </div>
  );
};
