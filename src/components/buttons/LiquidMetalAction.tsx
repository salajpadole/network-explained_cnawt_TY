import React from 'react';
import { LiquidMetalButton, LiquidMetalButtonVariant } from '../../effects/liquid-metal-button/LiquidMetalButton';
import '../../effects/liquid-metal-button/styles.css';
import { sound } from '../../audio/soundEngine';

export { LiquidMetalButton };
export type { LiquidMetalButtonVariant };

export interface LiquidMetalActionProps {
  variant?: LiquidMetalButtonVariant;
  text?: string;
  diameter?: number;
  strokeWidth?: number;
  rendering?: "colored" | "monotone";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  className?: string;
  width?: number | string;
  height?: number | string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Signature Liquid Metal Action Button
 * Features a real-time reactive mercury fluid shader with mouse-following
 * specular caustics, ambient waves, physical press ripples, and precision glass rim.
 */
export const LiquidMetalAction: React.FC<LiquidMetalActionProps> = ({
  variant = "pill",
  text,
  diameter = 56,
  rendering = "colored",
  onClick,
  className = "",
  width,
  height,
  icon,
  children
}) => {
  return (
    <LiquidMetalButton
      variant={variant}
      rendering={rendering}
      diameter={diameter}
      text={text}
      icon={icon}
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    >
      {children}
    </LiquidMetalButton>
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

/**
 * Universal publication button.
 * - 'primary' / 'secondary': Liquid Metal Glass action with fluid caustic physics
 * - 'pill': Precision glass selector pill for filters and interactive tabs
 */
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
  const rawText = text || (typeof children === 'string' ? children : undefined);

  if (variant === 'primary' || variant === 'secondary') {
    const heightMap = {
      sm: 44,
      md: 52,
      lg: 58
    };
    const buttonHeight = heightMap[size];

    return (
      <LiquidMetalButton
        variant="pill"
        rendering={variant === 'secondary' ? 'monotone' : 'colored'}
        text={rawText}
        icon={icon}
        height={buttonHeight}
        onClick={(e) => {
          if (onClick) onClick(e as any);
        }}
        className={className}
      >
        {typeof children !== 'string' ? children : undefined}
      </LiquidMetalButton>
    );
  }

  // Lightweight glass pill selector for filters and tabs
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      sound.playClick();
    } catch {
      // Audio fallback
    }
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
