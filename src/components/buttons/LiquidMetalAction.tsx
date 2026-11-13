import React from 'react';
import { LiquidMetalButton } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { sound } from '../../audio/soundEngine';

interface LiquidMetalActionProps {
  variant?: "pill" | "circle" | "play";
  text?: string;
  diameter?: number;
  strokeWidth?: number;
  rendering?: "colored" | "monotone";
  onClick?: () => void;
  className?: string;
}

export const LiquidMetalAction: React.FC<LiquidMetalActionProps> = ({
  variant = "pill",
  text = "Launch",
  diameter = 72,
  strokeWidth = 2.5,
  rendering = "colored",
  onClick,
  className = ""
}) => {
  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  return (
    <div className={`shader-frame cursor-pointer ${className}`} onClick={handleClick}>
      <LiquidMetalButton
        variant={variant}
        rendering={rendering}
        diameter={diameter}
        strokeWidth={strokeWidth}
        text={text}
        embedded={true}
        onClick={handleClick}
      />
    </div>
  );
};

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'pill';
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  icon,
  isActive = false,
  size = 'md',
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-xs py-2 px-4 sm:text-sm sm:py-2.5 sm:px-5',
    lg: 'text-sm py-3 px-6 sm:text-base sm:py-3.5 sm:px-7'
  };

  if (variant === 'pill') {
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
  }

  return (
    <button
      onClick={handleClick}
      className={`liquid-metal-btn ${sizeClasses[size]} ${isActive ? 'border-[#2F6BFF] text-white shadow-glow-electric' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 text-[#2F6BFF] group-hover:text-white transition-colors">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
