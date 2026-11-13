import React from 'react';
import { Clock, ShieldCheck, AlertTriangle, Trash2, Activity } from 'lucide-react';

export const TimerLifecycleVisualizer: React.FC = () => {
  const timerStages = [
    {
      time: '30s',
      name: 'Periodic Update',
      rfc: 'RFC 2453 §3.8',
      status: 'Active Vector Broadcast',
      color: 'border-[#2F6BFF] text-[#2F6BFF]',
      bg: 'bg-[#2F6BFF]/10',
      description: 'Routers advertise their entire Routing Information Base every 30 seconds via UDP port 520.',
      metric: 'Metric: 1–15 Hops',
      icon: Activity,
    },
    {
      time: '180s',
      name: 'Route Timeout / Invalid',
      rfc: 'RFC 2453 §3.8',
      status: 'Metric Clamped to 16',
      color: 'border-amber-500/60 text-amber-400',
      bg: 'bg-amber-500/10',
      description: 'If 6 consecutive 30s updates are missed, the destination is declared unreachable and poisoned.',
      metric: 'Metric: 16 (Infinity)',
      icon: AlertTriangle,
    },
    {
      time: '180s',
      name: 'Holddown Timer',
      rfc: 'Cisco IOS Standard',
      status: 'Route Quarantine',
      color: 'border-purple-500/60 text-purple-400',
      bg: 'bg-purple-500/10',
      description: 'Suppresses alternate routing claims with inferior or equal metrics to prevent temporary loops during convergence.',
      metric: 'Quarantined State',
      icon: ShieldCheck,
    },
    {
      time: '240s',
      name: 'Flush / Garbage Collection',
      rfc: 'RFC 2453 §3.8',
      status: 'RIB Removal',
      color: 'border-rose-500/60 text-rose-400',
      bg: 'bg-rose-500/10',
      description: 'Grace period expires. The route is permanently excised from the routing table and kernel forwarding plane.',
      metric: 'Expunged from RIB',
      icon: Trash2,
    },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      {/* Header */}
      <div className="pb-6 border-b border-[#D8CBB3]/15">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
          <Clock className="w-4 h-4" />
          <span>Temporal Mechanics • RFC 2453 Section 3.8</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
          RIP Route Lifecycle & Timer Engine Architecture
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#D8CBB3]/80 font-sans max-w-2xl leading-relaxed">
          Because RIP is an asynchronous soft-state protocol lacking transport handshakes, routes exist in a finite chronological window governed by deterministic timer thresholds.
        </p>
      </div>

      {/* Visual Timeline Bar */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#D8CBB3]/70">
          <span>0s Genesis</span>
          <span className="text-[#2F6BFF] font-bold">30s Update</span>
          <span className="text-amber-400 font-bold">180s Timeout</span>
          <span className="text-rose-400 font-bold">240s Flush</span>
        </div>

        {/* Timeline Gradient Track */}
        <div className="h-3 rounded-full bg-[#121316] border border-[#D8CBB3]/20 overflow-hidden relative flex">
          <div className="w-[12.5%] bg-gradient-to-r from-[#2F6BFF] to-[#00F0FF] h-full" title="0-30s Healthy Interval" />
          <div className="w-[62.5%] bg-gradient-to-r from-[#00F0FF]/40 via-amber-500/50 to-amber-500 h-full" title="30-180s Timeout Window" />
          <div className="w-[25%] bg-gradient-to-r from-purple-500/60 to-rose-500 h-full" title="180-240s Holddown & Flush" />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#A8997C]">
          <span>● Steady-state convergence</span>
          <span>● Up to 6 missed vector updates</span>
          <span>● Final RIB eviction</span>
        </div>
      </div>

      {/* 4 Timer Specification Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timerStages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-xl bg-[#141518]/90 border ${stage.color} flex flex-col justify-between space-y-4`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-[#FAF7F2]">{stage.time}</span>
                  <div className={`p-1.5 rounded-lg ${stage.bg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-bold font-sans text-[#FAF7F2] mt-2">
                  {stage.name}
                </h4>
                <div className="text-[10px] font-mono text-[#A8997C]">{stage.rfc}</div>

                <p className="mt-3 text-xs font-sans text-[#D8CBB3]/80 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D8CBB3]/10 font-mono text-[11px] flex items-center justify-between">
                <span className="text-[#A8997C]">State:</span>
                <span className="font-semibold text-[#FAF7F2]">{stage.metric}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Footnote on Floyd-Jacobson Jitter */}
      <div className="mt-6 p-4 rounded-xl bg-[#121316] border border-[#2F6BFF]/30 text-xs font-sans text-[#D8CBB3] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#2F6BFF] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#FAF7F2] font-mono">The Floyd-Jacobson Jitter Imperative:</strong>{' '}
          In RFC 2453 §3.8, every 30-second update timer is strictly randomized with a ±15% variance (25.5s to 34.5s). Without this jitter, interconnected routers on a shared Ethernet broadcast medium would spontaneously synchronize their crystal oscillators over hours of uptime, producing packet collision avalanches.
        </div>
      </div>
    </div>
  );
};
