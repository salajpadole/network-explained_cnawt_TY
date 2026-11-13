import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import { Header } from './components/layout/Header';
import { Colophon } from './components/layout/Colophon';
import { GridBackground } from './components/effects/GridBackground';

// Editorial Components
import { SectionHeader } from './components/editorial/SectionHeader';
import { FormulaCard } from './components/editorial/FormulaCard';
import { PacketDissector } from './components/editorial/PacketDissector';
import { TimerLifecycleVisualizer } from './components/editorial/TimerLifecycleVisualizer';
import { LoopMechanicsVisualizer } from './components/editorial/LoopMechanicsVisualizer';
import { VersionComparator } from './components/editorial/VersionComparator';
import { ConfigTerminal } from './components/editorial/ConfigTerminal';
import { ProtocolRadar } from './components/editorial/ProtocolRadar';
import { CalloutBox } from './components/editorial/CalloutBox';

// Interactive Components
import { RipSimulator } from './components/simulator/RipSimulator';
import { InteractiveQuiz } from './components/interactive/InteractiveQuiz';
import { GlossaryDrawer } from './components/interactive/GlossaryDrawer';
import { ConvergenceCalculator } from './components/interactive/ConvergenceCalculator';

// Icons & Sound
import { 
  Network, ArrowDown, BookOpen, Cpu, ShieldCheck, 
  Terminal, Sparkles, CheckCircle2, AlertTriangle, ExternalLink, Play
} from 'lucide-react';
import { sound } from './audio/soundEngine';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('prologue');
  const [paradoxChoice, setParadoxChoice] = useState<'hop' | 'bandwidth'>('hop');

  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Update active section based on scroll
  useEffect(() => {
    const sections = [
      'prologue',
      'bellman-ford',
      'architecture',
      'metric-infinity',
      'timers',
      'loop-pathologies',
      'simulator',
      'configuration',
      'comparative-crucible',
      'mastery-quiz',
      'glossary',
      'colophon'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToElement = (id: string) => {
    sound.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#070A0F] overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Background Canvas Particles */}
      <GridBackground />

      {/* Global Publication Header */}
      <Header activeSection={activeSection} />

      {/* Main Editorial Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-36 pb-24">
        
        {/* ========================================================================= */}
        {/* HERO MASTHEAD */}
        {/* ========================================================================= */}
        <section id="prologue" className="pb-16 sm:pb-24 border-b border-slate-800">
          
          {/* Metadata Pill */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono tracking-widest uppercase text-sky-400 mb-6">
            <span className="px-2.5 py-1 rounded bg-sky-950/70 border border-sky-800/60 font-semibold shadow-glow-cyan">
              MONOGRAPH 01
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">RFC 1058 / STD 56 (RFC 2453)</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium">PEER-REVIEWED MONOGRAPH</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white tracking-tight leading-[1.08]">
            The Routing Information Protocol
          </h1>

          <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-slate-300 font-serif italic leading-relaxed max-w-3xl">
            A critical investigation into distributed Bellman-Ford convergence, metric infinity, and the temporal mechanics of distance-vector routing.
          </p>

          {/* Author byline */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-bold text-sky-400">
                SP
              </div>
              <div>
                <div className="text-slate-200 font-bold">Salaj Padole</div>
                <div className="text-slate-500">PRN: 12412336 • Roll: 43 • CNAWT Tutorial Series</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <div>Est. Reading: <span className="text-slate-200 font-bold">24 min</span></div>
              <span>•</span>
              <div>Apparatus: <span className="text-emerald-400 font-bold">12 Interactive Labs</span></div>
            </div>
          </div>

          {/* Hero Interactive: The Hop-Count Paradox */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  Introductory Thought Experiment
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white mt-0.5">
                  The Fundamental Flaw: The Hop-Count Blind Spot
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { sound.playClick(); setParadoxChoice('hop'); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    paradoxChoice === 'hop'
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}
                >
                  Pure RIP Metric
                </button>
                <button
                  onClick={() => { sound.playClick(); setParadoxChoice('bandwidth'); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    paradoxChoice === 'bandwidth'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}
                >
                  Physical Reality
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Path Alpha: 1 Hop over 56kbps satellite */}
              <div className={`p-4 rounded-xl border transition-all ${
                paradoxChoice === 'hop'
                  ? 'border-sky-500/80 bg-sky-950/40 shadow-glow-cyan'
                  : 'border-slate-800 bg-slate-900/40 opacity-70'
              }`}>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="font-bold text-sky-400">Path Alpha: Direct Satellite</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800">1 Hop</span>
                </div>
                <div className="mt-2 text-slate-300">
                  Media: 56 Kbps Legacy Dial-up • Latency: 600 ms
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-500">RIP Metric Score:</span>
                  <strong className="text-sky-300 text-sm">1 HOP (WINNER IN RIP)</strong>
                </div>
              </div>

              {/* Path Beta: 2 Hops over 100 Gbps optical fiber */}
              <div className={`p-4 rounded-xl border transition-all ${
                paradoxChoice === 'bandwidth'
                  ? 'border-emerald-500/80 bg-emerald-950/40 shadow-glow-emerald'
                  : 'border-slate-800 bg-slate-900/40 opacity-70'
              }`}>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="font-bold text-emerald-400">Path Beta: Transit Fiber</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800">2 Hops</span>
                </div>
                <div className="mt-2 text-slate-300">
                  Media: 100 Gbps Undersea Fiber • Latency: 2 ms
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-500">RIP Metric Score:</span>
                  <strong className="text-rose-400 text-sm">2 HOPS (DISCARDED BY RIP)</strong>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {paradoxChoice === 'hop' ? (
                <span>
                  <strong>The RIP Verdict:</strong> Because pure RIP evaluates paths strictly by integer hop count, it selects the single-hop 56kbps satellite link, completely unaware that it is routing high-bandwidth enterprise traffic over a painfully congested bottleneck.
                </span>
              ) : (
                <span>
                  <strong>Physical Reality:</strong> Path Beta offers over 1,700,000× more bandwidth and 300× lower latency. Modern link-state protocols like OSPF calculate cost based on bandwidth ($Cost = 10^8 / Bandwidth$), avoiding this catastrophic pitfall.
                </span>
              )}
            </p>
          </div>

          {/* Quick jump CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToElement('simulator')}
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-cyan transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live RIP Network Simulator</span>
            </button>
            <button
              onClick={() => scrollToElement('bellman-ford')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <span>Begin Chapter 01: Bellman-Ford</span>
              <ArrowDown className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 01: THE MATHEMATICAL ENGINE (BELLMAN-FORD) */}
        {/* ========================================================================= */}
        <section id="bellman-ford" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="01"
            category="Graph Theory & Algorithmic Foundations"
            title="The Mathematical Engine: The Bellman-Ford Equation"
            subtitle="Before the Routing Information Protocol could exist as a software daemon, it existed as pure mathematics—a dynamic programming technique formulated by Richard Bellman and Lester Ford Jr."
            readTime="5 min"
          />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6 pt-6">
            <p>
              In computer networking, routing is fundamentally a graph optimization challenge. An autonomous network is represented as a directed graph $G = (V, E)$, where the set of vertices $V$ denotes routers and the set of directed edges $E$ denotes physical or logical transmission links between them.
            </p>
            <p>
              Unlike link-state protocols (such as OSPF or IS-IS), which distribute the entire topology map to every node so each can run Dijkstra’s Single-Source Shortest Path algorithm locally, distance-vector protocols use a <em>decentralized, iterative dynamic programming algorithm</em>. Each router maintains only a vector of its calculated distances to all known destinations and communicates solely with its immediate adjacent neighbors.
            </p>
          </div>

          <FormulaCard />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6">
            <p>
              The beauty—and fragility—of the Bellman-Ford equation lies in its recursive dependency. Router $x$ does not know the full path to destination $y$. It only knows which neighbor $v$ claimed to have the shortest path, and adds the edge cost $c(x,v)$ to neighbor $v$’s advertised estimate $D_v(y)$.
            </p>
            <p>
              This architectural design is often characterized by network engineers as <strong>"routing by rumor."</strong> A router believes what its neighbors tell it. If neighbor $v$ makes a mistake—or if an edge along $v$’s path breaks without $v$ having realized it yet—router $x$ accepts the erroneous advertisement as truth.
            </p>
          </div>

          <CalloutBox type="theorem" title="Bellman-Ford Convergence Theorem (Bellman, 1958)" cite="Quarterly of Applied Mathematics 16(1):87-90">
            For any static, connected digraph $G$ containing no negative-cost cycles, the distributed asynchronous Bellman-Ford algorithm is guaranteed to converge to the true global shortest-path distances in at most $|V| - 1$ iterative rounds, where $|V|$ represents the total number of routers in the network.
          </CalloutBox>
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 02: RIP ARCHITECTURE & PACKET DISSECTION */}
        {/* ========================================================================= */}
        <section id="architecture" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="02"
            category="Protocol Specification & Transport"
            title="Protocol Architecture & Packet Anatomy"
            subtitle="RFC 1058 formalized RIP in 1988, followed a decade later by RFC 2453 (STD 56). Understanding RIP requires analyzing its encapsulation over UDP Port 520 and dissecting its exact binary layout."
            readTime="6 min"
          />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6 pt-6">
            <p>
              One of the most curious architectural aspects of RIP is that it operates as an <strong>Application Layer daemon</strong> (running as <code>routed</code> in BSD Unix or <code>ripd</code> in modern Linux FRRouting), encapsulated directly inside <strong>User Datagram Protocol (UDP) datagrams on Port 520</strong>.
            </p>
            <p>
              By contrast, OSPF sits directly on top of raw IP (Protocol 89), and EIGRP uses Protocol 88 (RTP). RIP relies on UDP for its transport, accepting the absence of reliable delivery guarantees in exchange for low protocol overhead.
            </p>
          </div>

          <PacketDissector />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6">
            <p>
              Every RIP packet begins with a 4-byte header consisting of a 1-byte <code>Command</code> (1 for Request, 2 for Response), a 1-byte <code>Version</code> (1 or 2), and a 2-byte <code>Routing Domain</code> identifier.
            </p>
            <p>
              Following the header are up to <strong>25 Route Table Entries (RTEs)</strong>, each consuming exactly 20 bytes. Thus, the maximum size of a standard RIP payload is:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-sky-300 text-sm">
              4 bytes (Header) + (25 × 20 bytes Route Entries) = 504 bytes
            </div>
            <p>
              This 504-byte ceiling was deliberately chosen in 1988 so that a complete RIP packet, when prepended with an 8-byte UDP header and a 20-byte IPv4 header (total 532 bytes), would easily fit within the historical <strong>576-byte minimum IP MTU</strong> without requiring IP fragmentation.
            </p>
          </div>

          <CalloutBox type="rfc" title="RFC 2453 Section 3.4 — Multicast Addressing" cite="RFC 2453 / STD 56">
            RIPv2 mandates transmission to the IPv4 multicast address <code>224.0.0.9</code> (All-RIP2-Routers), bound to Ethernet MAC <code>01:00:5E:00:00:09</code>. Non-routing end hosts on the LAN examine the MAC destination in hardware and discard the frame at the physical NIC layer without waking the operating system kernel.
          </CalloutBox>
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 03: THE 15-HOP LIMIT & METRIC INFINITY */}
        {/* ========================================================================= */}
        <section id="metric-infinity" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="03"
            category="Metrics & Mathematical Boundaries"
            title="The Hop Metric & The 15-Hop Frontier"
            subtitle="Why does RIP enforce a maximum network diameter of 15 hops? Why is 16 defined as mathematical infinity? Exploring the deliberate algorithmic constraint that saves networks from eternal loops."
            readTime="4 min"
          />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6 pt-6">
            <p>
              In RIP, the metric used to measure distance is strictly the <strong>hop count</strong>. A directly connected network has a metric of 0 in internal tables (advertised to neighbors as 1 hop). Every router that forwards a routing update increments the metric by 1.
            </p>
            <p>
              However, the protocol defines <strong>16 as Infinity ($\infty$)</strong>. Any route whose hop count reaches 16 is immediately deemed unreachable. Consequently, the maximum usable diameter of any RIP routing domain is exactly <strong>15 hops</strong>.
            </p>
          </div>

          <div className="my-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Valid Operational Range</span>
              <div className="text-3xl font-mono font-bold text-emerald-400 mt-1">1 — 15 Hops</div>
              <div className="text-xs text-slate-400 mt-1">Packets routed normally</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Defined Infinity Bound</span>
              <div className="text-3xl font-mono font-bold text-rose-400 mt-1">16 (Infinity)</div>
              <div className="text-xs text-slate-400 mt-1">Unreachable / Dead Route</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Max Convergence Bounding</span>
              <div className="text-3xl font-mono font-bold text-sky-400 mt-1">16 Iterations</div>
              <div className="text-xs text-slate-400 mt-1">Loop guaranteed to terminate</div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6">
            <p>
              Why 16? Why not 255 (the maximum value of an 8-bit integer)?
            </p>
            <p>
              The answer lies in the <em>Count-to-Infinity problem</em>. If a link fails and routers begin bouncing incrementing metrics back and forth (e.g. $2 \to 3 \to 4 \dots$), the time required for the network to recognize that the destination is dead is proportional to the infinity threshold multiplied by the update timer:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-amber-300 text-sm">
              T(failure) = Metric(Infinity) × Update Timer (30s)
            </div>
            <p>
              With Metric(Infinity) = 16, the loop terminates after at most 16 × 30 seconds ≈ 8 minutes. Had the creators chosen 255 as infinity, a failed route would bounce for 255 × 30 seconds ≈ 127.5 minutes (over two hours of total network failure!). Thus, 16 represents an intentional engineering compromise between network diameter and failure convergence latency.
            </p>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 04: TEMPORAL MECHANICS & TIMERS */}
        {/* ========================================================================= */}
        <section id="timers" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="04"
            category="Temporal State Machines"
            title="Temporal Mechanics: The Four Core RIP Timers"
            subtitle="Routing in RIP is paced by four interconnected clocks. Scrub the interactive timeline to watch an active route age, timeout into metric 16, and eventually get purged from the routing information base."
            readTime="5 min"
          />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6 pt-6">
            <p>
              Because RIP does not establish persistent TCP sessions or exchange explicit link-state acknowledgments, it relies entirely on soft-state temporal refresh mechanisms. A route is only kept alive if its neighbor periodically re-asserts its existence.
            </p>
          </div>

          <TimerLifecycleVisualizer />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6">
            <p>
              The four foundational timers defined in RFC 2453 are:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Periodic Update Timer (30 Seconds):</strong> Every 30 seconds (with randomized jitter between 25.5s and 34.5s), the router transmits its entire routing table out of all active RIP interfaces.
              </li>
              <li>
                <strong>Route Timeout / Invalid Timer (180 Seconds):</strong> If no update for a route arrives for 180 seconds (equivalent to 6 consecutive missed update cycles), the route is declared invalid and its metric is set to 16.
              </li>
              <li>
                <strong>Flush / Garbage-Collection Timer (240 Seconds):</strong> Measures 240 seconds from the last valid update (or 60 seconds after the invalid timer fires). During this 60-second grace window, the router continues to advertise the route with metric 16 so neighbors learn of the poison before the record is completely expunged from memory.
              </li>
              <li>
                <strong>Holddown Timer (180 Seconds):</strong> Optional Cisco enhancement that temporarily suppresses any new updates offering worse or equal metrics for a poisoned destination, allowing network-wide convergence to stabilize.
              </li>
            </ol>
          </div>

          {/* Interactive Calculator */}
          <ConvergenceCalculator />
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 05: LOOP PATHOLOGIES & SAFEGUARDS */}
        {/* ========================================================================= */}
        <section id="loop-pathologies" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="05"
            category="Pathological Failure Modes"
            title="The Count-to-Infinity Pathology & Loop Safeguards"
            subtitle="The Achilles heel of distance-vector routing: how simple topological breaks cause mutual misinformation loops, and the four guardian techniques developed to neutralize them."
            readTime="7 min"
          />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6 pt-6">
            <p>
              The most notorious flaw of distributed distance-vector routing is the <strong>Count-to-Infinity problem</strong>. It arises because a router does not maintain global topological awareness; when a link fails, neighbors inadvertently exchange stale advertisements and create closed circular forwarding loops.
            </p>
          </div>

          <LoopMechanicsVisualizer />

          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-6">
            <h3 className="text-xl font-serif text-white mt-8 mb-4">The Four Guardian Mechanisms</h3>
            <p>
              To mitigate routing loops, modern distance-vector protocols deploy four interdependent safeguards:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-xs font-bold text-emerald-400 block mb-1">1. Split Horizon</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Never tell your teacher what they taught you." A router never advertises a route out through the interface on which it was originally learned.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-xs font-bold text-sky-400 block mb-1">2. Poison Reverse</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instead of staying silent, the router explicitly advertises the route back to the source with metric 16 (Infinity), confirming that reverse transit is impossible.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-xs font-bold text-amber-400 block mb-1">3. Triggered Updates (Flash Updates)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When a topology change or link failure occurs, the router does NOT wait for the 30-second timer; it immediately broadcasts a poison update within milliseconds.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-mono text-xs font-bold text-purple-400 block mb-1">4. Holddown Timers</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When a router is informed of a route failure, it places the route in "holddown" for 180 seconds, refusing any newly advertised paths unless they offer a strictly better metric than the old path.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 06: SIGNATURE EXPERIENCE (NETWORK SIMULATOR) */}
        {/* ========================================================================= */}
        <section id="simulator" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="06"
            category="Interactive Laboratory Experience"
            title="The Signature Experience: Distributed RIP Simulator"
            subtitle="Engage directly with the distributed Bellman-Ford algorithm in real-time. Sever links, watch packet forwarding decisions, toggle loop safeguards, and inspect live hardware routing tables."
            readTime="Interactive"
          />

          <RipSimulator />
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 07: REAL-WORLD CONFIGURATION */}
        {/* ========================================================================= */}
        <section id="configuration" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="07"
            category="Production Network Engineering"
            title="Real-World Deployment: Cisco, Juniper, and Linux FRR"
            subtitle="Inspect production-grade CLI syntax, command-by-command annotations, and debugging commands across commercial network operating systems."
            readTime="5 min"
          />

          <ConfigTerminal />

          <VersionComparator />
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 08: THE PROTOCOL CRUCIBLE */}
        {/* ========================================================================= */}
        <section id="comparative-crucible" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="08"
            category="Comparative Architecture & Selection"
            title="The Protocol Crucible: RIP vs. OSPF vs. EIGRP vs. BGP"
            subtitle="An objective architectural showdown across computational load, convergence dynamics, metric expressiveness, and administrative distance."
            readTime="6 min"
          />

          <ProtocolRadar />
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 09: TECHNICAL MASTERY QUIZ */}
        {/* ========================================================================= */}
        <section id="mastery-quiz" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="09"
            category="Academic Certification Examination"
            title="Academic Rigor: The RIP Mastery Assessment"
            subtitle="Test your understanding against 10 academically vetted examination questions covering packet headers, timer mathematics, and loop dynamics."
            readTime="8 min"
          />

          <InteractiveQuiz />
        </section>


        {/* ========================================================================= */}
        {/* CHAPTER 10: SEARCHABLE GLOSSARY */}
        {/* ========================================================================= */}
        <section id="glossary" className="scroll-mt-20">
          <SectionHeader
            chapterNumber="10"
            category="Reference Lexicon"
            title="Lexicon of Distributed Routing Terminology"
            subtitle="Comprehensive definitions, acronyms, and standard references for every technical term employed throughout this monograph."
            readTime="Reference"
          />

          <GlossaryDrawer />
        </section>

      </main>

      {/* Global Colophon & Critical Apparatus Footer */}
      <Colophon />

    </div>
  );
};

export default App;
