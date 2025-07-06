import * as stylex from '@stylexjs/stylex';
import { colors, spacing, typography } from '../tokens/index.stylex';

export const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    color: colors.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    padding: spacing.xl,
    textAlign: 'center',
  },

  heroContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },

  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: spacing.lg,
    background: `linear-gradient(135deg, ${colors.text}, ${colors.primary})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '@media (max-width: 767px)': {
      fontSize: '32px',
    },
  },

  heroSubtitle: {
    fontSize: typography.fontSizeLg,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    '@media (max-width: 767px)': {
      fontSize: typography.fontSize,
    },
  },

  heroActions: {
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
});
