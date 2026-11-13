import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

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
            // Heartbeat ticks
            sound.playClick();
          } else if (next === 180) {
            // Invalid alert
            sound.playPoisonAlert();
          } else if (next === 240) {
            // Purge chime
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
  let statusColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
  let explanation = 'Periodic update arrives every ~30s (with +/- 15% random jitter). Route metric remains optimal at 1 hop.';

  if (seconds > 0 && seconds < 180) {
    const missed = Math.floor(seconds / 30);
    routeStatus = `AGING (${missed} MISSED UPDATES)`;
    routeMetric = 1;
    statusColor = missed > 2 
      ? 'text-amber-400 bg-amber-950/60 border-amber-800' 
      : 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
    explanation = `Neighbor has failed to broadcast for ${seconds}s. Router maintains the route in case the neighbor recovers, counting up to 180s (6 missed updates).`;
  } else if (seconds >= 180 && seconds < 240) {
    routeStatus = 'ROUTE TIMEOUT / INVALID (POISONED)';
    routeMetric = 16;
    statusColor = 'text-rose-400 bg-rose-950/60 border-rose-800 animate-pulse';
    explanation = '180s expired without an update! Router marks metric as 16 (Infinity/Unreachable) and transmits immediate Triggered Updates to advertise poison reverse to neighbors.';
  } else if (seconds >= 240) {
    routeStatus = 'PURGED (GARBAGE COLLECTED)';
    routeMetric = -1;
    statusColor = 'text-slate-400 bg-slate-900 border-slate-800';
    explanation = '240s total elapsed (60s in poisoned state). The route is permanently expunged from the Routing Information Base (RIB).';
  }

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Clock className="w-4 h-4" />
            <span>Temporal Mechanics • RFC 2453 Section 3.8</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            RIP Route Lifecycle & Timer Engine
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-glow-cyan"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Simulate'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            title="Reset to 0s"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 px-2 py-1.5 focus:outline-none focus:border-sky-500"
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
          <span className="text-slate-400">Elapsed Silence: <strong className="text-white text-sm">{seconds}s</strong></span>
          <span className="text-slate-500">Max Timeline: 260s</span>
        </div>

        <input
          type="range"
          min={0}
          max={260}
          value={seconds}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />

        {/* Milestone Markers */}
        <div className="relative w-full h-8 text-[11px] font-mono text-slate-500 select-none">
          <div className="absolute left-[0%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-1 h-2 bg-emerald-500 mb-1" />
            <span className="text-emerald-400">0s</span>
          </div>
          <div className="absolute left-[11.5%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="w-1 h-2 bg-sky-500 mb-1" />
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
      <div className="mt-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Route Table entry */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 font-mono text-xs">
          <span className="text-slate-500 block text-[10px] uppercase">RIB Entry for 192.168.1.0/24:</span>
          <div className="mt-2 space-y-1 text-slate-300">
            <div>Prefix: <span className="text-white">192.168.1.0/24</span></div>
            <div>Next Hop: <span className="text-sky-300">10.0.12.2 (R2)</span></div>
            <div>
              Hop Metric: {routeMetric === -1 ? (
                <span className="text-slate-500 italic">[PURGED / NONE]</span>
              ) : routeMetric === 16 ? (
                <span className="text-rose-400 font-bold">16 (INFINITY)</span>
              ) : (
                <span className="text-emerald-400 font-bold">{routeMetric} Hop</span>
              )}
            </div>
          </div>
        </div>

        {/* Current State Status */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-slate-500 text-[10px] font-mono uppercase">Protocol State Machine:</span>
          <div className={`mt-2 px-3 py-1.5 rounded text-xs font-mono font-bold text-center border ${statusColor}`}>
            {routeStatus}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2">
            Periodic Jitter: <span className="text-sky-400">25.5s - 34.5s</span>
          </div>
        </div>

        {/* Explanation */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
          <span className="text-sky-400 text-[10px] font-mono uppercase block mb-1">State Analysis:</span>
          <p className="text-slate-300 leading-relaxed font-sans">
            {explanation}
          </p>
        </div>

      </div>

      {/* Sally Floyd Jitter Callout */}
      <div className="mt-4 p-4 rounded-xl bg-sky-950/20 border border-sky-800/40 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-sky-300 font-mono">The Floyd-Jacobson Jitter Imperative:</strong> Every 30s update timer is subjected to a randomized jitter of ±15% (between 25.5 and 34.5 seconds). Without this randomization, interconnected routers on a common Ethernet broadcast medium would spontaneously synchronize their timer crystals over hours of operation, causing periodic broadcast congestion storms.
        </p>
      </div>

    </div>
  );
};
