import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import { RipSimulator } from '../components/simulator/RipSimulator';
import { ConvergenceCalculator } from '../components/interactive/ConvergenceCalculator';
import { 
  FlaskConical, Network, Compass, ShieldCheck, Activity, 
  HelpCircle, ChevronRight, RotateCcw, AlertTriangle, Layers, Info, CheckCircle2 
} from 'lucide-react';

export const LaboratoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topology' | 'distance-vector' | 'hop-count' | 'failure'>('topology');

  // Experience C State (Hop-Count Explorer)
  const [explorerHops, setExplorerHops] = useState<number>(4);

  // Experience B State (Distance-Vector Step Learning)
  const [dvStep, setDvStep] = useState<number>(0);

  const dvStages = [
    {
      title: 'Stage 0: Cold Boot / Zero Knowledge',
      desc: 'Each router only knows its directly connected subnets (Metric 1). Neighbor tables are completely unknown.',
      r1Table: [{ dest: '10.0.1.0/24 (LAN 1)', next: 'DIRECT', metric: 1 }],
      r2Table: [{ dest: '10.0.2.0/24 (Link 1-2)', next: 'DIRECT', metric: 1 }],
      r3Table: [{ dest: '192.168.10.0/24 (LAN 3)', next: 'DIRECT', metric: 1 }],
    },
    {
      title: 'Stage 1: First Neighbor Vector Exchange',
      desc: 'Routers broadcast UDP 520 response packets. R2 learns LAN 1 from R1 (metric 1+1=2) and LAN 3 from R3 (metric 1+1=2).',
      r1Table: [
        { dest: '10.0.1.0/24 (LAN 1)', next: 'DIRECT', metric: 1 },
        { dest: '10.0.2.0/24 (Link 1-2)', next: 'R2', metric: 2 }
      ],
      r2Table: [
        { dest: '10.0.1.0/24 (LAN 1)', next: 'R1', metric: 2 },
        { dest: '10.0.2.0/24 (Link 1-2)', next: 'DIRECT', metric: 1 },
        { dest: '192.168.10.0/24 (LAN 3)', next: 'R3', metric: 2 }
      ],
      r3Table: [
        { dest: '10.0.2.0/24 (Link 1-2)', next: 'R2', metric: 2 },
        { dest: '192.168.10.0/24 (LAN 3)', next: 'DIRECT', metric: 1 }
      ],
    },
    {
      title: 'Stage 2: Full Bellman-Ford Convergence',
      desc: 'R1 receives R2 advertisement for LAN 3 and adds it to its RIB with metric = 2 + 1 = 3 via R2. Complete network convergence achieved!',
      r1Table: [
        { dest: '10.0.1.0/24 (LAN 1)', next: 'DIRECT', metric: 1 },
        { dest: '10.0.2.0/24 (Link 1-2)', next: 'R2', metric: 2 },
        { dest: '192.168.10.0/24 (LAN 3)', next: 'R2', metric: 3 }
      ],
      r2Table: [
        { dest: '10.0.1.0/24 (LAN 1)', next: 'R1', metric: 2 },
        { dest: '10.0.2.0/24 (Link 1-2)', next: 'DIRECT', metric: 1 },
        { dest: '192.168.10.0/24 (LAN 3)', next: 'R3', metric: 2 }
      ],
      r3Table: [
        { dest: '10.0.1.0/24 (LAN 1)', next: 'R2', metric: 3 },
        { dest: '10.0.2.0/24 (Link 1-2)', next: 'R2', metric: 2 },
        { dest: '192.168.10.0/24 (LAN 3)', next: 'DIRECT', metric: 1 }
      ],
    }
  ];

  const handleNextDvStep = () => {
    sound.playClick();
    if (dvStep < dvStages.length - 1) {
      setDvStep(dvStep + 1);
    } else {
      setDvStep(0);
    }
  };

  return (
    <div className="relative text-slate-100 bg-[#050811] min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Masthead */}
        <div className="pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <FlaskConical className="w-4 h-4" />
            <span>Digital Networking Laboratory</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            Interactive Protocol Laboratory
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-400 font-serif italic max-w-3xl leading-relaxed">
            Deterministic educational simulations modeling distributed distance-vector learning, hop metric boundaries, link faults, and loop-prevention physics.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span><strong>Educational Model Notice:</strong> These interactive instruments execute accurate Bellman-Ford calculations and state machines for didactic exploration, not a production kernel daemon.</span>
          </div>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="py-6 border-b border-slate-800 flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => { sound.playClick(); setActiveTab('topology'); }}
            className={`px-4 py-2 rounded-xl border transition-all ${
              activeTab === 'topology'
                ? 'bg-sky-500/20 text-sky-300 font-bold border-sky-500/40 shadow-glow-cyan'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Exp A: Network Topology Simulator
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('distance-vector'); }}
            className={`px-4 py-2 rounded-xl border transition-all ${
              activeTab === 'distance-vector'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40 shadow-glow-emerald'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Exp B: Distance-Vector Learning
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('hop-count'); }}
            className={`px-4 py-2 rounded-xl border transition-all ${
              activeTab === 'hop-count'
                ? 'bg-amber-500/20 text-amber-300 font-bold border-amber-500/40 shadow-glow-amber'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Exp C: 15-Hop Frontier Explorer
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('failure'); }}
            className={`px-4 py-2 rounded-xl border transition-all ${
              activeTab === 'failure'
                ? 'bg-rose-500/20 text-rose-300 font-bold border-rose-500/40 shadow-glow-rose'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Exp E: Convergence Latency
          </button>
        </div>

        {/* EXPERIMENT A & D: TOPOLOGY SIMULATOR & ROUTING TABLE INSPECTOR */}
        {activeTab === 'topology' && (
          <div className="mt-8">
            <RipSimulator />
          </div>
        )}

        {/* EXPERIMENT B: DISTANCE-VECTOR STEP LEARNING */}
        {activeTab === 'distance-vector' && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-emerald-500/30">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">Experience B</span>
                <h3 className="text-2xl font-serif text-white mt-0.5">Distributed Vector Convergence Walkthrough</h3>
              </div>
              <button
                onClick={handleNextDvStep}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-glow-emerald"
              >
                <span>{dvStep < 2 ? 'Advance Next Exchange Stage' : 'Restart Walkthrough'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <span className="text-emerald-400 font-bold block text-sm">{dvStages[dvStep].title}</span>
              <p className="text-slate-300 mt-1 font-sans text-sm">{dvStages[dvStep].desc}</p>
            </div>

            {/* 3 Routers Routing Tables Comparison */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Router 1 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400 pb-2 border-b border-slate-800">
                  <span>Router R1 RIB</span>
                  <span>10.0.1.1</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono">
                  {dvStages[dvStep].r1Table.map((row, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-300">{row.dest}</div>
                      <div className="text-[11px] text-slate-500 flex justify-between mt-1">
                        <span>Hop: {row.next}</span>
                        <strong className="text-emerald-400">{row.metric} hop</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Router 2 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400 pb-2 border-b border-slate-800">
                  <span>Router R2 RIB</span>
                  <span>10.0.2.1</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono">
                  {dvStages[dvStep].r2Table.map((row, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-300">{row.dest}</div>
                      <div className="text-[11px] text-slate-500 flex justify-between mt-1">
                        <span>Hop: {row.next}</span>
                        <strong className="text-emerald-400">{row.metric} hop</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Router 3 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400 pb-2 border-b border-slate-800">
                  <span>Router R3 RIB</span>
                  <span>192.168.10.1</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono">
                  {dvStages[dvStep].r3Table.map((row, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-300">{row.dest}</div>
                      <div className="text-[11px] text-slate-500 flex justify-between mt-1">
                        <span>Hop: {row.next}</span>
                        <strong className="text-emerald-400">{row.metric} hop</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* EXPERIMENT C: HOP-COUNT EXPLORER */}
        {activeTab === 'hop-count' && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-amber-500/30">
            <div className="pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-amber-400">Experience C</span>
              <h3 className="text-2xl font-serif text-white mt-0.5">The 15-Hop Frontier & Metric Infinity</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
                Drag the slider to test RIP reachability boundaries. Watch the route transition from active valid forwarding to mathematical infinity (16).
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Tested Network Metric:</span>
                <span className={`text-xl font-bold ${explorerHops === 16 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {explorerHops} {explorerHops === 16 ? 'HOPS (INFINITY)' : 'HOPS'}
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={16}
                value={explorerHops}
                onChange={(e) => { sound.playClick(); setExplorerHops(Number(e.target.value)); }}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 Hop (Direct)</span>
                <span>8 Hops (Campus)</span>
                <span className="text-emerald-400 font-bold">15 Hops (Max Bound)</span>
                <span className="text-rose-400 font-bold">16 (Infinity)</span>
              </div>
            </div>

            {/* Visual Route Chain */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-3">Path Topology Representation:</div>
              <div className="flex items-center gap-1 overflow-x-auto py-2">
                <div className="px-3 py-1.5 rounded-lg bg-sky-950 border border-sky-800 text-xs font-mono font-bold text-sky-300 shrink-0">
                  Source (R0)
                </div>
                {Array.from({ length: explorerHops }).map((_, idx) => (
                  <React.Fragment key={idx}>
                    <span className={`w-4 h-0.5 shrink-0 ${explorerHops === 16 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    <div className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 ${
                      idx === explorerHops - 1
                        ? explorerHops === 16 ? 'bg-rose-950 border border-rose-800 text-rose-300 font-bold' : 'bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}>
                      {idx === explorerHops - 1 ? 'Target LAN' : `R${idx + 1}`}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className={`mt-6 p-4 rounded-xl border text-xs sm:text-sm font-sans leading-relaxed ${
                explorerHops === 16
                  ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                  : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
              }`}>
                {explorerHops === 16 ? (
                  <div>
                    <strong className="font-mono block mb-1">ROUTE UNREACHABLE (POISONED):</strong>
                    Metric 16 is explicitly reserved as mathematical infinity ($\infty$) in RFC 1058 and RFC 2453. The destination is purged from packet forwarding and advertised as unreachable to prevent infinite looping.
                  </div>
                ) : (
                  <div>
                    <strong className="font-mono block mb-1">ROUTE ACTIVE & FORWARDABLE:</strong>
                    Path length of {explorerHops} hops is well within the 15-hop diameter threshold. Packets will forward normally with administrative distance 120.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* EXPERIMENT E: CONVERGENCE LATENCY MODEL */}
        {activeTab === 'failure' && (
          <div className="mt-8">
            <ConvergenceCalculator />
          </div>
        )}

      </div>
    </div>
  );
};
