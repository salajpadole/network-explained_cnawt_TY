import React, { useState } from 'react';
import { GitCompare, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

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
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <GitCompare className="w-4 h-4" />
            <span>Evolutionary Triad</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            RIPv1 vs. RIPv2 vs. RIPng Architectural Matrix
          </h3>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#12141A]/60 backdrop-blur-md rounded-xl border border-[#D8CBB3]/20 text-xs font-mono shadow-inner">
          <LiquidButton
            variant="pill"
            isActive={activeVersion === 'all'}
            onClick={() => setActiveVersion('all')}
          >
            All Versions
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeVersion === 'v1'}
            onClick={() => setActiveVersion('v1')}
          >
            RIPv1 Focus
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeVersion === 'v2'}
            onClick={() => setActiveVersion('v2')}
          >
            RIPv2 Standard
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeVersion === 'vng'}
            onClick={() => setActiveVersion('vng')}
          >
            RIPng (IPv6)
          </LiquidButton>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#D8CBB3]/20 text-[#D8CBB3]/70 text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Architectural Feature</th>
              {(activeVersion === 'all' || activeVersion === 'v1') && <th className="py-3 px-4 text-[#D8CBB3]">RIPv1 (RFC 1058)</th>}
              {(activeVersion === 'all' || activeVersion === 'v2') && <th className="py-3 px-4 text-[#2F6BFF] font-bold">RIPv2 (RFC 2453)</th>}
              {(activeVersion === 'all' || activeVersion === 'vng') && <th className="py-3 px-4 text-[#FAF7F2]">RIPng (RFC 2080)</th>}
              <th className="py-3 px-4 text-[#D8CBB3]/60">Engineering Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8CBB3]/10">
            {COMPARISON_ROWS.map((row, idx) => (
              <tr 
                key={idx}
                className={`hover:bg-[#121210]/60 transition-colors ${row.highlight ? 'bg-[#2F6BFF]/10' : ''}`}
              >
                <td className="py-3 px-4 font-semibold text-[#FAF7F2]">
                  {row.feature}
                </td>
                {(activeVersion === 'all' || activeVersion === 'v1') && (
                  <td className="py-3 px-4 text-[#D8CBB3]">
                    {row.v1}
                  </td>
                )}
                {(activeVersion === 'all' || activeVersion === 'v2') && (
                  <td className="py-3 px-4 text-[#2F6BFF] font-bold">
                    {row.v2}
                  </td>
                )}
                {(activeVersion === 'all' || activeVersion === 'vng') && (
                  <td className="py-3 px-4 text-[#FAF7F2] font-medium">
                    {row.vng}
                  </td>
                )}
                <td className="py-3 px-4 text-xs font-sans text-[#D8CBB3]/80 italic">
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
