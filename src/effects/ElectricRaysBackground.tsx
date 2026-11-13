import React, { useEffect, useRef } from 'react';

interface RaySpline {
  // Base parametric offsets
  startYOffset: number;
  cp1XRatio: number;
  cp1YRatio: number;
  cp2XRatio: number;
  cp2YRatio: number;
  endYOffset: number;
  width: number;
  color: string;
  glowColor: string;
  alpha: number;
  phase: number;
  speed: number;
}

interface Particle {
  splineIdx: number;
  t: number;
  speed: number;
  size: number;
  alpha: number;
  pulsePhase: number;
}

export const ElectricRaysBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Scroll tracking for Lenis integration
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive mouse tracking with fluid elasticity
    let mouseX = width * 0.45;
    let mouseY = height * 0.65;
    let targetMouseX = width * 0.45;
    let targetMouseY = height * 0.65;
    let mouseVelocity = 0;
    let lastMouseX = targetMouseX;
    let lastMouseY = targetMouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      const vx = targetMouseX - lastMouseX;
      const vy = targetMouseY - lastMouseY;
      mouseVelocity = Math.min(Math.sqrt(vx * vx + vy * vy), 40);
      lastMouseX = targetMouseX;
      lastMouseY = targetMouseY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Pre-generate ray splines in the Electric Blue palette (#2F6BFF, #60A5FA, #38BDF8, #93C5FD, with Sand #D8CBB3 accents)
    const rayColors = [
      { core: '#FFFFFF', glow: '#2F6BFF', alpha: 0.85 },
      { core: '#93C5FD', glow: '#2F6BFF', alpha: 0.75 },
      { core: '#60A5FA', glow: '#1D4ED8', alpha: 0.70 },
      { core: '#38BDF8', glow: '#2F6BFF', alpha: 0.65 },
      { core: '#D8CBB3', glow: '#2F6BFF', alpha: 0.60 }, // subtle warm sand highlight
      { core: '#2F6BFF', glow: '#1E40AF', alpha: 0.55 },
      { core: '#00F0FF', glow: '#2F6BFF', alpha: 0.80 },
    ];

    const rayCount = 38;
    const rays: RaySpline[] = [];

    for (let i = 0; i < rayCount; i++) {
      const col = rayColors[i % rayColors.length];
      rays.push({
        startYOffset: (Math.random() - 0.5) * 80,
        cp1XRatio: 0.25 + (Math.random() - 0.5) * 0.15,
        cp1YRatio: 0.65 + (Math.random() - 0.5) * 0.2,
        cp2XRatio: 0.65 + (Math.random() - 0.5) * 0.18,
        cp2YRatio: 0.35 + (Math.random() - 0.5) * 0.22,
        endYOffset: (Math.random() - 0.5) * 200,
        width: Math.random() < 0.25 ? 2.4 : Math.random() < 0.6 ? 1.6 : 0.9,
        color: col.core,
        glowColor: col.glow,
        alpha: col.alpha * (0.5 + Math.random() * 0.5),
        phase: Math.random() * Math.PI * 2,
        speed: 0.0008 + Math.random() * 0.0012,
      });
    }

    // Floating data particles traveling along the electric rays
    const particleCount = 55;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        splineIdx: Math.floor(Math.random() * rayCount),
        t: Math.random(),
        speed: 0.0012 + Math.random() * 0.0025,
        size: 1.2 + Math.random() * 2.2,
        alpha: 0.4 + Math.random() * 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Helper: evaluate Cubic Bezier Point at parameter t [0, 1]
    const getBezierPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number
    ) => {
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;

      return {
        x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
        y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
      };
    };

    // Helper: De Casteljau subdivision to evaluate rushing wave [0, u]
    const splitBezier = (
      a: { x: number; y: number },
      b: { x: number; y: number },
      c: { x: number; y: number },
      d: { x: number; y: number },
      u: number
    ) => {
      const ab = { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
      const bc = { x: b.x + (c.x - b.x) * u, y: b.y + (c.y - b.y) * u };
      const cd = { x: c.x + (d.x - c.x) * u, y: c.y + (d.y - c.y) * u };
      const abc = { x: ab.x + (bc.x - ab.x) * u, y: ab.y + (bc.y - ab.y) * u };
      const bcd = { x: bc.x + (cd.x - bc.x) * u, y: bc.y + (cd.y - bc.y) * u };
      const abcd = { x: abc.x + (bcd.x - abc.x) * u, y: abc.y + (bcd.y - abc.y) * u };
      return { p0: a, p1: ab, p2: abc, p3: abcd };
    };

    let time = 0;
    const introStartTime = performance.now();
    const introDuration = 1800; // 1.8 seconds surging wave on page load / refresh

    const render = () => {
      const now = performance.now();
      const introElapsed = now - introStartTime;
      const introRaw = Math.min(Math.max(introElapsed / introDuration, 0), 1);
      const introProgress = 1 - Math.pow(1 - introRaw, 3); // cubic ease-out for swift rush

      time += 0.014;
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;
      mouseVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // Deep dark background with subtle vignette
      ctx.fillStyle = '#090A0C';
      ctx.fillRect(0, 0, width, height);

      // 1. Subtle Technical Dot Grid
      const dotSpacing = 32;
      const dotRadius = 0.9;
      ctx.fillStyle = `rgba(216, 203, 179, ${0.06 * Math.min(introRaw * 1.5, 1)})`;
      const startX = 0;
      const startY = 0;
      for (let x = startX; x < width; x += dotSpacing) {
        for (let y = startY; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Dynamic scroll factor: rays sweep and drift with scroll progress
      const scrollFactor = (scrollY * 0.0015);
      const scrollOffsetY = (scrollY * 0.35) % (height * 1.5);

      // 2. Focal Apex / Radiant Convergence Point
      const focalOriginX = width * 0.34 + Math.sin(time * 0.3 + scrollFactor) * 45;
      const focalOriginY = height * 0.72 + Math.cos(time * 0.4 + scrollFactor) * 35 - (scrollY * 0.15) % 300;

      // Draw Radiant Convergence Bloom Glow (expands dynamically during wave rush)
      const bloomScale = 0.25 + 0.75 * introProgress;
      const focalGlow = ctx.createRadialGradient(
        focalOriginX,
        focalOriginY,
        0,
        focalOriginX,
        focalOriginY,
        width * 0.42 * bloomScale
      );
      focalGlow.addColorStop(0, `rgba(47, 107, 255, ${0.45 * introProgress})`);
      focalGlow.addColorStop(0.2, `rgba(0, 240, 255, ${0.22 * introProgress})`);
      focalGlow.addColorStop(0.5, `rgba(30, 60, 180, ${0.10 * introProgress})`);
      focalGlow.addColorStop(1, 'rgba(9, 10, 12, 0)');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = focalGlow;
      ctx.beginPath();
      ctx.arc(focalOriginX, focalOriginY, width * 0.42 * bloomScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Secondary ambient pool top right
      const topGlow = ctx.createRadialGradient(width * 0.85, height * 0.2, 0, width * 0.85, height * 0.2, width * 0.35);
      topGlow.addColorStop(0, `rgba(47, 107, 255, ${0.14 * introProgress})`);
      topGlow.addColorStop(0.5, `rgba(216, 203, 179, ${0.04 * introProgress})`);
      topGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Render the Flowing Spline Rays (with Entrance Wave Rush)
      ctx.save();
      ctx.globalCompositeOperation = 'lighter'; // Electric light blending

      const evaluatedSplines: {
        p0: { x: number; y: number };
        p1: { x: number; y: number };
        p2: { x: number; y: number };
        p3: { x: number; y: number };
      }[] = [];

      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];
        
        // Staggered wave calculation so each ray surges across in sequence
        const rayStagger = (i / rays.length) * 0.35;
        const rayRaw = Math.min(Math.max((introRaw - rayStagger) / 0.65, 0), 1);
        const rayProgress = 1 - Math.pow(1 - rayRaw, 2.5); // Eased 0 to 1

        if (rayProgress <= 0.005) {
          continue; // Hasn't started surging yet
        }

        const wave = Math.sin(time + ray.phase + scrollFactor * 2.5);
        const wave2 = Math.cos(time * 0.8 + ray.phase + scrollFactor * 1.8);

        // Full Spline Control Points
        const p0 = {
          x: -50 + Math.sin(ray.phase) * 60,
          y: height * 0.88 + ray.startYOffset + wave * 30 - scrollOffsetY * 0.3,
        };

        const p1 = {
          x: focalOriginX + (Math.sin(ray.phase * 2) * 90) + wave2 * 35,
          y: focalOriginY + (Math.cos(ray.phase * 2) * 55) + wave * 25,
        };

        const p2 = {
          x: width * ray.cp2XRatio + wave * 65,
          y: height * ray.cp2YRatio + wave2 * 45 + ray.startYOffset * 0.5,
        };

        const p3 = {
          x: width + 80,
          y: height * 0.12 + ray.endYOffset + wave * 50 - scrollOffsetY * 0.2,
        };

        // Reactive mouse physics: strings flex fluidly with cursor proximity
        const midX = (p1.x + p2.x) * 0.5;
        const midY = (p1.y + p2.y) * 0.5;
        const dCursorX = mouseX - midX;
        const dCursorY = mouseY - midY;
        const distCursor = Math.sqrt(dCursorX * dCursorX + dCursorY * dCursorY);
        const maxDist = Math.max(width * 0.4, 420);

        if (distCursor < maxDist) {
          const proximity = (1 - distCursor / maxDist);
          const pushStrength = proximity * proximity * 38;
          const angle = Math.atan2(dCursorY, dCursorX);
          p1.x -= Math.cos(angle) * pushStrength * 0.45;
          p1.y -= Math.sin(angle) * pushStrength * 0.45;
          p2.x -= Math.cos(angle) * pushStrength * 0.7;
          p2.y -= Math.sin(angle) * pushStrength * 0.7;
        }

        evaluatedSplines.push({ p0, p1, p2, p3 });

        // If in entrance phase, slice the curve so it rushes across the screen
        const activeCurve = rayProgress < 1 ? splitBezier(p0, p1, p2, p3, rayProgress) : { p0, p1, p2, p3 };

        // Outer Neon Glow Pass
        ctx.beginPath();
        ctx.moveTo(activeCurve.p0.x, activeCurve.p0.y);
        ctx.bezierCurveTo(activeCurve.p1.x, activeCurve.p1.y, activeCurve.p2.x, activeCurve.p2.y, activeCurve.p3.x, activeCurve.p3.y);
        ctx.strokeStyle = ray.glowColor;
        ctx.lineWidth = ray.width * 4.2;
        ctx.globalAlpha = ray.alpha * 0.32 * Math.min(rayProgress * 2, 1);
        ctx.stroke();

        // Inner Bright Core Pass
        ctx.beginPath();
        ctx.moveTo(activeCurve.p0.x, activeCurve.p0.y);
        ctx.bezierCurveTo(activeCurve.p1.x, activeCurve.p1.y, activeCurve.p2.x, activeCurve.p2.y, activeCurve.p3.x, activeCurve.p3.y);
        ctx.strokeStyle = ray.color;
        ctx.lineWidth = ray.width;
        ctx.globalAlpha = ray.alpha * 0.9 * Math.min(rayProgress * 2, 1);
        ctx.stroke();

        // Rushing leading spark at the wavefront tip
        if (rayProgress < 0.99) {
          const tip = activeCurve.p3;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, ray.width * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.95;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(tip.x, tip.y, ray.width * 5.5, 0, Math.PI * 2);
          ctx.fillStyle = ray.glowColor;
          ctx.globalAlpha = 0.65;
          ctx.fill();
        }
      }

      // 4. Render Data Flow Particles along the Rays (burst in as rays expand)
      if (introRaw > 0.25) {
        const particleIntro = Math.min((introRaw - 0.25) / 0.75, 1);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            p.splineIdx = Math.floor(Math.random() * rays.length);
          }

          const spline = evaluatedSplines[p.splineIdx];
          if (!spline) continue;

          const pos = getBezierPoint(spline.p0, spline.p1, spline.p2, spline.p3, p.t);
          const pulse = 0.5 + 0.5 * Math.sin(time * 3 + p.pulsePhase);
          const alpha = p.alpha * pulse * Math.sin(p.t * Math.PI) * particleIntro;

          // Particle Core
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Particle Glow Halo
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#2F6BFF';
          ctx.globalAlpha = alpha * 0.6;
          ctx.fill();
        }
      }

      ctx.restore();

      // 5. Clean, subtle ambient radiance at the focal convergence (without harsh arc rings)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const coreFlare = ctx.createRadialGradient(
        focalOriginX, focalOriginY, 0,
        focalOriginX, focalOriginY, 95
      );
      coreFlare.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      coreFlare.addColorStop(0.35, 'rgba(47, 107, 255, 0.25)');
      coreFlare.addColorStop(1, 'transparent');
      ctx.fillStyle = coreFlare;
      ctx.beginPath();
      ctx.arc(focalOriginX, focalOriginY, 95, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
};
