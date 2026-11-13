import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import { RipSimulator } from '../components/simulator/RipSimulator';
import { ConvergenceCalculator } from '../components/interactive/ConvergenceCalculator';
import { 
  FlaskConical, Network, Compass, ShieldCheck, Activity, 
  HelpCircle, ChevronRight, RotateCcw, AlertTriangle, Layers, Info, CheckCircle2 
} from 'lucide-react';
import { LiquidButton } from '../components/buttons/LiquidMetalAction';

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
    <div className="relative text-[#D8CBB3] bg-[#1E1E1C] min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Masthead */}
        <div className="pb-8 border-b border-[#D8CBB3]/15">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-2 font-bold">
            <FlaskConical className="w-4 h-4" />
            <span>Digital Networking Laboratory</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FAF7F2] tracking-tight">
            Interactive Protocol Laboratory
          </h1>
          <p className="mt-4 text-base sm:text-xl text-[#D8CBB3]/80 font-serif italic max-w-3xl leading-relaxed">
            Deterministic educational simulations modeling distributed distance-vector learning, hop metric boundaries, link faults, and loop-prevention physics.
          </p>

          <div className="mt-4 p-3.5 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 text-xs font-mono text-[#D8CBB3]/75 flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#2F6BFF] shrink-0" />
            <span><strong>Educational Model Notice:</strong> These interactive instruments execute accurate Bellman-Ford calculations and state machines for didactic exploration, not a production kernel daemon.</span>
          </div>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="py-6 border-b border-[#D8CBB3]/15 flex flex-wrap gap-2.5 text-xs font-mono">
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'topology'}
            onClick={() => setActiveTab('topology')}
          >
            Exp A: Network Topology Simulator
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'distance-vector'}
            onClick={() => setActiveTab('distance-vector')}
          >
            Exp B: Distance-Vector Learning
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'hop-count'}
            onClick={() => setActiveTab('hop-count')}
          >
            Exp C: 15-Hop Frontier Explorer
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'failure'}
            onClick={() => setActiveTab('failure')}
          >
            Exp E: Convergence Latency
          </LiquidButton>
        </div>

        {/* EXPERIMENT A & D: TOPOLOGY SIMULATOR & ROUTING TABLE INSPECTOR */}
        {activeTab === 'topology' && (
          <div className="mt-8">
            <RipSimulator />
          </div>
        )}

        {/* EXPERIMENT B: DISTANCE-VECTOR STEP LEARNING */}
        {activeTab === 'distance-vector' && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/20 shadow-liquid-glass">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D8CBB3]/15">
              <div>
                <span className="text-xs font-mono uppercase text-[#2F6BFF] font-bold">Experience B</span>
                <h3 className="text-2xl font-serif text-[#FAF7F2] mt-0.5">Distributed Vector Convergence Walkthrough</h3>
              </div>
              <LiquidButton
                onClick={handleNextDvStep}
                size="sm"
                icon={<ChevronRight className="w-4 h-4" />}
              >
                {dvStep < 2 ? 'Advance Next Exchange Stage' : 'Restart Walkthrough'}
              </LiquidButton>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 font-mono text-xs">
              <span className="text-[#2F6BFF] font-bold block text-sm">{dvStages[dvStep].title}</span>
              <p className="text-[#D8CBB3] mt-1 font-sans text-sm">{dvStages[dvStep].desc}</p>
            </div>

            {/* 3 Routers Routing Tables Comparison */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Router 1 */}
              <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2F6BFF] pb-2 border-b border-[#D8CBB3]/15">
                  <span>Router R1 RIB</span>
                  <span className="text-[#D8CBB3]/60 font-normal">10.0.1.1</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono">
                  {dvStages[dvStep].r1Table.map((row, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#121210] border border-[#D8CBB3]/15">
                      <div className="text-[#FAF7F2] font-medium">{row.dest}</div>
                      <div className="text-[11px] text-[#D8CBB3]/70 flex justify-between mt-1.5">
                        <span>Hop: {row.next}</span>
                        <strong className="text-[#2F6BFF]">{row.metric} hop</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Router 2 */}
              <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2F6BFF] pb-2 border-b border-[#D8CBB3]/15">
                  <span>Router R2 RIB</span>
                  <span className="text-[#D8CBB3]/60 font-normal">10.0.2.1</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono">
                  {dvStages[dvStep].r2Table.map((row, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#121210] border border-[#D8CBB3]/15">
                      <div className="text-[#FAF7F2] font-medium">{row.dest}</div>
                      <div className="text-[11px] text-[#D8CBB3]/70 flex justify-between mt-1.5">
                        <span>Hop: {row.next}</span>
                        <strong className="text-[#2F6BFF]">{row.metric} hop</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Router 3 */}
              <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2F6BFF] pb-2 border-b border-[#D8CBB3]/15">
                  <span>Router R3 RIB</span>
                  <span className="text-[#D8CBB3]/60 font-normal">192.168.10.1</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono">
                  {dvStages[dvStep].r3Table.map((row, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#121210] border border-[#D8CBB3]/15">
                      <div className="text-[#FAF7F2] font-medium">{row.dest}</div>
                      <div className="text-[11px] text-[#D8CBB3]/70 flex justify-between mt-1.5">
                        <span>Hop: {row.next}</span>
                        <strong className="text-[#2F6BFF]">{row.metric} hop</strong>
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
          <div className="mt-8 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/20 shadow-liquid-glass">
            <div className="pb-4 border-b border-[#D8CBB3]/15">
              <span className="text-xs font-mono uppercase text-[#2F6BFF] font-bold">Experience C</span>
              <h3 className="text-2xl font-serif text-[#FAF7F2] mt-0.5">The 15-Hop Frontier & Metric Infinity</h3>
              <p className="text-[#D8CBB3]/80 text-xs sm:text-sm mt-1 font-sans">
                Drag the slider to test RIP reachability boundaries. Watch the route transition from active valid forwarding to mathematical infinity (16).
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#D8CBB3]/80">Tested Network Metric:</span>
                <span className={`text-xl font-bold ${explorerHops === 16 ? 'text-rose-400' : 'text-[#2F6BFF]'}`}>
                  {explorerHops} {explorerHops === 16 ? 'HOPS (INFINITY)' : 'HOPS'}
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={16}
                value={explorerHops}
                onChange={(e) => { sound.playClick(); setExplorerHops(Number(e.target.value)); }}
                className="w-full h-2.5 bg-[#121210] border border-[#D8CBB3]/25 rounded-lg appearance-none cursor-pointer accent-[#2F6BFF]"
              />

              <div className="flex justify-between text-[11px] font-mono text-[#D8CBB3]/60">
                <span>1 Hop (Direct)</span>
                <span>8 Hops (Campus)</span>
                <span className="text-[#2F6BFF] font-bold">15 Hops (Max Bound)</span>
                <span className="text-rose-400 font-bold">16 (Infinity)</span>
              </div>
            </div>

            {/* Visual Route Chain */}
            <div className="mt-8 p-6 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20">
              <div className="text-xs font-mono text-[#D8CBB3]/75 mb-3">Path Topology Representation:</div>
              <div className="flex items-center gap-1 overflow-x-auto py-2">
                <div className="px-3 py-1.5 rounded-lg bg-[#2F6BFF]/20 border border-[#2F6BFF]/60 text-xs font-mono font-bold text-[#FAF7F2] shrink-0">
                  Source (R0)
                </div>
                {Array.from({ length: explorerHops }).map((_, idx) => (
                  <React.Fragment key={idx}>
                    <span className={`w-4 h-0.5 shrink-0 ${explorerHops === 16 ? 'bg-rose-500' : 'bg-[#2F6BFF]'}`} />
                    <div className={`px-2.5 py-1 rounded text-[10px] font-mono shrink-0 ${
                      idx === explorerHops - 1
                        ? explorerHops === 16 
                          ? 'bg-rose-950/80 border border-rose-600 text-rose-300 font-bold' 
                          : 'bg-[#2F6BFF]/25 border border-[#2F6BFF] text-[#FAF7F2] font-bold'
                        : 'bg-[#1E1E1C] border border-[#D8CBB3]/25 text-[#D8CBB3]'
                    }`}>
                      {idx === explorerHops - 1 ? 'Target LAN' : `R${idx + 1}`}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className={`mt-6 p-4 rounded-xl border text-xs sm:text-sm font-sans leading-relaxed ${
                explorerHops === 16
                  ? 'bg-rose-950/30 border-rose-800 text-rose-300'
                  : 'bg-[#2F6BFF]/10 border-[#2F6BFF]/30 text-[#D8CBB3]'
              }`}>
                {explorerHops === 16 ? (
                  <div>
                    <strong className="font-mono block mb-1 text-rose-400">ROUTE UNREACHABLE (POISONED):</strong>
                    Metric 16 is explicitly reserved as mathematical infinity ($\infty$) in RFC 1058 and RFC 2453. The destination is purged from packet forwarding and advertised as unreachable to prevent infinite looping.
                  </div>
                ) : (
                  <div>
                    <strong className="font-mono block mb-1 text-[#2F6BFF]">ROUTE ACTIVE & FORWARDABLE:</strong>
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
