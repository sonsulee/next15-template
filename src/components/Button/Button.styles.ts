import * as stylex from '@stylexjs/stylex';

import { colors, spacing, typography, layout } from '../../tokens/index.stylex';

export const buttonStyles = stylex.create({
  base: {
    alignItems: 'center',
    appearance: 'none',
    borderStyle: 'none',
    borderWidth: 0,
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
    },
    display: 'inline-flex',
    fontWeight: 500,
    justifyContent: 'center',
    opacity: {
      default: 1,
      ':disabled': 0.5,
    },
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.primary}`,
    },
    outlineOffset: {
      default: '0px',
      ':focus-visible': '2px',
    },
    position: 'relative',
    textDecoration: 'none',
    transition: 'all 200ms ease-out',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },

  // Size variants
  sizeSm: {
    borderRadius: spacing.sm,
    fontSize: typography.fontSizeSm,
    height: '36px',
    padding: `0 ${spacing.md}`,
  },

  sizeMd: {
    borderRadius: layout.borderRadius,
    fontSize: {
      default: typography.fontSize,
      '@media (max-width: 767px)': typography.fontSizeSm,
    },
    height: {
      default: '44px',
      '@media (max-width: 767px)': '40px',
    },
    padding: {
      default: `0 ${spacing.lg}`,
      '@media (max-width: 767px)': `0 ${spacing.md}`,
    },
  },

  sizeLg: {
    borderRadius: spacing.md,
    fontSize: typography.fontSizeLg,
    height: '52px',
    padding: `0 ${spacing.xl}`,
  },

  // Color variants
  primary: {
    backgroundColor: {
      default: colors.primary,
      ':hover:not(:disabled)': '#0051d5',
      ':active:not(:disabled)': colors.primary,
    },
    boxShadow: {
      default: 'none',
      ':hover:not(:disabled)': '0 4px 12px rgba(0, 112, 243, 0.4)',
      ':active:not(:disabled)': '0 2px 4px rgba(0, 112, 243, 0.2)',
    },
    color: colors.background,
    transform: {
      default: 'translateY(0)',
      ':hover:not(:disabled)': 'translateY(-1px)',
      ':active:not(:disabled)': 'translateY(0)',
    },
  },

  secondary: {
    backgroundColor: {
      default: '#f3f4f6',
      ':hover:not(:disabled)': '#e5e7eb',
      ':active:not(:disabled)': '#d1d5db',
    },
    borderColor: {
      default: colors.border,
      ':hover:not(:disabled)': '#d1d5db',
    },
    borderStyle: 'solid',
    borderWidth: layout.borderWidth,
    boxShadow: {
      default: 'none',
      ':hover:not(:disabled)': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    color: colors.text,
    transform: {
      default: 'translateY(0)',
      ':hover:not(:disabled)': 'translateY(-1px)',
      ':active:not(:disabled)': 'translateY(0)',
    },
  },

  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': '#f3f4f6',
      ':active:not(:disabled)': '#e5e7eb',
    },
    color: colors.text,
    transform: {
      default: 'translateY(0)',
      ':hover:not(:disabled)': 'translateY(-1px)',
      ':active:not(:disabled)': 'translateY(0)',
    },
  },

  danger: {
    backgroundColor: {
      default: '#ef4444',
      ':hover:not(:disabled)': '#dc2626',
      ':active:not(:disabled)': '#ef4444',
    },
    boxShadow: {
      default: 'none',
      ':hover:not(:disabled)': '0 4px 12px rgba(239, 68, 68, 0.4)',
      ':active:not(:disabled)': '0 2px 4px rgba(239, 68, 68, 0.2)',
    },
    color: colors.background,
    transform: {
      default: 'translateY(0)',
      ':hover:not(:disabled)': 'translateY(-1px)',
      ':active:not(:disabled)': 'translateY(0)',
    },
  },

  fullWidth: {
    width: '100%',
  },
});
