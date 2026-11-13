import React, { useState } from 'react';
import { Calculator, Clock, Activity, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export const ConvergenceCalculator: React.FC = () => {
  const [hops, setHops] = useState<number>(6);
  const [updateInterval, setUpdateInterval] = useState<number>(30);
  const [lossRate, setLossRate] = useState<number>(0);
  const [safeguardMode, setSafeguardMode] = useState<'none' | 'split-horizon' | 'triggered'>('triggered');

  // Convergence calculation
  let calculatedSeconds = 0;
  let calculationMethod = '';

  if (safeguardMode === 'none') {
    // Count-to-infinity worst case: 16 iterations * update interval * loss multiplier
    calculatedSeconds = Math.round(16 * updateInterval * (1 + lossRate / 100));
    calculationMethod = `Count-to-Infinity Worst Case: 16 iterations × ${updateInterval}s update rate`;
  } else if (safeguardMode === 'split-horizon') {
    // Timeout-based convergence: 180s invalid timer + diameter propagation
    calculatedSeconds = Math.round((180 + (hops * updateInterval * 0.5)) * (1 + lossRate / 100));
    calculationMethod = `Invalid Timer (180s) + Hop Propagation (${hops} hops × ${(updateInterval * 0.5).toFixed(1)}s avg delay)`;
  } else {
    // Triggered updates: Sub-second wire propagation per hop (~0.15s per hop)
    calculatedSeconds = Number((hops * 0.15 * (1 + lossRate / 50) + 0.2).toFixed(2));
    calculationMethod = `Flash Updates: Sub-second hardware broadcast (${hops} hops × 150ms per hop)`;
  }

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Calculator className="w-4 h-4" />
            <span>Mathematical Physics Model</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            RIP Convergence Latency Calculator
          </h3>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          Bellman-Ford Bounds
        </span>
      </div>

      {/* Interactive Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Hop Diameter Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Network Diameter:</span>
            <span className="text-sky-400 font-bold">{hops} Hops</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            value={hops}
            onChange={(e) => { sound.playClick(); setHops(Number(e.target.value)); }}
            className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>1 (Direct)</span>
            <span>15 (Max Limit)</span>
          </div>
        </div>

        {/* Update Interval */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Periodic Update Timer:</span>
            <span className="text-sky-400 font-bold">{updateInterval}s</span>
          </div>
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={updateInterval}
            onChange={(e) => { sound.playClick(); setUpdateInterval(Number(e.target.value)); }}
            className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>10s (Fast)</span>
            <span>30s (RFC STD)</span>
            <span>60s</span>
          </div>
        </div>

        {/* Packet Loss */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">UDP Packet Loss Rate:</span>
            <span className="text-sky-400 font-bold">{lossRate}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            step={2}
            value={lossRate}
            onChange={(e) => { sound.playClick(); setLossRate(Number(e.target.value)); }}
            className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0% (Clean Fiber)</span>
            <span>20% (Congested WAN)</span>
          </div>
        </div>

      </div>

      {/* Safeguard Mode Switch */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <span className="text-xs font-mono text-slate-400 block mb-2">Loop Safeguard Configuration:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => { sound.playClick(); setSafeguardMode('none'); }}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
              safeguardMode === 'none'
                ? 'border-rose-500 bg-rose-950/40 text-rose-300 shadow-glow-rose'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold">No Safeguards</div>
            <div className="text-[10px] text-slate-500 mt-1">Full Count-to-Infinity failure</div>
          </button>

          <button
            onClick={() => { sound.playClick(); setSafeguardMode('split-horizon'); }}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
              safeguardMode === 'split-horizon'
                ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold">Split Horizon Only</div>
            <div className="text-[10px] text-slate-500 mt-1">Timer-paced convergence</div>
          </button>

          <button
            onClick={() => { sound.playClick(); setSafeguardMode('triggered'); }}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
              safeguardMode === 'triggered'
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-glow-emerald'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-bold">Triggered Updates + Poison</div>
            <div className="text-[10px] text-slate-500 mt-1">RFC 2453 Full Safeguards</div>
          </button>
        </div>
      </div>

      {/* Result Display */}
      <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-500">Estimated Convergence Window:</span>
          <div className="text-3xl font-mono font-bold text-white mt-1">
            {calculatedSeconds} <span className="text-sm font-normal text-sky-400 font-sans">seconds</span>
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">
            {calculationMethod}
          </div>
        </div>

        <div className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold ${
          calculatedSeconds < 2
            ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
            : calculatedSeconds < 200
            ? 'bg-amber-950/60 border-amber-800 text-amber-400'
            : 'bg-rose-950/60 border-rose-800 text-rose-400'
        }`}>
          {calculatedSeconds < 2 ? 'SUB-SECOND CONVERGENCE' : calculatedSeconds < 200 ? 'ACCEPTABLE CONVERGENCE' : 'BLACKHOLE CONGESTION RISK'}
        </div>
      </div>

    </div>
  );
};
