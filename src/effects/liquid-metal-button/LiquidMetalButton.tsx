import React, { useRef, useEffect, useState, useCallback } from "react";
import { sound } from "../../audio/soundEngine";

export type LiquidMetalButtonVariant = "pill" | "circle" | "play";

export type LiquidMetalButtonProps = {
  variant?: LiquidMetalButtonVariant;
  className?: string;
  rendering?: "colored" | "monotone";
  diameter?: number;
  strokeWidth?: number;
  text?: string;
  embedded?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
};

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const LiquidMetalButton: React.FC<LiquidMetalButtonProps> = ({
  variant = "pill",
  className = "",
  rendering = "colored",
  diameter = 56,
  text,
  onClick,
  icon,
  children,
  style,
  width,
  height,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Mouse coords relative to button [0..1]
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: false });
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const displayText = text ?? (typeof children === "string" ? children : "");

  // Handle Mouse Movement for Liquid Caustic Lighting
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseRef.current.targetX = Math.max(0, Math.min(1, x));
    mouseRef.current.targetY = Math.max(0, Math.min(1, y));
    mouseRef.current.active = true;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    mouseRef.current.active = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseRef.current.targetX = 0.5;
    mouseRef.current.targetY = 0.5;
    mouseRef.current.active = false;
  }, []);

  // Trigger Physical Liquid Ripple on Click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    try {
      sound.playClick();
    } catch {
      // Audio fallback
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const maxR = Math.max(rect.width, rect.height) * 1.4;

      ripplesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: maxR,
        alpha: 0.85,
        speed: maxR / 22,
      });
    }

    if (onClick) onClick(e);
  };

  // Canvas Liquid Metal Renderer Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let isRunning = true;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
    };

    updateCanvasSize();
    const ro = new ResizeObserver(updateCanvasSize);
    ro.observe(container);

    const render = () => {
      if (!isRunning) return;
      time += 0.024;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      if (w <= 0 || h <= 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse interpolation (liquid viscosity inertia)
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.12;
      m.y += (m.targetY - m.y) * 0.12;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Clip to rounded pill / circle
      ctx.beginPath();
      const radius = h / 2;
      ctx.roundRect(0, 0, w, h, radius);
      ctx.clip();

      // 1. Base Deep Liquid Obsidian Bed
      const baseGrad = ctx.createLinearGradient(0, 0, w, h);
      baseGrad.addColorStop(0, "#101217");
      baseGrad.addColorStop(0.5, "#0A0B0E");
      baseGrad.addColorStop(1, "#07080A");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Continuous Fluid Liquid Waves (Flowing mercury currents)
      const waveShift = Math.sin(time) * 0.15;
      const waveGrad = ctx.createLinearGradient(
        0,
        0,
        w * (1 + waveShift),
        h
      );
      if (rendering === "colored") {
        waveGrad.addColorStop(0, "rgba(47, 107, 255, 0.08)");
        waveGrad.addColorStop(0.35, "rgba(0, 240, 255, 0.12)");
        waveGrad.addColorStop(0.7, "rgba(216, 203, 179, 0.09)");
        waveGrad.addColorStop(1, "rgba(47, 107, 255, 0.06)");
      } else {
        waveGrad.addColorStop(0, "rgba(255, 255, 255, 0.06)");
        waveGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.14)");
        waveGrad.addColorStop(1, "rgba(255, 255, 255, 0.04)");
      }
      ctx.fillStyle = waveGrad;
      ctx.fillRect(0, 0, w, h);

      // 3. Dynamic Specular Caustic Spotlight (Follows cursor smoothly)
      const spotX = m.x * w;
      const spotY = m.y * h;
      const spotRadius = Math.max(w, h) * (m.active ? 1.1 : 0.85);

      const spotGrad = ctx.createRadialGradient(
        spotX,
        spotY,
        0,
        spotX,
        spotY,
        spotRadius
      );
      if (rendering === "colored") {
        spotGrad.addColorStop(0, m.active ? "rgba(255, 255, 255, 0.55)" : "rgba(255, 255, 255, 0.35)");
        spotGrad.addColorStop(0.2, m.active ? "rgba(47, 107, 255, 0.45)" : "rgba(47, 107, 255, 0.25)");
        spotGrad.addColorStop(0.55, m.active ? "rgba(0, 240, 255, 0.2)" : "rgba(216, 203, 179, 0.12)");
        spotGrad.addColorStop(1, "rgba(7, 8, 10, 0)");
      } else {
        spotGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
        spotGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.15)");
        spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, w, h);

      // 4. Physical Press Ripples (Radiating liquid metallic shockwaves)
      const activeRipples: Ripple[] = [];
      for (const r of ripplesRef.current) {
        r.radius += r.speed;
        r.alpha *= 0.91;

        if (r.alpha > 0.02 && r.radius < r.maxRadius) {
          activeRipples.push(r);

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.75})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Secondary chromatic ring
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(0, r.radius - 3), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(47, 107, 255, ${r.alpha * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
      ripplesRef.current = activeRipples;

      // 5. Metallic Inner Rim Highlight (Top glint and bottom bevel)
      ctx.beginPath();
      ctx.roundRect(1, 1, w - 2, h - 2, radius - 1);
      const rimGrad = ctx.createLinearGradient(0, 0, 0, h);
      rimGrad.addColorStop(0, m.active ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.35)");
      rimGrad.addColorStop(0.5, "rgba(47, 107, 255, 0.2)");
      rimGrad.addColorStop(1, "rgba(0, 0, 0, 0.6)");
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      ro.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [rendering]);

  const isCircle = variant === "circle" || variant === "play";

  return (
    <button
      ref={containerRef}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`group relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-300 ${
        isCircle
          ? "rounded-full"
          : "rounded-full px-6 py-3.5 sm:px-7 sm:py-4"
      } ${
        isHovered
          ? "shadow-[0_0_28px_rgba(47,107,255,0.45),0_8px_32px_rgba(0,0,0,0.6)]"
          : "shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_12px_rgba(47,107,255,0.2)]"
      } ${
        isPressed ? "scale-[0.97]" : isHovered ? "scale-[1.015]" : "scale-100"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      style={{
        minWidth: isCircle ? diameter : width ? width : 160,
        height: isCircle ? diameter : height ? height : 52,
        ...style,
      }}
    >
      {/* Background Liquid Metal Canvas (Authentic Fluid Shader) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-full z-0"
      />

      {/* Multi-layered Specular Liquid Glass Edge Rim */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-white/20 group-hover:border-[#2F6BFF]/70 transition-colors duration-300 z-10"
        style={{
          boxShadow: isHovered
            ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.8), 0 0 16px rgba(47, 107, 255, 0.35)"
            : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Foreground Content with Editorial Theme Typography */}
      <span className="relative z-20 flex items-center justify-center gap-2.5 font-sans font-semibold text-xs sm:text-sm tracking-wide text-[#FAF7F2] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors duration-200">
        {icon && (
          <span className="shrink-0 text-[#2F6BFF] group-hover:text-white transition-colors duration-200">
            {icon}
          </span>
        )}
        {displayText && <span>{displayText}</span>}
        {!displayText && children}
      </span>
    </button>
  );
};
