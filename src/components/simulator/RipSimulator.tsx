import React, { useState, useEffect, useRef } from 'react';
import { TOPOLOGY_PRESETS } from '../../data/topologyPresets';
import { RouterNode, NetworkLink, AnimatedPacket, SimulationEvent, SafeguardsConfig } from '../../types/network';
import { RouterInspectorModal } from './RouterInspectorModal';
import { 
  Play, Pause, RotateCcw, ChevronRight, Zap, Shield, ShieldAlert, 
  Send, Activity, Server, Radio, AlertTriangle, Eye, Layers, Settings2 
} from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export const RipSimulator: React.FC = () => {
  // Preset selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>('linear');
  const activePreset = TOPOLOGY_PRESETS.find((p) => p.id === selectedPresetId) || TOPOLOGY_PRESETS[0];

  // Simulator state
  const [routers, setRouters] = useState<RouterNode[]>(() => JSON.parse(JSON.stringify(activePreset.routers)));
  const [links, setLinks] = useState<NetworkLink[]>(() => JSON.parse(JSON.stringify(activePreset.links)));
  const [safeguards, setSafeguards] = useState<SafeguardsConfig>({
    splitHorizon: false,
    poisonReverse: false,
    triggeredUpdates: true,
    holddownTimers: false
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [iterationRound, setIterationRound] = useState<number>(0);
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [inspectedRouter, setInspectedRouter] = useState<RouterNode | null>(null);

  // Packet injection state
  const [sourceRouterId, setSourceRouterId] = useState<string>('R1');
  const [targetSubnet, setTargetSubnet] = useState<string>('192.168.10.0/24');
  const [activePackets, setActivePackets] = useState<AnimatedPacket[]>([]);
  const [packetFeedback, setPacketFeedback] = useState<string | null>(null);

  // When preset changes, reset routers and links
  useEffect(() => {
    const preset = TOPOLOGY_PRESETS.find((p) => p.id === selectedPresetId) || TOPOLOGY_PRESETS[0];
    setRouters(JSON.parse(JSON.stringify(preset.routers)));
    setLinks(JSON.parse(JSON.stringify(preset.links)));
    setIterationRound(0);
    setActivePackets([]);
    setPacketFeedback(null);
    setEvents([
      {
        id: 'init-' + Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        type: 'convergence',
        message: `Topology initialized: ${preset.name}. Ready for fault injection.`
      }
    ]);
  }, [selectedPresetId]);

  // Handle continuous simulation timer
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = window.setInterval(() => {
        executeBellmanFordStep();
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isRunning, routers, links, safeguards]);

  // Log helper
  const addEvent = (type: SimulationEvent['type'], message: string, routerId?: string) => {
    setEvents((prev) => [
      {
        id: 'evt-' + Date.now() + '-' + Math.random(),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
        routerId
      },
      ...prev.slice(0, 30) // retain last 30
    ]);
  };

  // Toggle link status UP / DOWN (Fault injection)
  const toggleLinkStatus = (linkId: string) => {
    sound.playClick();
    setLinks((prevLinks) => {
      return prevLinks.map((link) => {
        if (link.id === linkId) {
          const nextStatus = link.status === 'up' ? 'down' : 'up';
          if (nextStatus === 'down') {
            sound.playPoisonAlert();
            addEvent('link_failure', `FAULT INJECTED: Link ${link.id} is now SEVERED (DOWN)!`, link.source);
          } else {
            sound.playConvergenceChime();
            addEvent('link_recovery', `RECOVERY: Link ${link.id} is RESTORED (UP).`, link.source);
          }
          return { ...link, status: nextStatus };
        }
        return link;
      });
    });

    // If triggered updates enabled, trigger step immediately
    if (safeguards.triggeredUpdates) {
      setTimeout(() => {
        executeBellmanFordStep();
      }, 300);
    }
  };

  // The Core Bellman-Ford Distributed Step Engine
  const executeBellmanFordStep = () => {
    sound.playClick();
    setIterationRound((prev) => prev + 1);

    setRouters((currentRouters) => {
      // Deep clone routers
      const nextRouters: RouterNode[] = JSON.parse(JSON.stringify(currentRouters));

      // For every link that is DOWN, mark routes that depend directly on that interface
      links.forEach((link) => {
        if (link.status === 'down') {
          // If link R2-R3 is down, R2 cannot reach R3 directly
          nextRouters.forEach((r) => {
            if (r.id === link.source || r.id === link.target) {
              const otherId = r.id === link.source ? link.target : link.source;
              r.routingTable.forEach((entry) => {
                if (entry.nextHop === otherId) {
                  entry.metric = 16;
                  entry.status = 'poisoned';
                }
              });
            }
          });
        }
      });

      // Now simulate RIP updates across all active UP links
      links.forEach((link) => {
        if (link.status !== 'up') return;

        const routerA = nextRouters.find((r) => r.id === link.source);
        const routerB = nextRouters.find((r) => r.id === link.target);
        if (!routerA || !routerB) return;

        // Router A sends to Router B
        exchangeVector(routerA, routerB, link.targetInterface, safeguards, addEvent);

        // Router B sends to Router A
        exchangeVector(routerB, routerA, link.sourceInterface, safeguards, addEvent);
      });

      return nextRouters;
    });
  };

  // Helper: Vector exchange between two neighbor routers
  const exchangeVector = (
    sender: RouterNode,
    receiver: RouterNode,
    ingressInterface: string,
    safeguards: SafeguardsConfig,
    logFn: (type: SimulationEvent['type'], message: string, routerId?: string) => void
  ) => {
    sender.routingTable.forEach((senderRoute) => {
      let advertisedMetric = senderRoute.metric;

      // Check Split Horizon
      const routeLearnedFromReceiver = senderRoute.nextHop === receiver.id;

      if (routeLearnedFromReceiver) {
        if (safeguards.poisonReverse) {
          // Poison Reverse: explicitly advertise metric 16 back to neighbor
          advertisedMetric = 16;
        } else if (safeguards.splitHorizon) {
          // Standard Split Horizon: omit/suppress route entirely
          return;
        }
      }

      // Receiver evaluates Bellman-Ford equation:
      // D_r(dest) = min { c(r, s) + D_s(dest) }
      const newComputedMetric = Math.min(16, advertisedMetric + 1);

      const existingRoute = receiver.routingTable.find((r) => r.destination === senderRoute.destination);

      if (!existingRoute) {
        // New route discovered
        if (newComputedMetric < 16) {
          receiver.routingTable.push({
            destination: senderRoute.destination,
            networkName: senderRoute.networkName,
            nextHop: sender.id,
            metric: newComputedMetric,
            learnedViaInterface: ingressInterface,
            lastUpdated: Date.now(),
            status: 'active'
          });
          logFn('update', `${receiver.id} learned new route to ${senderRoute.destination} via ${sender.id} (Metric ${newComputedMetric})`, receiver.id);
        }
      } else {
        // Route already exists
        const isFromCurrentNextHop = existingRoute.nextHop === sender.id;

        if (isFromCurrentNextHop) {
          // If the update comes from the CURRENT next-hop, accept whatever metric they report!
          if (existingRoute.metric !== newComputedMetric) {
            const oldMetric = existingRoute.metric;
            existingRoute.metric = newComputedMetric;
            existingRoute.status = newComputedMetric >= 16 ? 'poisoned' : 'active';
            
            if (newComputedMetric > oldMetric && newComputedMetric < 16) {
              logFn('loop_detected', `COUNT-TO-INFINITY: ${receiver.id} metric for ${existingRoute.destination} inflated from ${oldMetric} to ${newComputedMetric} via ${sender.id}!`, receiver.id);
            } else if (newComputedMetric >= 16) {
              logFn('poison', `${receiver.id} marked ${existingRoute.destination} as INFINITY (16 / Unreachable).`, receiver.id);
            }
          }
        } else {
          // Update comes from an ALTERNATE neighbor
          if (newComputedMetric < existingRoute.metric) {
            existingRoute.metric = newComputedMetric;
            existingRoute.nextHop = sender.id;
            existingRoute.learnedViaInterface = ingressInterface;
            existingRoute.status = 'active';
            logFn('update', `BETTER ROUTE: ${receiver.id} switched next hop for ${existingRoute.destination} to ${sender.id} (New Metric ${newComputedMetric})`, receiver.id);
          }
        }
      }
    });
  };

  // Send Test Packet across network hop-by-hop
  const handleInjectPacket = () => {
    sound.playClick();
    const sourceRouter = routers.find((r) => r.id === sourceRouterId);
    if (!sourceRouter) return;

    // Check routing table of source
    const route = sourceRouter.routingTable.find((r) => r.destination === targetSubnet);

    if (!route || route.metric >= 16 || route.nextHop === 'NONE') {
      sound.playPoisonAlert();
      setPacketFeedback(`PACKET DROPPED AT ${sourceRouter.id}: Destination ${targetSubnet} is marked Metric 16 (Infinity/Unreachable) in local RIB.`);
      addEvent('loop_detected', `Packet dropped at ${sourceRouter.id}: Route to ${targetSubnet} unreachable.`, sourceRouter.id);
      return;
    }

    sound.playPacketHop();
    addEvent('packet_delivered', `Packet injected at ${sourceRouter.id} bound for ${targetSubnet}. Next hop: ${route.nextHop}`, sourceRouter.id);

    // Build the forwarding path
    const hopPath: string[] = [sourceRouter.id];
    let currentId = sourceRouter.id;
    let totalHops = 0;
    let loopDetected = false;

    while (totalHops < 16) {
      const currentRouter = routers.find((r) => r.id === currentId);
      if (!currentRouter) break;

      const currentRoute = currentRouter.routingTable.find((r) => r.destination === targetSubnet);
      if (!currentRoute || currentRoute.metric >= 16) {
        setPacketFeedback(`PACKET DROPPED: Router ${currentId} has no valid path to ${targetSubnet} (Metric 16).`);
        return;
      }

      if (currentRoute.nextHop === 'DIRECT') {
        hopPath.push(targetSubnet);
        break;
      }

      // Check for link failure on outgoing link
      const outgoingLink = links.find(
        (l) => (l.source === currentId && l.target === currentRoute.nextHop) ||
               (l.target === currentId && l.source === currentRoute.nextHop)
      );

      if (!outgoingLink || outgoingLink.status === 'down') {
        sound.playPoisonAlert();
        setPacketFeedback(`LINK FAILURE DROP: Link between ${currentId} and ${currentRoute.nextHop} is down!`);
        return;
      }

      currentId = currentRoute.nextHop;
      if (hopPath.includes(currentId)) {
        loopDetected = true;
        hopPath.push(currentId);
        break;
      }
      hopPath.push(currentId);
      totalHops++;
    }

    if (loopDetected) {
      sound.playPoisonAlert();
      setPacketFeedback(`ROUTING LOOP DETECTED! Packet ping-pongs infinitely: ${hopPath.join(' → ')}. TTL expired!`);
    } else {
      sound.playConvergenceChime();
      setPacketFeedback(`PACKET DELIVERED SUCCESSFULLY! Traversed ${hopPath.length - 1} hops: ${hopPath.join(' → ')}`);
    }
  };

  // Reset entire topology
  const handleResetTopology = () => {
    sound.playClick();
    const preset = TOPOLOGY_PRESETS.find((p) => p.id === selectedPresetId) || TOPOLOGY_PRESETS[0];
    setRouters(JSON.parse(JSON.stringify(preset.routers)));
    setLinks(JSON.parse(JSON.stringify(preset.links)));
    setIterationRound(0);
    setIsRunning(false);
    setActivePackets([]);
    setPacketFeedback(null);
    addEvent('convergence', 'Simulation state reset to baseline.');
  };

  return (
    <div id="simulator" className="my-14 rounded-2xl glass-panel-elevated border border-sky-500/40 p-4 sm:p-6 md:p-8 scroll-mt-20">
      
      {/* Masthead of Simulator */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Interactive Laboratory Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
            The Interactive RIP Network Simulator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif italic max-w-xl">
            Sever links with a single click, observe packet movement, inspect live hardware routing tables, and test loop safeguards.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">Topology:</span>
          <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
            {TOPOLOGY_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => { sound.playClick(); setSelectedPresetId(p.id); }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  selectedPresetId === p.id 
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 shadow-glow-cyan' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Demo Pill */}
      <div className="mt-4 p-3 rounded-xl bg-sky-950/20 border border-sky-800/30 text-xs font-mono text-sky-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span><strong>Guided Experiment:</strong> {activePreset.recommendedDemo}</span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider hidden md:inline">Round: {iterationRound}</span>
      </div>

      {/* Simulator Control Toolbar */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { sound.playClick(); setIsRunning(!isRunning); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-glow-cyan'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Halt Simulation' : 'Run Continuous'}</span>
          </button>

          <button
            onClick={executeBellmanFordStep}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs transition-colors"
            title="Step 1 Bellman-Ford Iteration"
          >
            <ChevronRight className="w-4 h-4 text-sky-400" />
            <span>Step Update</span>
          </button>

          <button
            onClick={handleResetTopology}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Reset Topology to Initial Convergence"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Safeguard Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <input
              type="checkbox"
              checked={safeguards.splitHorizon}
              onChange={(e) => {
                sound.playClick();
                setSafeguards((s) => ({ ...s, splitHorizon: e.target.checked }));
              }}
              className="accent-emerald-500 w-3.5 h-3.5 rounded"
            />
            <span className={safeguards.splitHorizon ? "text-emerald-400 font-bold" : "text-slate-400"}>
              Split Horizon
            </span>
          </label>

          <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <input
              type="checkbox"
              checked={safeguards.poisonReverse}
              onChange={(e) => {
                sound.playClick();
                setSafeguards((s) => ({ ...s, poisonReverse: e.target.checked }));
              }}
              className="accent-sky-500 w-3.5 h-3.5 rounded"
            />
            <span className={safeguards.poisonReverse ? "text-sky-400 font-bold" : "text-slate-400"}>
              Poison Reverse
            </span>
          </label>

          <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <input
              type="checkbox"
              checked={safeguards.triggeredUpdates}
              onChange={(e) => {
                sound.playClick();
                setSafeguards((s) => ({ ...s, triggeredUpdates: e.target.checked }));
              }}
              className="accent-amber-500 w-3.5 h-3.5 rounded"
            />
            <span className={safeguards.triggeredUpdates ? "text-amber-400 font-bold" : "text-slate-400"}>
              Triggered Updates
            </span>
          </label>
        </div>

      </div>

      {/* Interactive Topology Graph Canvas */}
      <div className="relative mt-6 rounded-2xl bg-[#06090F] border border-slate-800 p-4 sm:p-6 overflow-hidden min-h-[380px] select-none flex items-center justify-center">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* SVG Drawing Layer for Links and Packets */}
        <svg className="w-full h-[360px] max-w-[800px] overflow-visible">
          {/* Render Links */}
          {links.map((link) => {
            const r1 = routers.find((r) => r.id === link.source);
            const r2 = routers.find((r) => r.id === link.target);
            if (!r1 || !r2) return null;

            const isDown = link.status === 'down';
            const midX = (r1.x + r2.x) / 2;
            const midY = (r1.y + r2.y) / 2;

            return (
              <g key={link.id} className="cursor-pointer" onClick={() => toggleLinkStatus(link.id)}>
                {/* Link line */}
                <line
                  x1={r1.x}
                  y1={r1.y}
                  x2={r2.x}
                  y2={r2.y}
                  stroke={isDown ? '#EF4444' : '#38BDF8'}
                  strokeWidth={isDown ? '3' : '3.5'}
                  strokeDasharray={isDown ? '6,6' : 'none'}
                  className={isDown ? 'animate-pulse' : 'transition-all duration-300'}
                  opacity={isDown ? 0.7 : 0.85}
                />

                {/* Clickable fault injection pill */}
                <rect
                  x={midX - 35}
                  y={midY - 14}
                  width="70"
                  height="26"
                  rx="6"
                  fill={isDown ? '#450a0a' : '#0B1528'}
                  stroke={isDown ? '#dc2626' : '#1e3a8a'}
                  strokeWidth="1.5"
                />
                <text
                  x={midX}
                  y={midY + 3.5}
                  textAnchor="middle"
                  fill={isDown ? '#fca5a5' : '#93c5fd'}
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                >
                  {isDown ? 'SEVERED' : 'UP (1 Hop)'}
                </text>
              </g>
            );
          })}

          {/* Render Routers */}
          {routers.map((router) => {
            const hasPoisonedRoute = router.routingTable.some((r) => r.metric >= 16);

            return (
              <g 
                key={router.id} 
                className="cursor-pointer group"
                onClick={() => { sound.playClick(); setInspectedRouter(router); }}
              >
                {/* Router Outer Glow Circle */}
                <circle
                  cx={router.x}
                  cy={router.y}
                  r="36"
                  fill="#0B0F17"
                  stroke={hasPoisonedRoute ? '#EF4444' : '#38BDF8'}
                  strokeWidth={hasPoisonedRoute ? '2.5' : '2'}
                  className="transition-all duration-300 group-hover:stroke-sky-300"
                />

                {/* Router Label */}
                <text
                  x={router.x}
                  y={router.y - 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="15"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                >
                  {router.label}
                </text>

                {/* Router Subnet indicator */}
                <text
                  x={router.x}
                  y={router.y + 12}
                  textAnchor="middle"
                  fill={hasPoisonedRoute ? '#fca5a5' : '#38bdf8'}
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {hasPoisonedRoute ? 'POISONED' : 'CONVERGED'}
                </text>

                {/* Inspection Hint */}
                <rect
                  x={router.x - 28}
                  y={router.y + 42}
                  width="56"
                  height="16"
                  rx="4"
                  fill="#0F172A"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <text
                  x={router.x}
                  y={router.y + 53}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  Inspect RIB
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive Overlay Hints */}
        <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-500 flex items-center gap-4">
          <span>• Click any <strong>Link</strong> to break or heal it</span>
          <span>• Click any <strong>Router</strong> to inspect its full Routing Table</span>
        </div>
      </div>

      {/* Packet Injection Workbench */}
      <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
            <Send className="w-4 h-4 text-sky-400" />
            <span>Packet Injection & Forwarding Verifier</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Traces real Layer 3 routing decision along active next-hops
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Source:</span>
            <select
              value={sourceRouterId}
              onChange={(e) => setSourceRouterId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono focus:outline-none focus:border-sky-500"
            >
              {routers.map((r) => (
                <option key={r.id} value={r.id}>{r.name} ({r.id})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Target Prefix:</span>
            <select
              value={targetSubnet}
              onChange={(e) => setTargetSubnet(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono focus:outline-none focus:border-sky-500"
            >
              {routers[0]?.routingTable.map((route, idx) => (
                <option key={idx} value={route.destination}>{route.destination} ({route.networkName})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleInjectPacket}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-glow-emerald"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Transmit Layer-3 IP Packet</span>
          </button>
        </div>

        {/* Packet Feedback Result */}
        {packetFeedback && (
          <div className={`mt-4 p-3 rounded-lg border text-xs font-mono leading-relaxed flex items-start gap-2 ${
            packetFeedback.includes('SUCCESS')
              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
              : 'bg-rose-950/40 border-rose-800 text-rose-300'
          }`}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{packetFeedback}</span>
          </div>
        )}
      </div>

      {/* Live Routing Protocol Event Log */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>RIP Protocol Wire Activity & Triggered Updates Feed</span>
          </span>
          <span className="text-slate-500">{events.length} recorded frames</span>
        </div>

        <div className="mt-3 max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs pr-2">
          {events.length === 0 ? (
            <div className="text-slate-500 italic py-2">No protocol events yet. Advance simulation or sever a link.</div>
          ) : (
            events.map((evt) => (
              <div key={evt.id} className="flex items-start gap-3 py-1 text-slate-300 border-b border-slate-900/60">
                <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{evt.timestamp}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold shrink-0 ${
                  evt.type === 'link_failure' || evt.type === 'poison' || evt.type === 'loop_detected'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : evt.type === 'convergence' || evt.type === 'packet_delivered'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-sky-950 text-sky-300 border border-sky-800'
                }`}>
                  {evt.type}
                </span>
                <span className="flex-1">{evt.message}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Inspector Modal */}
      {inspectedRouter && (
        <RouterInspectorModal
          router={inspectedRouter}
          links={links}
          onClose={() => setInspectedRouter(null)}
        />
      )}

    </div>
  );
};
