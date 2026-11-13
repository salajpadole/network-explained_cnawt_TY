import React, { useEffect, useRef } from 'react';
import { useRouter } from '../router';
import { sound } from '../audio/soundEngine';
import { ThreeHeroNetwork } from '../effects/ThreeHeroNetwork';
import { 
  ArrowRight, Compass, Network, FlaskConical, BookOpen, 
  Cpu, ShieldCheck, Activity, Terminal, ExternalLink, Sparkles 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // GSAP Staggered Hero entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroTextRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (path: string) => {
    sound.playClick();
    navigate(path);
  };

  return (
    <div className="relative text-slate-100 bg-[#050811] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* SCENE 01 — OPENING CINEMATIC HERO EXPERIENCE (85-100vh) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-24 pb-12 border-b border-slate-900 overflow-hidden">
        
        {/* Three.js Canvas Network Engine */}
        <ThreeHeroNetwork />

        <div ref={heroTextRef} className="relative z-10 max-w-5xl mx-auto w-full">
          
          {/* Metadata pill */}
          <div className="hero-reveal flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-400 mb-6">
            <span className="px-2.5 py-1 rounded bg-sky-950/70 border border-sky-800/60 font-semibold shadow-glow-cyan">
              ROUTING PROTOCOLS / FEATURED ARTICLE 001
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">STD 56 (RFC 2453)</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">PEER-REVIEWED MONOGRAPH</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="hero-reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-white tracking-tight leading-[1.04]">
            UNDERSTANDING THE LANGUAGE OF NETWORKS.
          </h1>

          {/* Supporting Text */}
          <p className="hero-reveal mt-6 sm:mt-8 text-lg sm:text-2xl text-slate-300 font-serif italic max-w-2xl leading-relaxed">
            Exploring the invisible systems, protocols and architecture that connect our digital world.
          </p>

          {/* Featured Article Callout inside Hero */}
          <div className="hero-reveal mt-10 p-5 sm:p-6 rounded-2xl glass-panel-elevated border border-sky-500/30 max-w-xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-1">
              Current Featured Monograph
            </div>
            <div className="text-xl sm:text-2xl font-serif text-white font-medium">
              RIP — The Routing Information Protocol
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              An exhaustive analysis of distributed Bellman-Ford computation, metric infinity, and convergence dynamics.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleNavigate('/articles/rip-routing-protocol')}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-glow-cyan"
              >
                <span>Read Full Publication</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavigate('/lab')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs transition-colors flex items-center gap-2"
              >
                <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                <span>Launch Interactive Lab</span>
              </button>
            </div>
          </div>

          {/* Subtle scroll cue */}
          <div className="hero-reveal mt-12 flex items-center gap-3 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-slate-700" />
            <span>Scroll to Discover Publication</span>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 02 — PUBLICATION INTRODUCTION (Asymmetric Composition) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-slate-900 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bold statement */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-3">
              Editorial Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight">
              THE DIGITAL WORLD RUNS ON CONNECTIONS.
            </h2>
            <div className="mt-6 w-12 h-1 bg-sky-500/80 rounded-full" />
          </div>

          {/* Right Column: Purpose and Interactive Scroll Diagram */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            <p>
              Beneath every web interaction, API call, and streaming packet lies a labyrinth of autonomous systems making decentralized decisions at the speed of light.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              <strong>NETWORK EXPLAINED</strong> was conceived to illuminate these fundamental protocols. We reject generic documentation summaries and superficial definitions in favor of deep mathematical rigor, frame-by-frame packet inspections, and deterministic network simulations.
            </p>

            {/* Subtle Interactive Reactive Diagram */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 not-prose mt-8">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Routing Axiom</span>
                </span>
                <span className="text-[11px] text-sky-400">Bellman-Ford Dynamic</span>
              </div>
              <div className="flex items-center justify-between text-center font-mono text-xs py-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">LOCAL ROUTER</div>
                  <div className="text-white font-bold text-sm mt-1">Node X</div>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="w-full h-0.5 bg-gradient-to-r from-sky-500 to-emerald-400 relative">
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2">Vector Exchange: UDP 520</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">NEIGHBOR ROUTER</div>
                  <div className="text-white font-bold text-sm mt-1">Node V</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 03 — FEATURED ARTICLE (Magazine Cover Aesthetic) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-slate-900 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Primary Monograph</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">Featured Publication</h2>
          </div>
          <button
            onClick={() => handleNavigate('/articles')}
            className="text-xs font-mono text-slate-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Complete Index</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Magazine Cover Composition */}
        <div 
          onClick={() => handleNavigate('/articles/rip-routing-protocol')}
          className="group cursor-pointer rounded-3xl border border-slate-800 hover:border-sky-500/50 bg-gradient-to-b from-slate-900/60 to-slate-950/90 p-8 sm:p-12 transition-all duration-300 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/10 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800/80 text-sky-300 font-bold">
                  ISSUE 001
                </span>
                <span>•</span>
                <span>ROUTING PROTOCOLS</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">24 MIN READ</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-serif text-white group-hover:text-sky-200 transition-colors leading-[1.1]">
                RIP: The Routing Information Protocol
              </h3>

              <p className="text-base sm:text-lg text-slate-300 font-serif italic max-w-2xl leading-relaxed">
                Understanding how routers exchange information, calculate distances via Bellman-Ford, and make decisions across interconnected networks.
              </p>

              <div className="pt-4 flex items-center gap-3 text-xs font-mono text-sky-400 group-hover:text-sky-300 font-bold">
                <span>Inspect Monograph (15 Chapters & Integrated Sandboxes)</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Visual Abstract Emblem */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-slate-950 border border-slate-800/80 p-6 flex flex-col justify-between group-hover:border-sky-500/40 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>RFC 2453 / STD 56</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-white">15 HOPS</div>
                  <div className="text-[10px] font-mono text-rose-400 mt-1">16 = INFINITY</div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 text-center border-t border-slate-800/60 pt-2">
                  Bellman-Ford Metric Engine
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 04 — EXPLORE THE SUBJECT (Editorial Taxonomy) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-slate-900 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Curriculum Taxonomy</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white mt-1">
            Explore Networking Subjects
          </h2>
          <p className="mt-2 text-slate-400 text-sm font-sans max-w-xl">
            Explore the core pillars of autonomous networking. Active monographs are available immediately; future editions are currently in peer review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Active: Routing */}
          <div 
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            className="p-6 rounded-2xl border border-sky-500/40 bg-sky-950/20 hover:border-sky-400 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-4">
              <span className="text-emerald-400 font-bold">● Published (Article 001)</span>
              <Compass className="w-4 h-4 text-sky-400" />
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-sky-300 transition-colors">
              Routing Protocols
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
              Interior & Exterior Gateway Protocols (RIP, OSPF, EIGRP, BGP), metric models, and loop mitigation.
            </p>
          </div>

          {/* Planned: Network Architecture */}
          <div className="p-6 rounded-2xl border border-slate-800/70 bg-slate-950/40 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-500">
              <span>Planned Series</span>
              <Network className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-xl font-serif text-slate-200">
              Network Architecture
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
              Spine-leaf fabrics, autonomous systems, VLAN segmentation, and enterprise backbones.
            </p>
          </div>

          {/* Planned: Protocols */}
          <div className="p-6 rounded-2xl border border-slate-800/70 bg-slate-950/40 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-500">
              <span>Planned Series</span>
              <Activity className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-xl font-serif text-slate-200">
              Transport & Wire Protocols
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
              TCP congestion physics, UDP datagrams, QUIC, and lower-layer frame encapsulations.
            </p>
          </div>

          {/* Planned: Security */}
          <div className="p-6 rounded-2xl border border-slate-800/70 bg-slate-950/40 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-500">
              <span>Planned Series</span>
              <ShieldCheck className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-xl font-serif text-slate-200">
              Network Security
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
              Route spoofing, MD5 authentication, IPsec tunnel mechanics, and border ACL filtering.
            </p>
          </div>

          {/* Planned: Data Transmission */}
          <div className="p-6 rounded-2xl border border-slate-800/70 bg-slate-950/40 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-slate-500">
              <span>Planned Series</span>
              <Terminal className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-xl font-serif text-slate-200">
              Data Transmission
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
              Physical layer propagation delay, optical transmission channels, and queuing disciplines.
            </p>
          </div>

          {/* Interactive Lab Link */}
          <div 
            onClick={() => handleNavigate('/lab')}
            className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="text-emerald-400 font-bold">5 Active Simulations</span>
                <FlaskConical className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-xl font-serif text-white group-hover:text-emerald-300 transition-colors">
                Interactive Lab
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
                Experience dynamic Bellman-Ford calculations and fault injection in real-time.
              </p>
            </div>
            <div className="mt-4 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span>Enter Laboratory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 05 — INTERACTIVE PREVIEW ("SEE HOW THE NETWORK THINKS") */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-slate-900 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-sky-500/30 bg-slate-950/80 p-8 sm:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Signature Educational Instrument
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                SEE HOW THE NETWORK THINKS.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-serif italic leading-relaxed">
                Explore how routing information moves between routers and how a network learns where to send data.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Our custom digital simulator models link failure injection, count-to-infinity route metric inflation, Split Horizon, and Layer-3 IP packet routing.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => handleNavigate('/lab')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-glow-emerald"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>ENTER THE LAB</span>
                </button>
              </div>
            </div>

            {/* Mini Animated Topology Preview Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono text-xs space-y-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Live Simulation Sandbox</div>
                <div className="flex items-center justify-between px-2">
                  <div className="p-2.5 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 font-bold">R1</div>
                  <div className="flex-1 h-0.5 bg-sky-500 mx-2 relative">
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 font-bold">R2</div>
                  <div className="flex-1 h-0.5 bg-sky-500 mx-2" />
                  <div className="p-2.5 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 font-bold">R3</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-emerald-400">
                  State: Deterministic Convergence
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 06 — CLOSING SECTION & TRANSITION INTO FOOTER */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 text-center max-w-4xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3 block">
          Editorial Conclusion
        </span>
        <h2 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-tight">
          EVERY CONNECTION HAS A STORY.
        </h2>
        <p className="mt-6 text-base sm:text-xl text-slate-400 font-serif italic max-w-xl mx-auto">
          Delve into our definitive technical monographs and explore how human ingenuity transformed copper wires and light into a planetary nervous system.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <button
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-glow-cyan transition-all"
          >
            Read RIP Monograph
          </button>
          <button
            onClick={() => handleNavigate('/about')}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            Colophon & References
          </button>
        </div>
      </section>

    </div>
  );
};
