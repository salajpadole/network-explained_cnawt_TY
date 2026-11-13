import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

export const TimerLifecycleVisualizer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(5); // 5x real-time

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 260) {
            setIsPlaying(false);
            return 260;
          }
          const next = prev + 1;
          if (next === 30 || next === 60 || next === 90 || next === 120 || next === 150) {
            sound.playClick();
          } else if (next === 180) {
            sound.playPoisonAlert();
          } else if (next === 240) {
            sound.playConvergenceChime();
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleTogglePlay = () => {
    sound.playClick();
    if (seconds >= 260) {
      setSeconds(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    sound.playClick();
    setIsPlaying(false);
    setSeconds(0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(Number(e.target.value));
  };

  // Determine State
  let routeStatus = 'HEALTHY & ACTIVE';
  let routeMetric = 1;
  let statusColor = 'text-[#FAF7F2] bg-[#2F6BFF]/20 border-[#2F6BFF]/50 shadow-glow-electric';
  let explanation = 'Periodic update arrives every ~30s (with +/- 15% random jitter). Route metric remains optimal at 1 hop.';

  if (seconds > 0 && seconds < 180) {
    const missed = Math.floor(seconds / 30);
    routeStatus = `AGING (${missed} MISSED UPDATES)`;
    routeMetric = 1;
    statusColor = missed > 2 
      ? 'text-amber-300 bg-amber-950/60 border-amber-600' 
      : 'text-[#FAF7F2] bg-[#2F6BFF]/20 border-[#2F6BFF]/50';
    explanation = `Neighbor has failed to broadcast for ${seconds}s. Router maintains the route in case the neighbor recovers, counting up to 180s (6 missed updates).`;
  } else if (seconds >= 180 && seconds < 240) {
    routeStatus = 'ROUTE TIMEOUT / INVALID (POISONED)';
    routeMetric = 16;
    statusColor = 'text-rose-400 bg-rose-950/60 border-rose-600 animate-pulse font-bold';
    explanation = '180s expired without an update! Router marks metric as 16 (Infinity/Unreachable) and transmits immediate Triggered Updates to advertise poison reverse to neighbors.';
  } else if (seconds >= 240) {
    routeStatus = 'PURGED (GARBAGE COLLECTED)';
    routeMetric = -1;
    statusColor = 'text-[#D8CBB3]/50 bg-[#121210] border-[#D8CBB3]/20';
    explanation = '240s total elapsed (60s in poisoned state). The route is permanently expunged from the Routing Information Base (RIB).';
  }

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Clock className="w-4 h-4" />
            <span>Temporal Mechanics • RFC 2453 Section 3.8</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            RIP Route Lifecycle & Timer Engine
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <LiquidButton
            size="sm"
            onClick={handleTogglePlay}
            isActive={isPlaying}
            icon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {isPlaying ? 'Pause' : 'Simulate'}
          </LiquidButton>

          <LiquidButton
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            title="Reset to 0s"
          >
            Reset
          </LiquidButton>

          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-[#121210] border border-[#D8CBB3]/25 rounded-xl text-xs font-mono text-[#FAF7F2] px-2.5 py-2 focus:outline-none focus:border-[#2F6BFF]"
          >
            <option value={1}>1x Speed</option>
            <option value={5}>5x Speed</option>
            <option value={15}>15x Speed</option>
            <option value={30}>30x Turbo</option>
          </select>
        </div>
      </div>

      {/* Scrubbable Timeline Track */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#D8CBB3]">Elapsed Silence: <strong className="text-[#FAF7F2] text-sm">{seconds}s</strong></span>
          <span className="text-[#D8CBB3]/60">Max Timeline: 260s</span>
        </div>

        <input
          type="range"
          min={0}
          max={260}
          value={seconds}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-[#121210] border border-[#D8CBB3]/20 rounded-lg appearance-none cursor-pointer accent-[#2F6BFF]"
        />

        {/* Milestone Markers */}
        <div className="relative w-full h-8 text-[11px] font-mono text-[#D8CBB3]/60 select-none">
          <div className="absolute left-[0%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-1 h-2 bg-[#2F6BFF] mb-1" />
            <span className="text-[#2F6BFF] font-bold">0s</span>
          </div>
          <div className="absolute left-[11.5%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-1 h-2 bg-[#D8CBB3] mb-1" />
            <span>30s Update</span>
          </div>
          <div className="absolute left-[69.2%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-1 h-2 bg-rose-500 mb-1" />
            <span className="text-rose-400 font-semibold">180s Invalid</span>
          </div>
          <div className="absolute left-[92.3%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-1 h-2 bg-amber-500 mb-1" />
            <span className="text-amber-400 font-semibold">240s Flush</span>
          </div>
        </div>
      </div>

      {/* Real-time State Card */}
      <div className="mt-6 p-5 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Route Table entry */}
        <div className="p-3 rounded-lg bg-[#1E1E1C] border border-[#D8CBB3]/15 font-mono text-xs">
          <span className="text-[#D8CBB3]/60 block text-[10px] uppercase font-bold">RIB Entry for 192.168.1.0/24:</span>
          <div className="mt-2 space-y-1 text-[#D8CBB3]">
            <div>Prefix: <span className="text-[#FAF7F2]">192.168.1.0/24</span></div>
            <div>Next Hop: <span className="text-[#2F6BFF] font-semibold">10.0.12.2 (R2)</span></div>
            <div>
              Hop Metric: {routeMetric === -1 ? (
                <span className="text-[#D8CBB3]/40 italic">[PURGED / NONE]</span>
              ) : routeMetric === 16 ? (
                <span className="text-rose-400 font-bold">16 (INFINITY)</span>
              ) : (
                <span className="text-[#2F6BFF] font-bold">{routeMetric} Hop</span>
              )}
            </div>
          </div>
        </div>

        {/* Current State Status */}
        <div className="p-3 rounded-lg bg-[#1E1E1C] border border-[#D8CBB3]/15 flex flex-col justify-between">
          <span className="text-[#D8CBB3]/60 text-[10px] font-mono uppercase font-bold">Protocol State Machine:</span>
          <div className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-center border ${statusColor}`}>
            {routeStatus}
          </div>
          <div className="text-[11px] font-mono text-[#D8CBB3]/70 mt-2">
            Periodic Jitter: <span className="text-[#2F6BFF] font-bold">25.5s - 34.5s</span>
          </div>
        </div>

        {/* Explanation */}
        <div className="p-3 rounded-lg bg-[#1E1E1C] border border-[#D8CBB3]/15 text-xs">
          <span className="text-[#2F6BFF] text-[10px] font-mono uppercase block mb-1 font-bold">State Analysis:</span>
          <p className="text-[#D8CBB3] leading-relaxed font-sans">
            {explanation}
          </p>
        </div>

      </div>

      {/* Sally Floyd Jitter Callout */}
      <div className="mt-4 p-4 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 text-xs text-[#D8CBB3] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#2F6BFF] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#FAF7F2] font-mono">The Floyd-Jacobson Jitter Imperative:</strong> Every 30s update timer is subjected to a randomized jitter of ±15% (between 25.5 and 34.5 seconds). Without this randomization, interconnected routers on a common Ethernet broadcast medium would spontaneously synchronize their timer crystals over hours of operation, causing periodic broadcast congestion storms.
        </p>
      </div>

    </div>
  );
};
