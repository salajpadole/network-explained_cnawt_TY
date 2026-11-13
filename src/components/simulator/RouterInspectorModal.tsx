import React from 'react';
import { RouterNode, NetworkLink } from '../../types/network';
import { X, Network, Cpu, ShieldCheck, Activity } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

interface RouterInspectorProps {
  router: RouterNode | null;
  links: NetworkLink[];
  onClose: () => void;
}

export const RouterInspectorModal: React.FC<RouterInspectorProps> = ({ router, links, onClose }) => {
  if (!router) return null;

  const connectedLinks = links.filter((l) => l.source === router.id || l.target === router.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-elevated rounded-2xl p-6 border border-[#D8CBB3]/30 text-[#D8CBB3] shadow-liquid-glass"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CBB3]/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/20 border border-[#2F6BFF]/50 flex items-center justify-center text-[#2F6BFF] font-mono font-bold text-lg shadow-glow-electric">
              {router.label}
            </div>
            <div>
              <div className="text-xs font-mono text-[#2F6BFF] uppercase tracking-widest font-bold">Router Hardware RIB Inspector</div>
              <h3 className="text-xl font-bold font-mono text-[#FAF7F2]">{router.name}</h3>
            </div>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-2 rounded-lg bg-[#1E1E1C] hover:bg-[#2A2A26] border border-[#D8CBB3]/20 text-[#D8CBB3] hover:text-[#FAF7F2] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status badges */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#2F6BFF]/20 border border-[#2F6BFF]/40 text-[#FAF7F2] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-pulse" />
            Daemon: ripd ACTIVE
          </span>
          <span className="px-2.5 py-1 rounded bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
            Port: UDP 520
          </span>
          <span className="px-2.5 py-1 rounded bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
            Multicast: 224.0.0.9
          </span>
          <span className="px-2.5 py-1 rounded bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
            Next Periodic Jitter: {router.updateJitterRemaining}s
          </span>
        </div>

        {/* Live Routing Table */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase text-[#D8CBB3]/70 tracking-wider mb-2 flex items-center gap-1.5 font-bold">
            <Activity className="w-3.5 h-3.5 text-[#2F6BFF]" />
            <span>Active Routing Information Base (RIB)</span>
          </h4>

          <div className="overflow-x-auto rounded-xl border border-[#D8CBB3]/20 bg-[#121210]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#D8CBB3]/15 text-[#D8CBB3]/60 text-[10px] uppercase bg-[#1E1E1C]">
                  <th className="py-2.5 px-3">Destination Subnet</th>
                  <th className="py-2.5 px-3">Next Hop</th>
                  <th className="py-2.5 px-3">Hop Metric</th>
                  <th className="py-2.5 px-3">Interface</th>
                  <th className="py-2.5 px-3">Route Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8CBB3]/10">
                {router.routingTable.map((route, idx) => {
                  const isInfinity = route.metric >= 16;
                  return (
                    <tr key={idx} className="hover:bg-[#1E1E1C]/60 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#FAF7F2]">
                        <div>{route.destination}</div>
                        <div className="text-[10px] text-[#D8CBB3]/60 font-sans">{route.networkName}</div>
                      </td>
                      <td className="py-2.5 px-3 text-[#2F6BFF] font-bold">
                        {route.nextHop}
                      </td>
                      <td className="py-2.5 px-3">
                        {isInfinity ? (
                          <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-700 font-bold">
                            16 (INFINITY)
                          </span>
                        ) : (
                          <span className="text-[#FAF7F2] font-bold">{route.metric}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-[#D8CBB3]/80">
                        {route.learnedViaInterface}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] uppercase font-bold ${
                          isInfinity ? 'text-rose-400' : 'text-[#2F6BFF]'
                        }`}>
                          {route.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Physical Interfaces */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase text-[#D8CBB3]/70 tracking-wider mb-2 font-bold">
            Physical Network Interfaces:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {router.interfaces.map((intf, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#121210] border border-[#D8CBB3]/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#FAF7F2]">{intf.name}</div>
                  <div className="text-[11px] text-[#D8CBB3]/60">{intf.ip}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  intf.isUp ? 'bg-[#2F6BFF]/20 text-[#FAF7F2] border border-[#2F6BFF]/50' : 'bg-rose-950/80 text-rose-300 border border-rose-700'
                }`}>
                  {intf.isUp ? 'UP' : 'DOWN'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#D8CBB3]/15 text-right">
          <LiquidButton
            size="sm"
            onClick={onClose}
          >
            Dismiss Inspector
          </LiquidButton>
        </div>
      </div>
    </div>
  );
};
