import React, { useState } from 'react';
import { AlertCircle, Shield, ArrowRight, RotateCcw, ChevronRight, Zap } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

export const LoopMechanicsVisualizer: React.FC = () => {
  const [splitHorizonEnabled, setSplitHorizonEnabled] = useState<boolean>(false);
  const [poisonReverseEnabled, setPoisonReverseEnabled] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const resetSimulation = () => {
    sound.playClick();
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (splitHorizonEnabled || poisonReverseEnabled) {
      if (currentStep < 2) {
        sound.playClick();
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      if (currentStep < 8) {
        sound.playPoisonAlert();
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  // Compute metrics based on step and safeguards
  let metricA = 2;
  let nextHopA = 'B';
  let metricB = 1;
  let nextHopB = 'DIRECT';
  let loopActive = false;
  let narrative = '';

  if (currentStep === 0) {
    narrative = 'Steady State: Link B-X is healthy. Router B reaches X directly (metric 1). Router A reaches X via B (metric 2).';
  } else if (currentStep === 1) {
    if (poisonReverseEnabled) {
      metricB = 16;
      nextHopB = 'NONE (DOWN)';
      metricA = 16;
      nextHopA = 'NONE';
      narrative = 'FAILURE TRIGGERED: Link B-X breaks! Router B immediately sends a Triggered Update to Router A advertising Subnet X with Metric 16 (Poison Reverse). Both routers immediately invalidate the route. Zero looping occurred!';
    } else if (splitHorizonEnabled) {
      metricB = 16;
      nextHopB = 'NONE (DOWN)';
      metricA = 16;
      nextHopA = 'NONE';
      narrative = 'FAILURE TRIGGERED: Link B-X breaks. Router A refuses to advertise X back to B because it learned X from B (Split Horizon). Router B has no alternate route and marks X unreachable. Loop prevented in 1 round!';
    } else {
      metricB = 3;
      nextHopB = 'A';
      metricA = 2;
      nextHopA = 'B';
      loopActive = true;
      narrative = 'FAILURE TRIGGERED: Link B-X breaks! But Split Horizon is OFF. Router A advertises its old cached route (metric 2) to Router B. Router B blindly accepts it: Metric = 2 + 1 = 3, Next Hop = A. A bidirectional routing loop is now born!';
    }
  } else {
    // Repeated bouncing without safeguards
    if (!splitHorizonEnabled && !poisonReverseEnabled) {
      const stepIndex = currentStep;
      if (stepIndex === 2) {
        metricA = 4;
        nextHopA = 'B';
        metricB = 3;
        narrative = 'Iteration 2: Router B advertises metric 3 to Router A. Router A updates: Metric = 3 + 1 = 4, Next Hop = B.';
      } else if (stepIndex === 3) {
        metricB = 5;
        nextHopB = 'A';
        metricA = 4;
        narrative = 'Iteration 3: Router A advertises metric 4 to Router B. Router B updates: Metric = 4 + 1 = 5, Next Hop = A. Packet ping-pongs endlessly between A and B!';
      } else if (stepIndex === 4) {
        metricA = 6;
        metricB = 7;
        narrative = 'Iteration 4: Metric increments to 6 and 7. CPU load spikes on both routers as TTL counts expire.';
      } else if (stepIndex === 5) {
        metricA = 8;
        metricB = 9;
        narrative = 'Iteration 5: Continues bouncing. Both routers believe the other has a valid path to Subnet X!';
      } else if (stepIndex === 6) {
        metricA = 12;
        metricB = 13;
        narrative = 'Iteration 6-12: The metric crawls upward step-by-step toward the ceiling limit of 16.';
      } else if (stepIndex === 7) {
        metricA = 15;
        metricB = 16;
        narrative = 'Iteration 15: Router B hits Metric 16 (Infinity!). The route is finally recognized as dead.';
      } else if (stepIndex === 8) {
        metricA = 16;
        metricB = 16;
        nextHopA = 'NONE';
        nextHopB = 'NONE';
        narrative = 'CONVERGENCE AT LAST: Router A also reaches Metric 16. The count-to-infinity sequence concludes after 16 agonizing update cycles (up to ~8 minutes of network blackhole).';
      }
      loopActive = currentStep < 8;
    }
  }

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Pathological Failure Case Study</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            The Count-to-Infinity Phenomenon & Safeguards
          </h3>
        </div>

        {/* Safeguard switches */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-full bg-[#121210] border border-[#D8CBB3]/20 hover:border-[#2F6BFF] transition-colors">
            <input
              type="checkbox"
              checked={splitHorizonEnabled}
              onChange={(e) => {
                sound.playClick();
                setSplitHorizonEnabled(e.target.checked);
                setCurrentStep(0);
              }}
              className="accent-[#2F6BFF] w-4 h-4 rounded"
            />
            <span className={splitHorizonEnabled ? "text-[#FAF7F2] font-bold" : "text-[#D8CBB3]/70"}>
              Split Horizon
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-full bg-[#121210] border border-[#D8CBB3]/20 hover:border-[#2F6BFF] transition-colors">
            <input
              type="checkbox"
              checked={poisonReverseEnabled}
              onChange={(e) => {
                sound.playClick();
                setPoisonReverseEnabled(e.target.checked);
                setCurrentStep(0);
              }}
              className="accent-[#2F6BFF] w-4 h-4 rounded"
            />
            <span className={poisonReverseEnabled ? "text-[#FAF7F2] font-bold" : "text-[#D8CBB3]/70"}>
              Poison Reverse
            </span>
          </label>
        </div>
      </div>

      {/* Network Topology Schematic */}
      <div className="my-8 p-6 bg-[#121210] rounded-xl border border-[#D8CBB3]/20 flex flex-col items-center">
        <div className="w-full max-w-xl flex items-center justify-between relative py-6">
          
          {/* Router A */}
          <div className={`p-4 rounded-xl border flex flex-col items-center transition-all ${
            loopActive ? 'border-rose-500/80 bg-rose-950/40 shadow-glow-rose' : 'border-[#2F6BFF]/60 bg-[#1E1E1C]'
          }`}>
            <span className="text-xs font-mono text-[#2F6BFF] font-bold">Router A</span>
            <div className="mt-2 text-[11px] font-mono text-[#D8CBB3]">
              <div>Metric: <strong className={metricA === 16 ? "text-rose-400" : "text-[#FAF7F2]"}>{metricA}</strong></div>
              <div>Next: <span className="text-[#D8CBB3]/60">{nextHopA}</span></div>
            </div>
          </div>

          {/* Link A-B */}
          <div className="flex-1 px-4 flex flex-col items-center">
            <div className={`w-full h-1 relative ${loopActive ? 'bg-rose-500 animate-pulse' : 'bg-[#2F6BFF]'}`}>
              {loopActive && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-600 animate-bounce font-bold">
                  LOOP ACTIVE
                </div>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#D8CBB3]/60 mt-2">1 Hop Transit</span>
          </div>

          {/* Router B */}
          <div className={`p-4 rounded-xl border flex flex-col items-center transition-all ${
            loopActive ? 'border-rose-500/80 bg-rose-950/40 shadow-glow-rose' : 'border-[#2F6BFF]/60 bg-[#1E1E1C]'
          }`}>
            <span className="text-xs font-mono text-[#2F6BFF] font-bold">Router B</span>
            <div className="mt-2 text-[11px] font-mono text-[#D8CBB3]">
              <div>Metric: <strong className={metricB === 16 ? "text-rose-400" : "text-[#FAF7F2]"}>{metricB}</strong></div>
              <div>Next: <span className="text-[#D8CBB3]/60">{nextHopB}</span></div>
            </div>
          </div>

          {/* Link B-X (The Failing Link) */}
          <div className="flex-1 px-4 flex flex-col items-center">
            <div className={`w-full h-1 border-t-2 ${currentStep === 0 ? 'border-[#2F6BFF]' : 'border-dashed border-rose-500'}`} />
            <span className={`text-[10px] font-mono mt-2 ${currentStep === 0 ? 'text-[#2F6BFF] font-bold' : 'text-rose-400 font-bold'}`}>
              {currentStep === 0 ? 'Connected' : 'SEVERED (DOWN)'}
            </span>
          </div>

          {/* Subnet X */}
          <div className={`p-4 rounded-xl border text-center ${currentStep === 0 ? 'border-[#D8CBB3]/40 bg-[#1E1E1C] text-[#FAF7F2]' : 'border-[#D8CBB3]/10 bg-[#121210] text-[#D8CBB3]/40'}`}>
            <span className="text-xs font-mono font-bold">Subnet X</span>
            <div className="text-[10px] font-mono mt-1">192.168.10.0/24</div>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="mt-4 w-full p-4 rounded-lg bg-[#1E1E1C] border border-[#D8CBB3]/15 text-xs sm:text-sm text-[#FAF7F2] font-mono leading-relaxed">
          <span className="text-[#2F6BFF] font-bold mr-2">[Step {currentStep}]:</span>
          {narrative}
        </div>

        {/* Step Controls */}
        <div className="mt-6 flex items-center gap-3">
          <LiquidButton
            onClick={nextStep}
            disabled={(!splitHorizonEnabled && !poisonReverseEnabled && currentStep >= 8) || ((splitHorizonEnabled || poisonReverseEnabled) && currentStep >= 1)}
            icon={<ChevronRight className="w-4 h-4" />}
            size="sm"
          >
            Advance Failure Step
          </LiquidButton>
          <LiquidButton
            size="sm"
            onClick={resetSimulation}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset State
          </LiquidButton>
        </div>
      </div>
    </div>
  );
};
