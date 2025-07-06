import * as stylex from '@stylexjs/stylex';
import { colors, spacing, typography, layout } from '../../tokens/index.stylex';

export const buttonStyles = stylex.create({
  base: {
    appearance: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontWeight: '500',
    userSelect: 'none',
    position: 'relative',
    transition: 'all 200ms ease-out',
    whiteSpace: 'nowrap',
    width: 'fit-content',

    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },

    ':focus-visible': {
      outline: `2px solid ${colors.primary}`,
      outlineOffset: '2px',
    },
  },

  // Size variants
  sizeSm: {
    height: '36px',
    padding: `0 ${spacing.md}`,
    fontSize: typography.fontSizeSm,
    borderRadius: spacing.sm,
  },

  sizeMd: {
    height: '44px',
    padding: `0 ${spacing.lg}`,
    fontSize: typography.fontSize,
    borderRadius: layout.borderRadius,

    '@media (max-width: 767px)': {
      height: '40px',
      padding: `0 ${spacing.md}`,
      fontSize: typography.fontSizeSm,
    },
  },

  sizeLg: {
    height: '52px',
    padding: `0 ${spacing.xl}`,
    fontSize: typography.fontSizeLg,
    borderRadius: spacing.md,
  },

  // Color variants
  primary: {
    backgroundColor: colors.primary,
    color: colors.background,

    ':hover:not(:disabled)': {
      backgroundColor: '#0051d5',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 112, 243, 0.4)',
    },

    ':active:not(:disabled)': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0, 112, 243, 0.2)',
    },
  },

  secondary: {
    backgroundColor: '#f3f4f6',
    color: colors.text,
    borderWidth: layout.borderWidth,
    borderStyle: 'solid',
    borderColor: colors.border,

    ':hover:not(:disabled)': {
      backgroundColor: '#e5e7eb',
      borderColor: '#d1d5db',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },

    ':active:not(:disabled)': {
      transform: 'translateY(0)',
      backgroundColor: '#d1d5db',
    },
  },

  ghost: {
    backgroundColor: 'transparent',
    color: colors.text,

    ':hover:not(:disabled)': {
      backgroundColor: '#f3f4f6',
      transform: 'translateY(-1px)',
    },

    ':active:not(:disabled)': {
      transform: 'translateY(0)',
      backgroundColor: '#e5e7eb',
    },
  },

  danger: {
    backgroundColor: '#ef4444',
    color: colors.background,

    ':hover:not(:disabled)': {
      backgroundColor: '#dc2626',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
    },

    ':active:not(:disabled)': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
    },
  },

  fullWidth: {
    width: '100%',
  },
});
