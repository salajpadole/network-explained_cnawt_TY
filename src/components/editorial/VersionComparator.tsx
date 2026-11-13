import React, { useState } from 'react';
import { GitCompare, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface VersionRow {
  feature: string;
  v1: string;
  v2: string;
  vng: string;
  highlight?: boolean;
  notes: string;
}

const COMPARISON_ROWS: VersionRow[] = [
  {
    feature: 'Official Standard RFC',
    v1: 'RFC 1058 (1988)',
    v2: 'RFC 2453 / STD 56 (1998)',
    vng: 'RFC 2080 (1997)',
    notes: 'RIPv2 is full Internet Standard 56.'
  },
  {
    feature: 'Subnet Mask (VLSM / CIDR)',
    v1: 'No (Classful only: /8, /16, /24)',
    v2: 'Yes (Full CIDR support)',
    vng: 'Yes (IPv6 prefix lengths)',
    highlight: true,
    notes: 'RIPv1 packets lack a mask field entirely; receiving routers guess mask based on IP class.'
  },
  {
    feature: 'Transmission Destination',
    v1: '255.255.255.255 (Broadcast)',
    v2: '224.0.0.9 (Multicast)',
    vng: 'FF02::9 (Link-Local Multicast)',
    highlight: true,
    notes: 'Multicast stops non-router hosts from CPU interrupts at Layer 3.'
  },
  {
    feature: 'Transport Layer Port',
    v1: 'UDP Port 520',
    v2: 'UDP Port 520',
    vng: 'UDP Port 521',
    notes: 'RIPng was assigned UDP 521 to avoid clashing with IPv4 ripd processes.'
  },
  {
    feature: 'Cryptographic Authentication',
    v1: 'None (Plain vulnerability)',
    v2: 'Plaintext & MD5 HMAC',
    vng: 'Delegated to IPv6 IPsec AH/ESP',
    highlight: true,
    notes: 'RFC 2453 repurposes the first route entry (AFI 0xFFFF) as an MD5 authentication block.'
  },
  {
    feature: 'Next-Hop Specification',
    v1: 'Implicit (Sender IP only)',
    v2: 'Explicit 32-bit Next-Hop field',
    vng: 'Dedicated 0xFF Next-Hop RTE',
    notes: 'Prevents two-hop suboptimal doglegs on shared Ethernet segments.'
  },
  {
    feature: 'External Route Tagging',
    v1: 'Unsupported',
    v2: 'Supported (16-bit Tag)',
    vng: 'Supported (16-bit Tag)',
    notes: 'Carries external Autonomous System Number (ASN) through redistributions.'
  },
  {
    feature: 'Max Metric Limit',
    v1: '15 Hops (16 = Infinity)',
    v2: '15 Hops (16 = Infinity)',
    vng: '15 Hops (16 = Infinity)',
    notes: 'Identical 15-hop boundary across all three protocol generations.'
  }
];

export const VersionComparator: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState<'all' | 'v1' | 'v2' | 'vng'>('all');

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <GitCompare className="w-4 h-4" />
            <span>Evolutionary Triad</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            RIPv1 vs. RIPv2 vs. RIPng Architectural Matrix
          </h3>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => { sound.playClick(); setActiveVersion('all'); }}
            className={`px-3 py-1 rounded transition-colors ${activeVersion === 'all' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            All Versions
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveVersion('v1'); }}
            className={`px-3 py-1 rounded transition-colors ${activeVersion === 'v1' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            RIPv1 Focus
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveVersion('v2'); }}
            className={`px-3 py-1 rounded transition-colors ${activeVersion === 'v2' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            RIPv2 Standard
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveVersion('vng'); }}
            className={`px-3 py-1 rounded transition-colors ${activeVersion === 'vng' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            RIPng (IPv6)
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Architectural Feature</th>
              {(activeVersion === 'all' || activeVersion === 'v1') && <th className="py-3 px-4 text-amber-400">RIPv1 (RFC 1058)</th>}
              {(activeVersion === 'all' || activeVersion === 'v2') && <th className="py-3 px-4 text-sky-400">RIPv2 (RFC 2453)</th>}
              {(activeVersion === 'all' || activeVersion === 'vng') && <th className="py-3 px-4 text-emerald-400">RIPng (RFC 2080)</th>}
              <th className="py-3 px-4 text-slate-500">Engineering Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {COMPARISON_ROWS.map((row, idx) => (
              <tr 
                key={idx}
                className={`hover:bg-slate-900/50 transition-colors ${row.highlight ? 'bg-sky-950/10' : ''}`}
              >
                <td className="py-3 px-4 font-semibold text-slate-200">
                  {row.feature}
                </td>
                {(activeVersion === 'all' || activeVersion === 'v1') && (
                  <td className="py-3 px-4 text-slate-300">
                    {row.v1}
                  </td>
                )}
                {(activeVersion === 'all' || activeVersion === 'v2') && (
                  <td className="py-3 px-4 text-sky-200 font-medium">
                    {row.v2}
                  </td>
                )}
                {(activeVersion === 'all' || activeVersion === 'vng') && (
                  <td className="py-3 px-4 text-emerald-200 font-medium">
                    {row.vng}
                  </td>
                )}
                <td className="py-3 px-4 text-xs font-sans text-slate-400 italic">
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
