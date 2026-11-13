import React from 'react';
import { PROTOCOL_COMPARISONS } from '../../data/publicationData';
import { Compass, ShieldCheck } from 'lucide-react';

export const ProtocolRadar: React.FC = () => {
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Compass className="w-4 h-4" />
            <span>Comparative Architectural Analysis • IETF Routing Standards</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            The Protocol Crucible: RIP vs. OSPF vs. EIGRP vs. BGP
          </h3>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
          Interior & Exterior Gateway Protocols
        </span>
      </div>

      {/* Full Comparative Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#D8CBB3]/20 text-[10px] uppercase text-[#D8CBB3]/70">
              <th className="py-3 px-3">Protocol Dimension</th>
              <th className="py-3 px-3 text-[#2F6BFF] font-bold">RIPv2</th>
              <th className="py-3 px-3 text-[#FAF7F2]">OSPFv2</th>
              <th className="py-3 px-3 text-[#D8CBB3]">EIGRP</th>
              <th className="py-3 px-3 text-[#D8CBB3]/80">BGPv4</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8CBB3]/10 text-[#D8CBB3]">
            {PROTOCOL_COMPARISONS.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#121210]/60 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-[#FAF7F2]">{row.feature}</td>
                <td className="py-2.5 px-3 text-[#2F6BFF] font-semibold">{row.ripv2}</td>
                <td className="py-2.5 px-3 text-[#FAF7F2]">{row.ospfv2}</td>
                <td className="py-2.5 px-3 text-[#D8CBB3]">{row.eigrp}</td>
                <td className="py-2.5 px-3 text-[#D8CBB3]/80">{row.bgpv4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editorial Synthesis Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#D8CBB3]/15">
        <div className="p-4 rounded-xl bg-[#121316] border border-[#D8CBB3]/15">
          <div className="text-[11px] font-mono uppercase text-[#2F6BFF] font-bold">Distance-Vector (RIP)</div>
          <div className="text-xs font-sans text-[#D8CBB3]/80 mt-1 leading-relaxed">
            Minimal CPU/RAM overhead, simple deployment; constrained by 15-hop limit and bandwidth-blind metric.
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#121316] border border-[#D8CBB3]/15">
          <div className="text-[11px] font-mono uppercase text-[#FAF7F2] font-bold">Link-State (OSPF)</div>
          <div className="text-xs font-sans text-[#D8CBB3]/80 mt-1 leading-relaxed">
            Dijkstra Shortest Path First algorithm; provides sub-second convergence and hierarchical Area 0 scaling.
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#121316] border border-[#D8CBB3]/15">
          <div className="text-[11px] font-mono uppercase text-[#A8997C] font-bold">Path-Vector (BGP)</div>
          <div className="text-xs font-sans text-[#D8CBB3]/80 mt-1 leading-relaxed">
            Policy-based routing for autonomous systems; handles over 950,000 public prefixes across the global Internet.
          </div>
        </div>
      </div>
    </div>
  );
};
