import React, { useState, useEffect } from 'react';
import { useRouter } from '../router';
import { sound } from '../audio/soundEngine';

// Editorial & Interactive Components
import { FormulaCard } from '../components/editorial/FormulaCard';
import { PacketDissector } from '../components/editorial/PacketDissector';
import { TimerLifecycleVisualizer } from '../components/editorial/TimerLifecycleVisualizer';
import { LoopMechanicsVisualizer } from '../components/editorial/LoopMechanicsVisualizer';
import { VersionComparator } from '../components/editorial/VersionComparator';
import { ConfigTerminal } from '../components/editorial/ConfigTerminal';
import { ProtocolRadar } from '../components/editorial/ProtocolRadar';
import { CalloutBox } from '../components/editorial/CalloutBox';
import { GlossaryDrawer } from '../components/interactive/GlossaryDrawer';
import { Colophon } from '../components/layout/Colophon';
import { LiquidMetalButton } from '../effects/liquid-metal-button/LiquidMetalButton';
import '../effects/liquid-metal-button/styles.css';
import { LiquidMetalAction, LiquidButton } from '../components/buttons/LiquidMetalAction';

import { 
  BookOpen, Clock, Calendar, User, Share2, Check, ArrowUp, 
  Terminal, ShieldCheck, ChevronRight, Binary, Cpu, Compass, Activity, ExternalLink,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

const ARTICLE_SECTIONS = [
  { id: 'sec-01', num: '01', title: 'Introduction' },
  { id: 'sec-02', num: '02', title: 'Understanding Network Routing' },
  { id: 'sec-03', num: '03', title: 'What is RIP?' },
  { id: 'sec-04', num: '04', title: 'Distance-Vector Routing' },
  { id: 'sec-05', num: '05', title: 'The Bellman-Ford Algorithm' },
  { id: 'sec-06', num: '06', title: 'How RIP Works' },
  { id: 'sec-07', num: '07', title: 'Understanding Hop Count' },
  { id: 'sec-08', num: '08', title: 'RIP Versions (v1, v2, RIPng)' },
  { id: 'sec-09', num: '09', title: 'RIP Timers & State Machines' },
  { id: 'sec-10', num: '10', title: 'Routing Loops & Prevention' },
  { id: 'sec-11', num: '11', title: 'Practical Cisco Configuration' },
  { id: 'sec-12', num: '12', title: 'RIP vs. Other Routing Protocols' },
  { id: 'sec-13', num: '13', title: 'Advantages & Limitations' },
  { id: 'sec-14', num: '14', title: 'Conclusion: Is RIP Still Relevant?' },
  { id: 'sec-15', num: '15', title: 'Standards & References' },
];

export const RIPArticlePage: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-01');
  const [copiedLink, setCopiedLink] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ARTICLE_SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    sound.playClick();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative text-[#D8CBB3] bg-transparent min-h-screen pt-28 sm:pt-36 pb-24">
      
      {/* ========================================================================= */}
      {/* ARTICLE HERO */}
      {/* ========================================================================= */}
      <header className={`w-full mx-auto px-6 sm:px-10 md:px-14 py-12 sm:py-16 rounded-3xl topbar-glass-card mb-8 transition-all duration-300 ${
        sidebarOpen ? 'max-w-7xl' : 'max-w-[1680px]'
      }`}>
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-6 font-bold">
          <span className="px-2.5 py-1 rounded-full bg-[#2F6BFF]/20 border border-[#2F6BFF]/50 shadow-glow-electric text-[#FAF7F2]">
            ARTICLE 001
          </span>
          <span className="text-[#D8CBB3]/40">•</span>
          <span className="text-[#D8CBB3]/80">ROUTING PROTOCOLS</span>
          <span className="text-[#D8CBB3]/40">•</span>
          <span className="text-[#2F6BFF] font-semibold">PEER-REVIEWED MONOGRAPH</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#FAF7F2] tracking-tight leading-[1.08]">
          RIP: The Routing Information Protocol
        </h1>

        <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-[#D8CBB3] font-serif italic max-w-3xl leading-relaxed">
          Understanding how routers exchange information, calculate routes and make decisions across interconnected networks.
        </p>

        {/* Metadata & Author Bar */}
        <div className="mt-8 pt-6 border-t border-[#D8CBB3]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#D8CBB3]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/15 border border-[#2F6BFF]/40 flex items-center justify-center font-bold text-[#2F6BFF]">
              SP
            </div>
            <div>
              <div className="text-[#FAF7F2] font-bold">Salaj Padole</div>
              <div className="text-[#D8CBB3]/50">CNAWT Tutorial Track • PRN: 12412336 • Roll: 43</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[#D8CBB3]/80">
            <LiquidButton
              variant="pill"
              size="sm"
              onClick={() => {
                sound.playClick();
                setSidebarOpen(!sidebarOpen);
              }}
              icon={sidebarOpen ? <PanelLeftClose className="w-3.5 h-3.5 text-[#2F6BFF]" /> : <PanelLeftOpen className="w-3.5 h-3.5 text-[#2F6BFF]" />}
            >
              {sidebarOpen ? 'Hide Chapters' : 'Show Chapters'}
            </LiquidButton>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Nov 2026</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#FAF7F2] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#2F6BFF]" />
              <span>24 min read</span>
            </span>
            <span>•</span>
            <LiquidMetalAction
              text={copiedLink ? 'Copied' : 'Share'}
              onClick={handleCopyLink}
              width={140}
              height={44}
            />
          </div>
        </div>
      </header>

      {/* Floating Toggle Button when Sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => {
            sound.playClick();
            setSidebarOpen(true);
          }}
          className="fixed left-5 top-28 z-40 px-4 py-2.5 rounded-full topbar-glass-card border border-[#2F6BFF]/50 text-[#D8CBB3] hover:text-[#FAF7F2] hover:border-[#2F6BFF] flex items-center gap-2 text-xs font-mono shadow-[0_0_24px_rgba(47,107,255,0.35)] transition-all hover:scale-105 group backdrop-blur-xl"
          title="Open Chapters Menu"
        >
          <PanelLeftOpen className="w-4 h-4 text-[#2F6BFF] group-hover:rotate-6 transition-transform" />
          <span className="font-semibold text-[#FAF7F2]">Chapters</span>
        </button>
      )}

      {/* ========================================================================= */}
      {/* READING LAYOUT */}
      {/* ========================================================================= */}
      <div className={`w-full mx-auto px-4 sm:px-8 md:px-12 mt-6 transition-all duration-300 ${
        sidebarOpen 
          ? 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start' 
          : 'max-w-[1680px] block'
      }`}>
        
        {/* Sticky Table of Contents (Desktop Sidebar) */}
        {sidebarOpen && (
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-5 rounded-2xl topbar-glass-card space-y-4 max-h-[82vh] overflow-y-auto pr-3 font-mono text-xs">
            <div className="text-[11px] uppercase tracking-widest text-[#D8CBB3]/60 pb-2 border-b border-[#D8CBB3]/15 flex items-center justify-between font-bold">
              <span>Article Contents</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setSidebarOpen(false);
                }}
                className="px-2 py-0.5 rounded-md hover:bg-white/10 text-[#D8CBB3]/70 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                title="Hide sidebar (Full-screen reading)"
              >
                <PanelLeftClose className="w-3.5 h-3.5 text-[#2F6BFF]" />
                <span>Hide</span>
              </button>
            </div>

            <nav className="space-y-1">
              {ARTICLE_SECTIONS.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left py-1.5 px-3 rounded-lg transition-all flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-[#2F6BFF]/20 text-[#FAF7F2] font-bold border-l-2 border-[#2F6BFF] shadow-glow-electric'
                        : 'text-[#D8CBB3]/70 hover:text-[#FAF7F2] hover:bg-[#121210]'
                    }`}
                  >
                    <span className="text-[10px] text-[#D8CBB3]/40">{sec.num}</span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#D8CBB3]/15">
              <LiquidMetalAction
                text="Back to Top"
                onClick={scrollToTop}
                width={160}
                height={46}
              />
            </div>
          </aside>
        )}

        {/* Main Editorial Reading Column */}
        <article className={`w-full text-[#D8CBB3] font-sans text-base sm:text-lg leading-relaxed space-y-10 ${
          sidebarOpen ? 'lg:col-span-9' : 'w-full'
        }`}>
          
          {/* ========================================================================= */}
          {/* 01 — INTRODUCTION */}
          {/* ========================================================================= */}
          <section id="sec-01" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">01 / Foundation</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Introduction</h2>
            <p>
              In the modern digital landscape, the global Internet appears as a seamless, unitary fabric. When a user requests a web resource, transmits telemetry data, or initiates an encrypted session, the underlying physical infrastructure is utterly concealed.
            </p>
            <p>
              Yet behind this illusion of direct point-to-point connection lies a colossal graph of heterogeneous computer networks. No single physical wire connects a user to a web server; rather, raw IP datagrams must traverse dozens of independent physical links, fiber lines, satellite hops, and high-speed switches.
            </p>
            <p>
              This introduces the fundamental problem of <strong>packet forwarding</strong> across interconnected networks: when an arbitrary router receives an IP packet, how does it know where to forward it? Without dynamic routing protocols to autonomously discover topologies and calculate paths, the global internetwork would remain a collection of isolated islands.
            </p>
          </section>

          {/* ========================================================================= */}
          {/* 02 — UNDERSTANDING NETWORK ROUTING */}
          {/* ========================================================================= */}
          <section id="sec-02" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">02 / Architecture</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Understanding Network Routing</h2>
            <p>
              At Layer 3 of the OSI reference model, a <strong>router</strong> operates as a specialized computer with multiple physical network interfaces. Its primary task is simple yet profound: examine the 32-bit destination IP address in the header of each incoming packet and look up the appropriate <em>egress interface</em> in its local <strong>Routing Table</strong>.
            </p>
            
            {/* Custom Diagram: Next-hop decision */}
            <div className="my-8 p-6 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 not-prose font-mono text-xs shadow-liquid-glass">
              <div className="text-[#D8CBB3]/60 uppercase text-[10px] tracking-wider mb-3 font-bold">Diagram: Layer-3 Forwarding Anatomy</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center items-center">
                <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20">
                  <div className="text-[#2F6BFF] font-bold text-sm">Ingress IP Packet</div>
                  <div className="text-[#D8CBB3]/60 text-[10px] mt-1">Dst: 192.168.10.42</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[#FAF7F2] font-bold">RIB Lookup</span>
                  <span className="text-[10px] text-[#D8CBB3]/60 mt-1">Longest Prefix Match</span>
                  <span className="w-full h-0.5 bg-[#2F6BFF] my-2" />
                  <span className="text-[#2F6BFF] text-[10px] font-bold">Next-Hop: 10.0.12.2</span>
                </div>
                <div className="p-4 rounded-xl bg-[#1E1E1C] border border-[#D8CBB3]/20">
                  <div className="text-[#FAF7F2] font-bold text-sm">Egress Interface</div>
                  <div className="text-[#D8CBB3]/60 text-[10px] mt-1">Port Gi0/1 → Router R2</div>
                </div>
              </div>
            </div>

            <p>
              Routing strategies fall into two broad classifications:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Static Routing:</strong> Routes are configured by hand by a network administrator. Highly predictable and zero protocol overhead, but completely brittle: if a link fails, static routes cannot adapt, causing permanent traffic blackholes until manually reconfigured.
              </li>
              <li>
                <strong>Dynamic Routing:</strong> Routers run background software daemons that continuously exchange topological messages, automatically discover available paths, calculate optimal distances, and immediately heal routes around hardware link failures.
              </li>
            </ul>
          </section>

          {/* ========================================================================= */}
          {/* 03 — WHAT IS RIP? */}
          {/* ========================================================================= */}
          <section id="sec-03" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">03 / Protocol Definition</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">What is RIP?</h2>
            <p>
              The <strong>Routing Information Protocol (RIP)</strong> is one of the oldest and most historically consequential dynamic routing protocols in computer networking. First formalized by Chuck Hedrick in June 1988 under <strong>RFC 1058</strong>, RIP originated in Xerox PARC’s Gateway Information Protocol (GWINFO) and became deeply entrenched throughout the 1980s as the default routing daemon (<code>routed</code>) bundled with 4.3BSD Unix.
            </p>
            <p>
              Within modern network taxonomy, RIP is categorized as:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#121210] border border-[#D8CBB3]/20">
                <span className="text-[#2F6BFF] font-bold block mb-1">Protocol Family:</span>
                <span className="text-[#FAF7F2]">Interior Gateway Protocol (IGP)</span>
                <p className="text-[#D8CBB3]/70 font-sans text-xs mt-1">Designed for internal autonomous systems rather than inter-AS Internet peering.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#121210] border border-[#D8CBB3]/20">
                <span className="text-[#FAF7F2] font-bold block mb-1">Algorithmic Family:</span>
                <span className="text-[#FAF7F2]">Distance-Vector Protocol</span>
                <p className="text-[#D8CBB3]/70 font-sans text-xs mt-1">Routers advertise vectors of (distance, direction) strictly to immediate neighbors.</p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 04 — DISTANCE-VECTOR ROUTING */}
          {/* ========================================================================= */}
          <section id="sec-04" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">04 / Algorithmic Paradigm</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Distance-Vector Routing</h2>
            <p>
              Distance-vector protocols operate on a distributed paradigm colloquially known as <strong>"routing by rumor."</strong>
            </p>
            <p>
              In a link-state network (like OSPF), each router floods descriptions of its local links so every machine builds an identical, global map of the whole network. By contrast, a distance-vector router <em>has zero global topological map</em>. It only maintains a table of known destination networks, the best calculated distance to reach them, and the immediate neighbor (next-hop) to which packets must be sent.
            </p>
            <p>
              At regular periodic intervals, each router packages its entire distance vector into UDP datagrams and broadcasts them to its immediate physical neighbors. When a neighbor receives an update, it adds the cost of the link over which the update arrived, updates its table if a shorter path is revealed, and subsequently re-advertises this updated vector to its own downstream peers.
            </p>
          </section>

          {/* ========================================================================= */}
          {/* 05 — THE BELLMAN-FORD ALGORITHM */}
          {/* ========================================================================= */}
          <section id="sec-05" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">05 / Mathematical Engine</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">The Bellman-Ford Algorithm</h2>
            <p>
              The mathematical engine powering distance-vector calculation is the <strong>Bellman-Ford algorithm</strong>, formulated independently by Lester Ford Jr. & Delbert Fulkerson (1956) and Richard Bellman (1958).
            </p>
            <p>
              Formulated as a dynamic programming problem, the Bellman-Ford equation determines the shortest path $D_x(y)$ from node $x$ to node $y$ by minimizing across all immediate neighbors $v$:
            </p>

            <FormulaCard />

            <div className="p-5 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-3 text-sm">
              <span className="font-mono text-xs uppercase text-[#2F6BFF] font-bold block">Worked Numerical Example:</span>
              <p>
                Suppose Router A is connected to two neighbors: Router B via a 1-hop link ($c(A, B) = 1$) and Router C via a 1-hop link ($c(A, C) = 1$). Both advertise paths to Target Subnet Z:
              </p>
              <ul className="list-disc pl-6 space-y-1 font-mono text-xs text-[#D8CBB3]">
                <li>Router B advertises: $D_B(Z) = 3$ hops. Total cost via B = $1 + 3 = 4$ hops.</li>
                <li>Router C advertises: $D_C(Z) = 1$ hop. Total cost via C = $1 + 1 = 2$ hops.</li>
              </ul>
              <p>
                Router A computes D_A(Z) = min(1+3, 1+1) = 2. It selects Router C as its next hop and records metric 2 in its routing table.
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 06 — HOW RIP WORKS */}
          {/* ========================================================================= */}
          <section id="sec-06" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">06 / Operational Dynamics</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">How RIP Works</h2>
            <p>
              In operational practice, a RIP daemon executes an ongoing state machine:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Startup & Initialization:</strong> When the RIP process starts, it inspects all local interfaces enabled with the <code>network</code> statement. Directly attached subnets are inserted into the RIB with metric 1 (or metric 0 internally).
              </li>
              <li>
                <strong>Periodic Solicitation & Response:</strong> Every 30 seconds, unsolicited RIP Response packets are broadcast to neighbors containing up to 25 route table entries.
              </li>
              <li>
                <strong>Table Evolution:</strong> When an update arrives, entries are processed one by one. If an update from the <em>current</em> next hop reports a changed metric (even if worse), it is accepted immediately. If an update from an <em>alternate</em> neighbor offers a strictly lower metric, the next-hop pointer is updated.
              </li>
            </ol>
          </section>

          {/* ========================================================================= */}
          {/* 07 — UNDERSTANDING HOP COUNT & THE 15-HOP CEILING */}
          {/* ========================================================================= */}
          <section id="sec-07" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">07 / Routing Metric</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Understanding Hop Count</h2>
            <p>
              RIP evaluates paths exclusively by <strong>hop count</strong>—the number of intermediate router hops between the local machine and the destination network.
            </p>
            <div className="p-5 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#2F6BFF]/15 border border-[#2F6BFF]/40">
                <span className="text-[#FAF7F2] font-bold block mb-1">Valid Operational Range (1 — 15 Hops)</span>
                Packets are forwarded across links normally. Any route with 15 or fewer hops is considered reachable.
              </div>
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800">
                <span className="text-rose-400 font-bold block mb-1">Metric 16 = Infinity (Unreachable)</span>
                A route that hits metric 16 is immediately poisoned and marked dead. RIP will not forward packets over it.
              </div>
            </div>
            <p>
              This 15-hop limit strictly confines RIP to small enterprise networks, university lab testbeds, and simple hub-and-spoke branch offices. It cannot scale across modern enterprise backbones.
            </p>
          </section>

          {/* ========================================================================= */}
          {/* 08 — RIP VERSIONS (V1, V2, RIPNG) */}
          {/* ========================================================================= */}
          <section id="sec-08" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">08 / Protocol Evolution</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">RIP Versions: v1, v2, and RIPng</h2>
            <p>
              Over its three-decade lifespan, RIP evolved across three distinct generations to address the changing architecture of IP addressing:
            </p>

            <VersionComparator />

            <PacketDissector />
          </section>

          {/* ========================================================================= */}
          {/* 09 — RIP TIMERS & STATE MACHINES */}
          {/* ========================================================================= */}
          <section id="sec-09" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">09 / Temporal Mechanics</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">RIP Timers & State Machines</h2>
            <p>
              Because RIP lacks persistent connection handshakes, it depends on a hierarchy of soft-state timers. Default implementations typically configure:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base font-mono text-[#D8CBB3]">
              <li><strong>Periodic Update Timer:</strong> 30 seconds (with ±15% randomized jitter).</li>
              <li><strong>Route Timeout / Invalid Timer:</strong> 180 seconds (6 consecutive missed updates).</li>
              <li><strong>Flush / Garbage Collection Timer:</strong> 120–240 seconds (grace period to spread poison).</li>
              <li><strong>Triggered Updates:</strong> Millisecond-level flash broadcast upon topology change.</li>
            </ul>

            <TimerLifecycleVisualizer />
          </section>

          {/* ========================================================================= */}
          {/* 10 — ROUTING LOOPS AND PREVENTION */}
          {/* ========================================================================= */}
          <section id="sec-10" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">10 / Loop Mitigation</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Routing Loops & Prevention</h2>
            <p>
              The most notorious pathological failure mode of distance-vector routing is the <strong>Count-to-Infinity problem</strong>, where adjacent routers bounce incrementing metrics back and forth following a link failure.
            </p>

            <LoopMechanicsVisualizer />

            <CalloutBox type="insight" title="Holddown Behavior" cite="RFC 2453 / Cisco IOS Architecture">
              While Split Horizon, Poison Reverse, and Triggered Updates are defined in RFC 2453, <strong>Holddown Timers</strong> are an implementation-dependent mechanism (pioneered by Cisco IOS) rather than a universally mandatory protocol timer.
            </CalloutBox>
          </section>

          {/* ========================================================================= */}
          {/* 11 — PRACTICAL CISCO CONFIGURATION */}
          {/* ========================================================================= */}
          <section id="sec-11" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">11 / Practical Engineering</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Practical Cisco Configuration</h2>
            <p>
              Below is a real-world, production-ready Cisco IOS-XE configuration snippet implementing RIPv2, disabling legacy auto-summarization, and securing access ports with <code>passive-interface</code>:
            </p>

            <ConfigTerminal />
          </section>

          {/* ========================================================================= */}
          {/* 12 — RIP VS OTHER ROUTING PROTOCOLS */}
          {/* ========================================================================= */}
          <section id="sec-12" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">12 / Comparative Analysis</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">RIP vs. Other Routing Protocols</h2>
            <p>
              How does RIP measure up against modern Interior and Exterior Gateway Protocols like OSPF, EIGRP, and BGP?
            </p>

            <ProtocolRadar />
          </section>

          {/* ========================================================================= */}
          {/* 13 — ADVANTAGES AND LIMITATIONS */}
          {/* ========================================================================= */}
          <section id="sec-13" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">13 / Objective Evaluation</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Advantages and Limitations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-2 shadow-liquid-glass">
                <span className="text-[#2F6BFF] font-bold text-sm block">Architectural Advantages</span>
                <ul className="space-y-1.5 text-[#D8CBB3]">
                  <li>• Minimal CPU and RAM utilization.</li>
                  <li>• Simple configuration; zero area hierarchy design needed.</li>
                  <li>• Universally supported across virtually every router vendor since 1988.</li>
                  <li>• Ideal for small, homogeneous branch networks with identical link bandwidths.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#121210] border border-[#D8CBB3]/20 space-y-2 shadow-liquid-glass">
                <span className="text-rose-400 font-bold text-sm block">Fundamental Limitations</span>
                <ul className="space-y-1.5 text-[#D8CBB3]">
                  <li>• Maximum hop count capped strictly at 15.</li>
                  <li>• Hop metric is bandwidth-blind (56k dialup preferred over 100Gbps fiber).</li>
                  <li>• Periodic 30-second broadcasts consume transmission bandwidth.</li>
                  <li>• Slow convergence compared to sub-second OSPF Dijkstra SPF.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 14 — CONCLUSION: IS RIP STILL RELEVANT? */}
          {/* ========================================================================= */}
          <section id="sec-14" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">14 / Retrospective</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Conclusion: Is RIP Still Relevant?</h2>
            <p>
              In contemporary enterprise and cloud hyperscaler backbones, RIP has largely been superseded by link-state protocols (OSPF, IS-IS) and path-vector systems (BGP). Its 15-hop boundary and inability to measure link bandwidth make it unsuited for complex high-throughput networks.
            </p>
            <p>
              However, <strong>RIP remains of immense educational and architectural importance</strong>. It represents the quintessential implementation of distributed dynamic programming in computer networks. By understanding how RIP handles route dissemination, timer state machines, and count-to-infinity loop hazards, network engineers master the fundamental principles upon which all modern distributed routing systems are built.
            </p>
          </section>

          {/* ========================================================================= */}
          {/* 15 — STANDARDS & REFERENCES */}
          {/* ========================================================================= */}
          <section id="sec-15" className="scroll-mt-28 p-6 sm:p-10 md:p-12 rounded-3xl topbar-glass-card space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">15 / Academic Bibliography</div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] tracking-tight">Standards & Primary References</h2>
            <p className="text-sm">
              All claims, formulas, and protocol behaviors documented in this publication are cross-referenced with primary IETF standards:
            </p>
            <div className="space-y-2 not-prose font-mono text-xs">
              <a href="https://datatracker.ietf.org/doc/html/rfc1058" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 flex items-center justify-between text-[#D8CBB3] hover:text-[#FAF7F2] hover:border-[#2F6BFF] transition-colors">
                <span>RFC 1058 — Routing Information Protocol (Hedrick, 1988)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href="https://datatracker.ietf.org/doc/html/rfc2453" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 flex items-center justify-between text-[#D8CBB3] hover:text-[#FAF7F2] hover:border-[#2F6BFF] transition-colors">
                <span>RFC 2453 / STD 56 — RIP Version 2 (Malkin, 1998)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href="https://datatracker.ietf.org/doc/html/rfc2080" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#121210] border border-[#D8CBB3]/20 flex items-center justify-between text-[#D8CBB3] hover:text-[#FAF7F2] hover:border-[#2F6BFF] transition-colors">
                <span>RFC 2080 — RIPng for IPv6 (Malkin & Minnear, 1997)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* Glossary Embedded at bottom of Article */}
          <div className="p-6 sm:p-10 rounded-3xl topbar-glass-card">
            <GlossaryDrawer />
          </div>

        </article>

      </div>

      {/* Colophon & Apparatus */}
      <Colophon />

    </div>
  );
};
