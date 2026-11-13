import React from 'react';
import { LiquidMetalButton } from '../../shaders/liquid-metal-button/LiquidMetalButton';
import '../../shaders/threeui.css';
import '@designcodeio/threeui/style.css';
import { sound } from '../../audio/soundEngine';

export { LiquidMetalButton };

export interface LiquidMetalActionProps {
  variant?: "pill" | "circle" | "play";
  text?: string;
  diameter?: number;
  strokeWidth?: number;
  rendering?: "colored" | "monotone";
  onClick?: () => void;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const LiquidMetalAction: React.FC<LiquidMetalActionProps> = ({
  variant = "pill",
  text = "Sign up",
  diameter = 88,
  strokeWidth = 3.0,
  rendering = "colored",
  onClick,
  className = "",
  width,
  height = 56
}) => {
  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  const cleanText = (text || "Sign up").slice(0, 24);
  const autoWidth = width || Math.max(175, Math.min(320, cleanText.length * 12 + 96));

  return (
    <div 
      className={`shader-frame cursor-pointer relative ${className}`}
      style={{ width: autoWidth, height }}
      onClick={handleClick}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] tracking-wide z-0">
        {cleanText}
      </span>
      <div className="relative z-10 w-full h-full">
        <LiquidMetalButton
          variant={variant}
          rendering={rendering}
          diameter={diameter}
          strokeWidth={strokeWidth}
          text={cleanText}
          embedded={true}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'pill';
  text?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  icon,
  isActive = false,
  size = 'md',
  variant = 'primary',
  className = '',
  onClick,
  text,
  ...props
}) => {
  const rawText = text || (typeof children === 'string' ? children : 'Sign up');
  const cleanLabel = rawText.slice(0, 24).trim();

  // If primary or secondary, render the authentic ThreeUI <LiquidMetalButton variant="pill" /> inside .shader-frame!
  if (variant === 'primary' || variant === 'secondary') {
    const heightMap = {
      sm: 56,
      md: 58,
      lg: 64
    };
    const buttonHeight = heightMap[size];
    const buttonWidth = Math.max(175, Math.min(320, cleanLabel.length * 12 + 96));

    return (
      <div 
        className={`shader-frame cursor-pointer inline-flex items-center justify-center relative ${className}`}
        style={{ width: buttonWidth, height: buttonHeight }}
        onClick={(e) => {
          sound.playClick();
          if (onClick) onClick(e as any);
        }}
      >
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] tracking-wide z-0">
          {cleanLabel}
        </span>
        <div className="relative z-10 w-full h-full">
          <LiquidMetalButton
            variant="pill"
            embedded={true}
            text={cleanLabel}
            onClick={() => {
              sound.playClick();
              if (onClick) onClick({} as any);
            }}
          />
        </div>
      </div>
    );
  }

  // Lightweight pill selector for filters and tabs
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`liquid-metal-pill ${isActive ? 'liquid-metal-pill-active' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
