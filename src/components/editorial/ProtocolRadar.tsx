import React, { useState } from 'react';
import { PROTOCOL_COMPARISONS } from '../../data/publicationData';
import { Network, HelpCircle, Check, ArrowRight, BarChart3, Compass } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

export const ProtocolRadar: React.FC = () => {
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ diameter?: string; priority?: string; scope?: string }>({});

  const handleSelectOption = (key: 'diameter' | 'priority' | 'scope', value: string) => {
    sound.playClick();
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setWizardStep((prev) => prev + 1);
  };

  const resetWizard = () => {
    sound.playClick();
    setWizardStep(0);
    setAnswers({});
  };

  // Determine Recommendation
  let recommendation = {
    protocol: 'OSPFv2 / OSPFv3',
    badge: 'Industry Standard Interior Gateway',
    reason: 'For networks with diverse link speeds and scale beyond 15 hops, OSPF provides sub-second Dijkstra SPF convergence and hierarchical area summarization.',
    ad: '110',
    tradeoff: 'Higher RAM and CPU utilization than RIP, and requires careful Area 0 backbone planning.'
  };

  if (answers.diameter === 'small' && answers.priority === 'simplicity') {
    recommendation = {
      protocol: 'RIPv2 (RFC 2453)',
      badge: 'Minimal Overhead Legacy IGP',
      reason: 'Ideal for legacy systems, educational testbeds, and simple hub-and-spoke networks under 15 hops with identical link bandwidths where operational simplicity is paramount.',
      ad: '120',
      tradeoff: 'Slow convergence (30s timers) and complete inability to differentiate between 10Mbps Ethernet and 100Gbps fiber.'
    };
  } else if (answers.scope === 'internet') {
    recommendation = {
      protocol: 'BGPv4 (Border Gateway Protocol)',
      badge: 'Global Exterior Gateway Protocol',
      reason: 'Mandatory for multi-homed Autonomous Systems peering across the global public Internet backbone.',
      ad: '20 (eBGP) / 200 (iBGP)',
      tradeoff: 'High complexity, huge memory footprint (Full internet table >950k routes), and deliberate convergence pacing.'
    };
  } else if (answers.priority === 'speed') {
    recommendation = {
      protocol: 'EIGRP (Enhanced Interior Gateway)',
      badge: 'Cisco Advanced Distance Vector',
      reason: 'Feasible Successor backup paths enable near-instant (sub-50ms) convergence without recalculating full Dijkstra topology trees.',
      ad: '90 (Internal)',
      tradeoff: 'Historically proprietary Cisco (RFC 7868 informational), complex composite metric K-value tuning.'
    };
  }

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Compass className="w-4 h-4" />
            <span>Comparative Architectural Analysis</span>
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

      {/* Interactive Protocol Selector Wizard */}
      <div className="mt-10 p-6 rounded-xl bg-[#121210] border border-[#D8CBB3]/20">
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CBB3]/15">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#2F6BFF]" />
            <h4 className="text-sm font-bold font-mono text-[#FAF7F2]">Interactive Architectural Selection Engine</h4>
          </div>
          <span className="text-xs font-mono text-[#D8CBB3]/60">
            Step {Math.min(wizardStep + 1, 3)} of 3
          </span>
        </div>

        {wizardStep === 0 && (
          <div className="py-6 space-y-4">
            <p className="text-sm text-[#D8CBB3] font-sans">
              1. What is the maximum physical hop diameter of your network topology?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSelectOption('diameter', 'small')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26] group"
              >
                <div className="font-bold text-[#2F6BFF]">Small Campus / Lab</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Under 15 router hops end-to-end.</div>
              </button>
              <button
                onClick={() => handleSelectOption('diameter', 'medium')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26] group"
              >
                <div className="font-bold text-[#FAF7F2]">Medium Enterprise</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">15 to 100 hops across diverse WAN links.</div>
              </button>
              <button
                onClick={() => handleSelectOption('diameter', 'large')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26] group"
              >
                <div className="font-bold text-[#D8CBB3]">Global Carrier / ISP</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Inter-autonomous system transit (&gt;100 hops).</div>
              </button>
            </div>
          </div>
        )}

        {wizardStep === 1 && (
          <div className="py-6 space-y-4">
            <p className="text-sm text-[#D8CBB3] font-sans">
              2. What is your primary design metric priority?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSelectOption('priority', 'simplicity')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26]"
              >
                <div className="font-bold text-[#2F6BFF]">Zero Complexity</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Plug-and-play, minimal CPU, tiny RAM footprint.</div>
              </button>
              <button
                onClick={() => handleSelectOption('priority', 'speed')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26]"
              >
                <div className="font-bold text-[#FAF7F2]">Sub-second Convergence</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Instant failover without routing blackholes.</div>
              </button>
              <button
                onClick={() => handleSelectOption('priority', 'bandwidth')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26]"
              >
                <div className="font-bold text-[#D8CBB3]">Bandwidth-Aware Routing</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Must avoid routing over slow 56k backup links.</div>
              </button>
            </div>
          </div>
        )}

        {wizardStep === 2 && (
          <div className="py-6 space-y-4">
            <p className="text-sm text-[#D8CBB3] font-sans">
              3. Is routing confined within your private organization, or crossing public AS boundaries?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleSelectOption('scope', 'private')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26]"
              >
                <div className="font-bold text-[#2F6BFF]">Internal IGP Domain Only</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Single organization, private IP addressing.</div>
              </button>
              <button
                onClick={() => handleSelectOption('scope', 'internet')}
                className="p-4 rounded-xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF] bg-[#1E1E1C] text-left font-mono text-xs transition-all hover:bg-[#2A2A26]"
              >
                <div className="font-bold text-[#FAF7F2]">Public Internet Edge / Peering</div>
                <div className="text-[#D8CBB3]/70 text-[11px] mt-1">Border connection to multiple upstream ISPs.</div>
              </button>
            </div>
          </div>
        )}

        {wizardStep >= 3 && (
          <div className="py-6 space-y-4 animate-fadeIn">
            <div className="p-5 rounded-xl bg-[#1E1E1C] border border-[#2F6BFF]/40 shadow-glow-electric">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#2F6BFF] tracking-wider font-bold">
                    Architectural Recommendation
                  </span>
                  <h4 className="text-xl font-bold font-mono text-[#FAF7F2] mt-0.5">
                    {recommendation.protocol}
                  </h4>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
                  AD: {recommendation.ad}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#D8CBB3] leading-relaxed font-sans">
                {recommendation.reason}
              </p>
              <div className="mt-3 text-xs font-mono text-[#D8CBB3] bg-[#121210] p-3 rounded-lg border border-[#D8CBB3]/20">
                <strong className="text-[#2F6BFF]">Trade-off Alert:</strong> {recommendation.tradeoff}
              </div>
            </div>

            <div className="pt-2">
              <LiquidButton
                size="sm"
                onClick={resetWizard}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Restart Assessment
              </LiquidButton>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
