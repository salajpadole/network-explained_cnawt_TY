import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, Code2 } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidMetalButton } from '../../effects/liquid-metal-button/LiquidMetalButton';
import '../../effects/liquid-metal-button/styles.css';
import { LiquidMetalAction, LiquidButton } from '../buttons/LiquidMetalAction';

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
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Terminal className="w-4 h-4" />
            <span>Industrial Configuration Artifacts</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            Production Router Deployments
          </h3>
        </div>

        {/* Platform Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121210] rounded-xl border border-[#D8CBB3]/20 text-xs font-mono">
          <LiquidButton
            variant="pill"
            isActive={activePlatform === 'cisco'}
            onClick={() => setActivePlatform('cisco')}
          >
            Cisco IOS
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activePlatform === 'juniper'}
            onClick={() => setActivePlatform('juniper')}
          >
            Juniper Junos
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activePlatform === 'linuxFrr'}
            onClick={() => setActivePlatform('linuxFrr')}
          >
            Linux FRRouting
          </LiquidButton>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="mt-6 rounded-xl bg-[#121210] border border-[#D8CBB3]/25 overflow-hidden shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="px-4 py-2.5 bg-[#1E1E1C] border-b border-[#D8CBB3]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="ml-2 font-mono text-xs text-[#D8CBB3]/80 truncate">
              {activeConfig.filename}
            </span>
          </div>

          <LiquidMetalAction
            text={copied ? 'Copied' : 'Copy Config'}
            onClick={handleCopy}
            width={140}
            height={42}
          />
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-[#FAF7F2]">
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
                    annotation ? 'hover:bg-[#2F6BFF]/20 cursor-help' : ''
                  }`}
                >
                  <span className="text-[#D8CBB3]/40 select-none w-6 text-right shrink-0">{lineNum}</span>
                  <span className={`flex-1 ${line.startsWith('!') || line.startsWith('#') ? 'text-[#D8CBB3]/50 italic' : line.startsWith(' ') ? 'text-[#D8CBB3]' : 'text-[#FAF7F2] font-semibold'}`}>
                    {line}
                  </span>
                  {annotation && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2F6BFF]/20 border border-[#2F6BFF]/40 text-[#2F6BFF] select-none font-bold">
                      Note
                    </span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        {/* Interactive Annotation Status Bar */}
        <div className="px-4 py-3 bg-[#1E1E1C] border-t border-[#D8CBB3]/15 text-xs font-mono flex items-center gap-2">
          <Info className="w-4 h-4 text-[#2F6BFF] shrink-0" />
          <span className="text-[#D8CBB3]">
            {hoveredAnnotation || 'Hover over annotated lines above to inspect vendor command semantics.'}
          </span>
        </div>
      </div>

    </div>
  );
};
