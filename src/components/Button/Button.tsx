import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { buttonStyles } from './Button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: buttonStyles.sizeSm,
    md: buttonStyles.sizeMd,
    lg: buttonStyles.sizeLg,
  };

  const variantStyles = {
    primary: buttonStyles.primary,
    secondary: buttonStyles.secondary,
    ghost: buttonStyles.ghost,
    danger: buttonStyles.danger,
  };

  return (
    <button
      {...stylex.props(
        buttonStyles.base,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && buttonStyles.fullWidth,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
