import React from 'react';
import { AlertCircle, ShieldCheck, Zap, ArrowRight, Ban, CheckCircle2 } from 'lucide-react';

export const LoopMechanicsVisualizer: React.FC = () => {
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      {/* Header */}
      <div className="pb-6 border-b border-[#D8CBB3]/15">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
          <AlertCircle className="w-4 h-4" />
          <span>Loop Mitigation Architecture • RFC 2453 Section 3.4.3</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
          The Count-to-Infinity Pathology & Three RFC Safeguards
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#D8CBB3]/80 font-sans max-w-2xl leading-relaxed">
          How decentralized distance-vector protocols resolve the fundamental paradox of routing loops without global topology knowledge.
        </p>
      </div>

      {/* Grid: Pathology vs. Mitigation */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: The Failure Pathology */}
        <div className="p-6 rounded-xl bg-[#141518]/90 border border-rose-500/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
              <Ban className="w-3.5 h-3.5" />
              Pathology: Count-to-Infinity
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
              Without Safeguards
            </span>
          </div>

          <p className="text-xs font-sans text-[#D8CBB3]/80 leading-relaxed">
            When link to Subnet X fails, Router B drops metric 1. Without Split Horizon, Router A advertises its stale route to B:
          </p>

          {/* Stepped Breakdown */}
          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#0F1013] border border-rose-500/20 flex items-center justify-between">
              <span className="text-[#A8997C]">T = 0s (Break)</span>
              <span className="text-[#FAF7F2]">Link B → X fails. B loses route.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0F1013] border border-rose-500/20 flex items-center justify-between">
              <span className="text-[#A8997C]">T = 30s (Echo)</span>
              <span className="text-amber-400">A tells B: &ldquo;I have X (metric 2)&rdquo;</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0F1013] border border-rose-500/20 flex items-center justify-between">
              <span className="text-[#A8997C]">T = 60s (Loop)</span>
              <span className="text-rose-400">B accepts: Next-hop A, Metric = 3</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0F1013] border border-rose-500/20 flex items-center justify-between">
              <span className="text-[#A8997C]">T = 480s (Limit)</span>
              <span className="text-rose-500 font-bold">Metric reaches 16 (Infinity)</span>
            </div>
          </div>

          <div className="text-[11px] font-sans text-rose-300/80 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
            Packets bounce back and forth between routers A and B, saturating link bandwidth until metric 16 finally purges the route after 16 iterations (~8 minutes).
          </div>
        </div>

        {/* Right: The 3 RFC Safeguards */}
        <div className="p-6 rounded-xl bg-[#141518]/90 border border-[#2F6BFF]/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2F6BFF]/20">
            <span className="text-xs font-mono uppercase tracking-wider text-[#2F6BFF] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              RFC 2453 Mitigation Architecture
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2F6BFF]/20 text-[#2F6BFF]">
              Active Standards
            </span>
          </div>

          <div className="space-y-3">
            {/* Safeguard 1 */}
            <div className="p-3.5 rounded-lg bg-[#0F1013] border border-[#2F6BFF]/25">
              <div className="flex items-center justify-between font-mono text-xs text-[#FAF7F2] font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6BFF]" />
                  1. Split Horizon (Simple)
                </span>
                <span className="text-[10px] text-[#A8997C]">RFC 2453 §3.4.3</span>
              </div>
              <p className="text-xs font-sans text-[#D8CBB3]/80 mt-1 leading-relaxed">
                A router never advertises a route back out the same physical interface through which it was learned. Eliminates 2-node mutual loops instantly.
              </p>
            </div>

            {/* Safeguard 2 */}
            <div className="p-3.5 rounded-lg bg-[#0F1013] border border-[#2F6BFF]/25">
              <div className="flex items-center justify-between font-mono text-xs text-[#FAF7F2] font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  2. Split Horizon with Poison Reverse
                </span>
                <span className="text-[10px] text-[#A8997C]">RFC 2453 §3.4.3</span>
              </div>
              <p className="text-xs font-sans text-[#D8CBB3]/80 mt-1 leading-relaxed">
                Instead of omitting the route, the router explicitly advertises Subnet X with Metric 16 (Infinity) back to the neighbor, immediately overriding stale cached paths.
              </p>
            </div>

            {/* Safeguard 3 */}
            <div className="p-3.5 rounded-lg bg-[#0F1013] border border-[#2F6BFF]/25">
              <div className="flex items-center justify-between font-mono text-xs text-[#FAF7F2] font-bold">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  3. Triggered Updates (Rate-Limited Poison)
                </span>
                <span className="text-[10px] text-[#A8997C]">RFC 2453 §3.8.1</span>
              </div>
              <p className="text-xs font-sans text-[#D8CBB3]/80 mt-1 leading-relaxed">
                Upon detecting a link failure or metric change, the router immediately broadcasts an update without waiting for the 30s timer. To prevent packet storms, RFC 2453 mandates rate-limiting subsequent triggered updates with a randomized 1–5 second suppression window.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
