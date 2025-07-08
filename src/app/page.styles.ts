import * as stylex from '@stylexjs/stylex';

import { colors, spacing, typography } from '../tokens/index.stylex';

export const styles = stylex.create({
  page: {
    alignItems: 'center',
    backgroundColor: colors.background,
    color: colors.text,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  },

  hero: {
    padding: spacing.xl,
    textAlign: 'center',
  },

  heroContent: {
    marginBlock: '0',
    marginInline: 'auto',
    maxWidth: '600px',
  },

  heroTitle: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: `linear-gradient(135deg, ${colors.text}, ${colors.primary})`,
    backgroundClip: 'text',
    fontSize: {
      default: '48px',
      '@media (max-width: 767px)': '32px',
    },
    fontWeight: 700,
    marginBottom: spacing.lg,
  },

  heroSubtitle: {
    color: colors.textMuted,
    fontSize: {
      default: typography.fontSizeLg,
      '@media (max-width: 767px)': typography.fontSize,
    },
    marginBottom: spacing.xl,
  },

  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
});
