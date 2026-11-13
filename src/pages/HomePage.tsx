import React, { useEffect, useRef } from 'react';
import { useRouter } from '../router';
import { sound } from '../audio/soundEngine';
import { ThreeHeroNetwork } from '../effects/ThreeHeroNetwork';
import { LiquidMetalAction, LiquidButton } from '../components/buttons/LiquidMetalAction';
import { 
  ArrowRight, Compass, Network, FlaskConical, BookOpen, 
  Cpu, ShieldCheck, Activity, Terminal, ExternalLink, Sparkles, Play
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    <div className="relative text-[#D8CBB3] bg-[#1E1E1C] overflow-x-hidden selection:bg-[#2F6BFF]/30 selection:text-white">
      
      {/* ========================================================================= */}
      {/* SCENE 01 — OPENING CINEMATIC HERO EXPERIENCE (85-100vh) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-24 pb-12 border-b border-[#D8CBB3]/10 overflow-hidden">
        
        {/* Three.js Canvas Network Engine in Sand & Electric Blue */}
        <ThreeHeroNetwork />

        <div ref={heroTextRef} className="relative z-10 max-w-5xl mx-auto w-full">
          
          {/* Metadata pill */}
          <div className="hero-reveal flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-6">
            <span className="px-3 py-1 rounded-full bg-[#181816]/90 border border-[#2F6BFF]/50 font-bold text-[#2F6BFF] shadow-glow-electric">
              ROUTING PROTOCOLS / FEATURED ARTICLE 001
            </span>
            <span className="text-[#A8997C]">•</span>
            <span className="text-[#D8CBB3]">STD 56 (RFC 2453)</span>
            <span className="text-[#A8997C]">•</span>
            <span className="text-[#F5EFE6] font-medium">PEER-REVIEWED MONOGRAPH</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="hero-reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-[#F5EFE6] tracking-tight leading-[1.04]">
            UNDERSTANDING THE LANGUAGE OF NETWORKS.
          </h1>

          {/* Supporting Text */}
          <p className="hero-reveal mt-6 sm:mt-8 text-lg sm:text-2xl text-[#D8CBB3] font-serif italic max-w-2xl leading-relaxed">
            Exploring the invisible systems, protocols and architecture that connect our digital world.
          </p>

          {/* Featured Article Callout with Liquid Metal Buttons */}
          <div className="hero-reveal mt-10 p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-[#D8CBB3]/20 max-w-2xl relative overflow-hidden">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#2F6BFF] mb-1 font-bold">
              Current Featured Monograph
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#F5EFE6] font-medium">
              RIP — The Routing Information Protocol
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[#A8997C] font-sans leading-relaxed">
              An exhaustive analysis of distributed Bellman-Ford computation, metric infinity, and convergence dynamics.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {/* Liquid Metal Shader Action Button from @designcodeio/threeui */}
              <div className="flex items-center gap-2">
                <LiquidMetalAction
                  variant="play"
                  rendering="colored"
                  diameter={78}
                  strokeWidth={2.8}
                  text="Explore"
                  onClick={() => handleNavigate('/articles/rip-routing-protocol')}
                />
              </div>

              <LiquidButton
                variant="primary"
                size="md"
                onClick={() => handleNavigate('/articles/rip-routing-protocol')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Read Full Publication
              </LiquidButton>

              <LiquidButton
                variant="secondary"
                size="md"
                onClick={() => handleNavigate('/lab')}
                icon={<FlaskConical className="w-4 h-4 text-[#2F6BFF]" />}
              >
                Launch Lab
              </LiquidButton>
            </div>
          </div>

          {/* Subtle scroll cue */}
          <div className="hero-reveal mt-12 flex items-center gap-3 text-xs font-mono text-[#A8997C] uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-[#D8CBB3]/30" />
            <span>Scroll to Discover Publication</span>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 02 — PUBLICATION INTRODUCTION (Asymmetric Composition) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-[#D8CBB3]/10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bold statement */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] block mb-3 font-bold">
              Editorial Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5EFE6] leading-tight">
              THE DIGITAL WORLD RUNS ON CONNECTIONS.
            </h2>
            <div className="mt-6 w-12 h-1 bg-[#2F6BFF] rounded-full shadow-glow-electric" />
          </div>

          {/* Right Column: Purpose and Interactive Scroll Diagram */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#D8CBB3] font-sans leading-relaxed">
            <p>
              Beneath every web interaction, API call, and streaming packet lies a labyrinth of autonomous systems making decentralized decisions at the speed of light.
            </p>
            <p className="text-[#A8997C] text-sm sm:text-base">
              <strong className="text-[#F5EFE6]">NETWORK EXPLAINED</strong> was conceived to illuminate these fundamental protocols. We reject generic documentation summaries and superficial definitions in favor of deep mathematical rigor, frame-by-frame packet inspections, and deterministic network simulations.
            </p>

            {/* Subtle Interactive Reactive Diagram in Charcoal & Sand */}
            <div className="p-6 rounded-2xl bg-[#181816] border border-[#D8CBB3]/15 not-prose mt-8 shadow-metal-plate">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8997C] mb-4 pb-2 border-b border-[#D8CBB3]/10">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#2F6BFF]" />
                  <span className="text-[#D8CBB3]">Interactive Routing Axiom</span>
                </span>
                <span className="text-[11px] text-[#2F6BFF] font-bold">Bellman-Ford Dynamic</span>
              </div>
              <div className="flex items-center justify-between text-center font-mono text-xs py-4">
                <div className="p-3.5 rounded-xl bg-[#262624] border border-[#D8CBB3]/20 shadow-metal-plate">
                  <div className="text-[#A8997C] text-[10px]">LOCAL ROUTER</div>
                  <div className="text-[#F5EFE6] font-bold text-sm mt-1">Node X</div>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#2F6BFF] via-[#D8CBB3] to-[#2F6BFF] relative">
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2F6BFF] shadow-glow-electric animate-pulse" />
                  </div>
                  <span className="text-[10px] text-[#A8997C] mt-2">Vector Exchange: UDP 520</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#262624] border border-[#D8CBB3]/20 shadow-metal-plate">
                  <div className="text-[#A8997C] text-[10px]">NEIGHBOR ROUTER</div>
                  <div className="text-[#F5EFE6] font-bold text-sm mt-1">Node V</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 03 — FEATURED ARTICLE (Magazine Cover Aesthetic) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-[#D8CBB3]/10 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#D8CBB3]/15">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">Primary Monograph</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F5EFE6] mt-1">Featured Publication</h2>
          </div>
          <LiquidButton
            variant="pill"
            onClick={() => handleNavigate('/articles')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Browse Complete Index
          </LiquidButton>
        </div>

        {/* Magazine Cover Composition */}
        <div 
          onClick={() => handleNavigate('/articles/rip-routing-protocol')}
          className="group cursor-pointer rounded-3xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF]/70 bg-gradient-to-b from-[#262624] to-[#181816] p-8 sm:p-12 transition-all duration-300 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2F6BFF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#2F6BFF]/15 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-[#A8997C]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F6BFF]/20 border border-[#2F6BFF]/40 text-[#2F6BFF] font-bold">
                  ISSUE 001
                </span>
                <span>•</span>
                <span className="text-[#D8CBB3]">ROUTING PROTOCOLS</span>
                <span>•</span>
                <span className="text-[#F5EFE6] font-semibold">24 MIN READ</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-serif text-[#F5EFE6] group-hover:text-white transition-colors leading-[1.1]">
                RIP: The Routing Information Protocol
              </h3>

              <p className="text-base sm:text-lg text-[#D8CBB3] font-serif italic max-w-2xl leading-relaxed">
                Understanding how routers exchange information, calculate distances via Bellman-Ford, and make decisions across interconnected networks.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <LiquidButton
                  variant="primary"
                  onClick={() => handleNavigate('/articles/rip-routing-protocol')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Inspect Monograph (15 Chapters & Sandboxes)
                </LiquidButton>
              </div>
            </div>

            {/* Visual Abstract Emblem in Charcoal, Sand & Electric Blue */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-[#1E1E1C] border border-[#D8CBB3]/25 p-6 flex flex-col justify-between group-hover:border-[#2F6BFF] transition-colors shadow-metal-plate">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#A8997C]">
                  <span>RFC 2453 / STD 56</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] shadow-glow-electric animate-pulse" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-[#F5EFE6]">15 HOPS</div>
                  <div className="text-[10px] font-mono text-[#2F6BFF] font-bold mt-1">16 = INFINITY</div>
                </div>
                <div className="text-[10px] font-mono text-[#A8997C] text-center border-t border-[#D8CBB3]/15 pt-2">
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
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-[#D8CBB3]/10 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">Curriculum Taxonomy</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F5EFE6] mt-1">
            Explore Networking Subjects
          </h2>
          <p className="mt-2 text-[#A8997C] text-sm font-sans max-w-xl">
            Explore the core pillars of autonomous networking. Active monographs are available immediately; future editions are currently in peer review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Active: Routing */}
          <div 
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            className="p-6 rounded-2xl border border-[#2F6BFF]/40 bg-[#262624] hover:border-[#2F6BFF] transition-all cursor-pointer group shadow-metal-plate"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-4">
              <span className="text-[#2F6BFF] font-bold">● Published (Article 001)</span>
              <Compass className="w-4 h-4 text-[#D8CBB3] group-hover:text-[#2F6BFF] transition-colors" />
            </div>
            <h3 className="text-xl font-serif text-[#F5EFE6] group-hover:text-white transition-colors">
              Routing Protocols
            </h3>
            <p className="text-xs text-[#A8997C] mt-2 leading-relaxed font-sans">
              Interior & Exterior Gateway Protocols (RIP, OSPF, EIGRP, BGP), metric models, and loop mitigation.
            </p>
          </div>

          {/* Planned: Network Architecture */}
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/10 bg-[#181816]/70 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#8C816E]">
              <span>Planned Series</span>
              <Network className="w-4 h-4 text-[#8C816E]" />
            </div>
            <h3 className="text-xl font-serif text-[#D8CBB3]">
              Network Architecture
            </h3>
            <p className="text-xs text-[#8C816E] mt-2 leading-relaxed font-sans">
              Spine-leaf fabrics, autonomous systems, VLAN segmentation, and enterprise backbones.
            </p>
          </div>

          {/* Planned: Protocols */}
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/10 bg-[#181816]/70 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#8C816E]">
              <span>Planned Series</span>
              <Activity className="w-4 h-4 text-[#8C816E]" />
            </div>
            <h3 className="text-xl font-serif text-[#D8CBB3]">
              Transport & Wire Protocols
            </h3>
            <p className="text-xs text-[#8C816E] mt-2 leading-relaxed font-sans">
              TCP congestion physics, UDP datagrams, QUIC, and lower-layer frame encapsulations.
            </p>
          </div>

          {/* Planned: Security */}
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/10 bg-[#181816]/70 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#8C816E]">
              <span>Planned Series</span>
              <ShieldCheck className="w-4 h-4 text-[#8C816E]" />
            </div>
            <h3 className="text-xl font-serif text-[#D8CBB3]">
              Network Security
            </h3>
            <p className="text-xs text-[#8C816E] mt-2 leading-relaxed font-sans">
              Route spoofing, MD5 authentication, IPsec tunnel mechanics, and border ACL filtering.
            </p>
          </div>

          {/* Planned: Data Transmission */}
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/10 bg-[#181816]/70 opacity-75">
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#8C816E]">
              <span>Planned Series</span>
              <Terminal className="w-4 h-4 text-[#8C816E]" />
            </div>
            <h3 className="text-xl font-serif text-[#D8CBB3]">
              Data Transmission
            </h3>
            <p className="text-xs text-[#8C816E] mt-2 leading-relaxed font-sans">
              Physical layer propagation delay, optical transmission channels, and queuing disciplines.
            </p>
          </div>

          {/* Interactive Lab Link */}
          <div 
            onClick={() => handleNavigate('/lab')}
            className="p-6 rounded-2xl border border-[#D8CBB3]/30 bg-[#262624] hover:border-[#2F6BFF] transition-all cursor-pointer group flex flex-col justify-between shadow-metal-plate"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="text-[#2F6BFF] font-bold">5 Active Simulations</span>
                <FlaskConical className="w-4 h-4 text-[#2F6BFF]" />
              </div>
              <h3 className="text-xl font-serif text-[#F5EFE6] group-hover:text-white transition-colors">
                Interactive Lab
              </h3>
              <p className="text-xs text-[#A8997C] mt-2 leading-relaxed font-sans">
                Experience dynamic Bellman-Ford calculations and fault injection in real-time.
              </p>
            </div>
            <div className="mt-4 text-xs font-mono text-[#2F6BFF] font-bold flex items-center gap-1">
              <span>Enter Laboratory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 05 — INTERACTIVE PREVIEW ("SEE HOW THE NETWORK THINKS") */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 border-b border-[#D8CBB3]/10 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-[#D8CBB3]/25 bg-[#262624] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] font-bold">
                Signature Educational Instrument
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#F5EFE6] leading-tight">
                SEE HOW THE NETWORK THINKS.
              </h2>
              <p className="text-base sm:text-lg text-[#D8CBB3] font-serif italic leading-relaxed">
                Explore how routing information moves between routers and how a network learns where to send data.
              </p>
              <p className="text-xs sm:text-sm text-[#A8997C] font-sans leading-relaxed">
                Our custom digital simulator models link failure injection, count-to-infinity route metric inflation, Split Horizon, and Layer-3 IP packet routing.
              </p>
              <div className="pt-4 flex items-center gap-4">
                <LiquidButton
                  variant="primary"
                  size="lg"
                  onClick={() => handleNavigate('/lab')}
                  icon={<FlaskConical className="w-4 h-4 text-[#2F6BFF]" />}
                >
                  ENTER THE LAB
                </LiquidButton>
              </div>
            </div>

            {/* Mini Animated Topology Preview Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs p-6 rounded-2xl bg-[#1E1E1C] border border-[#D8CBB3]/20 text-center font-mono text-xs space-y-4 shadow-metal-plate">
                <div className="text-[10px] uppercase tracking-wider text-[#A8997C]">Live Simulation Sandbox</div>
                <div className="flex items-center justify-between px-2">
                  <div className="p-2.5 rounded-lg bg-[#262624] border border-[#2F6BFF]/40 text-[#2F6BFF] font-bold">R1</div>
                  <div className="flex-1 h-0.5 bg-[#2F6BFF] mx-2 relative">
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D8CBB3] shadow-glow-sand animate-ping" />
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#262624] border border-[#2F6BFF]/40 text-[#2F6BFF] font-bold">R2</div>
                  <div className="flex-1 h-0.5 bg-[#2F6BFF] mx-2" />
                  <div className="p-2.5 rounded-lg bg-[#262624] border border-[#2F6BFF]/40 text-[#2F6BFF] font-bold">R3</div>
                </div>
                <div className="p-2 rounded bg-[#181816] border border-[#D8CBB3]/15 text-[11px] text-[#2F6BFF] font-bold">
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
        <span className="text-xs font-mono uppercase tracking-widest text-[#2F6BFF] mb-3 block font-bold">
          Editorial Conclusion
        </span>
        <h2 className="text-4xl sm:text-6xl font-serif text-[#F5EFE6] tracking-tight leading-tight">
          EVERY CONNECTION HAS A STORY.
        </h2>
        <p className="mt-6 text-base sm:text-xl text-[#D8CBB3] font-serif italic max-w-xl mx-auto">
          Delve into our definitive technical monographs and explore how human ingenuity transformed copper wires and light into a planetary nervous system.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <LiquidButton
            variant="primary"
            size="md"
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            icon={<BookOpen className="w-4 h-4" />}
          >
            Read RIP Monograph
          </LiquidButton>
          <LiquidButton
            variant="secondary"
            size="md"
            onClick={() => handleNavigate('/about')}
            icon={<Compass className="w-4 h-4" />}
          >
            Colophon & References
          </LiquidButton>
        </div>
      </section>

    </div>
  );
};
