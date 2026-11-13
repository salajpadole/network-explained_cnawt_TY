import React from 'react';
import { RouterNode, NetworkLink } from '../../types/network';
import { X, Network, Cpu, ShieldCheck, Activity } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface RouterInspectorProps {
  router: RouterNode | null;
  links: NetworkLink[];
  onClose: () => void;
}

export const RouterInspectorModal: React.FC<RouterInspectorProps> = ({ router, links, onClose }) => {
  if (!router) return null;

  const connectedLinks = links.filter((l) => l.source === router.id || l.target === router.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-elevated rounded-2xl p-6 border border-sky-500/30 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-mono font-bold text-lg shadow-glow-cyan">
              {router.label}
            </div>
            <div>
              <div className="text-xs font-mono text-sky-400 uppercase tracking-widest">Router Hardware RIB Inspector</div>
              <h3 className="text-xl font-bold font-mono text-white">{router.name}</h3>
            </div>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status badges */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Daemon: ripd ACTIVE
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Port: UDP 520
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Multicast: 224.0.0.9
          </span>
          <span className="px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800 text-sky-300">
            Next Periodic Jitter: {router.updateJitterRemaining}s
          </span>
        </div>

        {/* Live Routing Table */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>Active Routing Information Base (RIB)</span>
          </h4>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase bg-slate-900/60">
                  <th className="py-2.5 px-3">Destination Subnet</th>
                  <th className="py-2.5 px-3">Next Hop</th>
                  <th className="py-2.5 px-3">Hop Metric</th>
                  <th className="py-2.5 px-3">Interface</th>
                  <th className="py-2.5 px-3">Route Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {router.routingTable.map((route, idx) => {
                  const isInfinity = route.metric >= 16;
                  return (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-3 font-semibold text-white">
                        <div>{route.destination}</div>
                        <div className="text-[10px] text-slate-500 font-sans">{route.networkName}</div>
                      </td>
                      <td className="py-2.5 px-3 text-sky-300">
                        {route.nextHop}
                      </td>
                      <td className="py-2.5 px-3">
                        {isInfinity ? (
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                            16 (INFINITY)
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-bold">{route.metric}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {route.learnedViaInterface}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] uppercase font-bold ${
                          isInfinity ? 'text-rose-400' : 'text-emerald-400'
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
          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
            Physical Network Interfaces:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {router.interfaces.map((intf, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">{intf.name}</div>
                  <div className="text-[11px] text-slate-400">{intf.ip}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  intf.isUp ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {intf.isUp ? 'UP' : 'DOWN'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
