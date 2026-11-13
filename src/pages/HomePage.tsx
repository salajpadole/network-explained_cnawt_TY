import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from '../router';
import { sound } from '../audio/soundEngine';
import { ThreeHeroNetwork } from '../effects/ThreeHeroNetwork';
import { LiquidMetalButton } from '../effects/liquid-metal-button/LiquidMetalButton';
import '../effects/liquid-metal-button/styles.css';
import { LiquidMetalAction, LiquidButton } from '../components/buttons/LiquidMetalAction';
import { 
  ArrowRight, Compass, Network, BookOpen, 
  Cpu, ShieldCheck, Activity, Terminal, ExternalLink, Sparkles, Play
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingAS65001CardProps {
  children: React.ReactNode;
}

const FloatingAS65001Card: React.FC<FloatingAS65001CardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - cardCenterX;
      const dy = e.clientY - cardCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxProximity = 700;

      if (dist < maxProximity) {
        const proximity = Math.pow(1 - dist / maxProximity, 1.4);
        // Magnetic pull toward cursor (moves toward mouse)
        targetX = (dx / maxProximity) * 38 * proximity;
        targetY = (dy / maxProximity) * 38 * proximity;

        // 3D tilt facing cursor
        targetRotY = (dx / maxProximity) * 12 * proximity;
        targetRotX = -(dy / maxProximity) * 12 * proximity;

        // Light sheen coordinates
        const sheenX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const sheenY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setSheenPos({ x: sheenX, y: sheenY });
      } else {
        targetX = 0;
        targetY = 0;
        targetRotX = 0;
        targetRotY = 0;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      time += 0.024;
      // Ambient floating levitation
      const ambientFloatY = Math.sin(time) * 10;
      const ambientFloatX = Math.cos(time * 0.7) * 4;
      const ambientRotZ = Math.sin(time * 0.5) * 1.2;

      // Smooth inertia interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      const totalX = currentX + ambientFloatX;
      const totalY = currentY + ambientFloatY;

      if (el) {
        el.style.transform = `perspective(1000px) translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) rotateZ(${ambientRotZ.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="hero-reveal rounded-3xl glass-panel-elevated p-6 sm:p-7 relative overflow-hidden border border-[#D8CBB3]/20 shadow-2xl transition-shadow duration-300 will-change-transform"
      style={{
        boxShadow: `0 28px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px -5px rgba(47, 107, 255, 0.35)`,
      }}
    >
      {/* Dynamic Specular Sheen Gliding with Cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 320px at ${sheenPos.x}% ${sheenPos.y}%, rgba(47, 107, 255, 0.22), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

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
    <div className="relative text-[#D8CBB3] bg-transparent overflow-x-clip selection:bg-[#2F6BFF]/30 selection:text-white">
      
      {/* ========================================================================= */}
      {/* SCENE 01 — OPENING CINEMATIC HERO EXPERIENCE (85-100vh) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-28 pb-16 border-b border-[#D8CBB3]/10 overflow-hidden">
        
        {/* Subtle Local Hero Sparkles */}
        <div className="absolute inset-0 pointer-events-none z-0" />

        <div ref={heroTextRef} className="relative z-10 max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Metadata badge matching Relay's 'open beta / 240 apps connected' */}
              <div className="hero-reveal flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#2F6BFF]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121316]/90 border border-[#2F6BFF]/40 text-[#FAF7F2] font-bold shadow-glow-electric">
                  <span className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-pulse" />
                  <span>STD 56 / 240 AS CONNECTED</span>
                </div>
                <span className="text-[#A8997C]">•</span>
                <span className="text-[#D8CBB3] text-[11px]">TECHNICAL MONOGRAPH</span>
              </div>

              {/* Main Headline */}
              <h1 className="hero-reveal text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#F5EFE6] tracking-tight leading-[1.04]">
                The handoffs run themselves.
              </h1>

              {/* Editorial Subtitle */}
              <p className="hero-reveal text-base sm:text-xl text-[#D8CBB3] font-serif italic max-w-xl leading-relaxed">
                Network Explained deconstructs how autonomous Bellman-Ford calculations and dynamic route poison reverse connect our digital world.
              </p>

              {/* Action Buttons: Primary Liquid Metal Pill + Secondary Liquid Glass Action */}
              <div className="hero-reveal pt-4 flex flex-wrap items-center gap-4">
                <LiquidMetalAction
                  text="Read Monograph"
                  onClick={() => handleNavigate('/articles/rip-routing-protocol')}
                />

                <LiquidButton
                  variant="secondary"
                  size="md"
                  onClick={() => handleNavigate('/articles')}
                  icon={<BookOpen className="w-4 h-4 text-[#2F6BFF]" />}
                >
                  Browse Catalog
                </LiquidButton>
              </div>

              {/* Verification Subtext matching Relay */}
              <div className="hero-reveal text-xs font-mono text-[#A8997C] flex items-center gap-3 pt-2">
                <span>RFC 2453 Track</span>
                <span>•</span>
                <span>15-Hop Metric Limit</span>
                <span>•</span>
                <span>Bellman-Ford Analysis</span>
              </div>

            </div>

            {/* Right Column: Signature Relay-Style Floating Liquid Glass Router Node Graph */}
            <div className="lg:col-span-5">
              <FloatingAS65001Card>
                {/* Ambient Internal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2F6BFF]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Card Titlebar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D8CBB3]/15 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FAF7F2] font-bold">AS-65001 RIP Routing</span>
                    <span className="text-[#D8CBB3]/40">|</span>
                    <span className="text-[#D8CBB3]/60 text-[11px]">3 hops / 1 metric</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-ping" />
                    <span className="text-[#2F6BFF] font-bold text-[10px] uppercase">running</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#101114] border border-[#2F6BFF]/30 text-[10px] text-[#FAF7F2] font-bold">100%</span>
                  </div>
                </div>

                {/* Flow Graph Nodes */}
                <div className="py-6 space-y-4">
                  {/* Step 1 Node */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121316]/90 border border-[#D8CBB3]/20 hover:border-[#2F6BFF]/50 transition-colors">
                    <div>
                      <div className="text-[10px] font-mono text-[#2F6BFF] uppercase font-bold">Origin Node R1</div>
                      <div className="text-xs font-mono text-[#FAF7F2] font-bold mt-0.5">192.168.1.0/24 subnet</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#A8997C] bg-[#1E1F24] px-2 py-1 rounded">metric: 0</span>
                  </div>

                  {/* Connecting Vector Link */}
                  <div className="flex items-center justify-center -my-1 text-[10px] font-mono text-[#2F6BFF]">
                    <span className="w-0.5 h-3 bg-[#2F6BFF]/40 mr-2" />
                    <span>UDP 520 Bellman-Ford Vector Broadcast</span>
                    <span className="w-0.5 h-3 bg-[#2F6BFF]/40 ml-2" />
                  </div>

                  {/* Step 2 Node */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121316]/90 border border-[#2F6BFF]/40 shadow-glow-electric">
                    <div>
                      <div className="text-[10px] font-mono text-[#2F6BFF] uppercase font-bold">Relay Node R2 (Edge Gateway)</div>
                      <div className="text-xs font-mono text-[#FAF7F2] font-bold mt-0.5">Next-Hop: 10.0.0.1</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#2F6BFF] bg-[#2F6BFF]/20 px-2 py-1 rounded font-bold border border-[#2F6BFF]/40">metric: 1 hop</span>
                  </div>

                  {/* Step 3 Node */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121316]/90 border border-[#D8CBB3]/15">
                    <div>
                      <div className="text-[10px] font-mono text-[#A8997C] uppercase">Destination Core R3</div>
                      <div className="text-xs font-mono text-[#D8CBB3] mt-0.5">172.16.0.0/16 Backbone</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#A8997C] bg-[#1E1F24] px-2 py-1 rounded">converged</span>
                  </div>
                </div>

                {/* Execution Log Footer matching Relay */}
                <div className="pt-4 border-t border-[#D8CBB3]/15 font-mono text-[10px] space-y-2">
                  <div className="text-[9px] uppercase tracking-wider text-[#A8997C] font-bold">Live Protocol Telemetry</div>
                  <div className="flex items-center justify-between text-[#D8CBB3]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF]" />
                      <span className="text-[#A8997C]">09:41:02</span>
                      <span className="text-[#FAF7F2]">Periodic Vector Broadcast (UDP 520)</span>
                    </div>
                    <span className="text-[#A8997C]">129 ms</span>
                  </div>
                  <div className="flex items-center justify-between text-[#D8CBB3]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF]" />
                      <span className="text-[#A8997C]">09:38:57</span>
                      <span className="text-[#FAF7F2]">Bellman-Ford Relaxation (R1 → R2)</span>
                    </div>
                    <span className="text-[#A8997C]">2.1 ms</span>
                  </div>
                  <div className="flex items-center justify-between text-[#D8CBB3]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8CBB3]" />
                      <span className="text-[#A8997C]">09:31:14</span>
                      <span className="text-[#FAF7F2]">Split Horizon Poison Reverse Active</span>
                    </div>
                    <span className="text-[#A8997C]">410 ms</span>
                  </div>
                </div>
              </FloatingAS65001Card>
            </div>

          </div>

          {/* Subtle scroll cue */}
          <div className="hero-reveal mt-16 flex items-center justify-between text-xs font-mono text-[#A8997C] uppercase tracking-widest pt-6 border-t border-[#D8CBB3]/10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D8CBB3]/30" />
              <span>Scroll to Discover Technical Publication</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[#2F6BFF]">
              <span>Lenis Smooth Stream</span>
              <span>↓</span>
            </div>
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

            {/* Subtle Editorial Routing Diagram in Charcoal & Sand */}
            <div className="p-6 rounded-2xl bg-[#181816] border border-[#D8CBB3]/15 not-prose mt-8 shadow-metal-plate">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8997C] mb-4 pb-2 border-b border-[#D8CBB3]/10">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#2F6BFF]" />
                  <span className="text-[#D8CBB3]">Routing Axiom Architecture</span>
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
          <LiquidMetalAction
            text="Inspect Monograph"
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            width={180}
            height={50}
          />
        </div>

        {/* Magazine Cover Composition */}
        <div 
          onClick={() => handleNavigate('/articles/rip-routing-protocol')}
          className="group cursor-pointer rounded-3xl border border-[#D8CBB3]/20 hover:border-[#2F6BFF]/70 glass-panel-elevated p-8 sm:p-12 transition-all duration-300 relative overflow-hidden shadow-2xl"
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
                <LiquidMetalAction
                  text="Inspect Monograph"
                  onClick={() => handleNavigate('/articles/rip-routing-protocol')}
                />
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
            Explore the core pillars of autonomous networking. Active monographs are available immediately; future editions are in development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Active: Routing */}
          <div 
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            className="p-6 rounded-2xl border border-[#2F6BFF]/40 glass-panel-elevated hover:border-[#2F6BFF] transition-all cursor-pointer group shadow-liquid-glass"
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
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/15 glass-panel opacity-80">
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
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/15 glass-panel opacity-80">
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
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/15 glass-panel opacity-80">
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
          <div className="p-6 rounded-2xl border border-[#D8CBB3]/15 glass-panel opacity-80">
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

          {/* Technical Standards & RFC Archive */}
          <div 
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
            className="p-6 rounded-2xl border border-[#D8CBB3]/25 glass-panel hover:border-[#2F6BFF] transition-all cursor-pointer group flex flex-col justify-between shadow-liquid-glass"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="text-[#2F6BFF] font-bold">RFC Standards Archive</span>
                <BookOpen className="w-4 h-4 text-[#2F6BFF]" />
              </div>
              <h3 className="text-xl font-serif text-[#F5EFE6] group-hover:text-white transition-colors">
                IETF Standards & Specifications
              </h3>
              <p className="text-xs text-[#A8997C] mt-2 leading-relaxed font-sans">
                STD 56, RFC 2453, RFC 1058, and RIPng protocol mechanics analyzed with mathematical rigor.
              </p>
            </div>
            <div className="mt-4 text-xs font-mono text-[#2F6BFF] font-bold flex items-center gap-1">
              <span>Read Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* SCENE 05 — CLOSING SECTION & TRANSITION INTO FOOTER */}
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
          <LiquidMetalAction
            text="Read Monograph"
            onClick={() => handleNavigate('/articles/rip-routing-protocol')}
          />
          <LiquidButton
            variant="secondary"
            size="md"
            onClick={() => handleNavigate('/about')}
            icon={<Compass className="w-4 h-4 text-[#2F6BFF]" />}
          >
            Colophon & References
          </LiquidButton>
        </div>
      </section>

    </div>
  );
};
