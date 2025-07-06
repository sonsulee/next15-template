import { style } from '@vanilla-extract/css';

const vars = {
  grayRgb: '0, 0, 0',
  grayAlpha200: 'rgba(0, 0, 0, 0.08)',
  grayAlpha100: 'rgba(0, 0, 0, 0.05)',
  buttonPrimaryHover: '#383838',
  buttonSecondaryHover: '#f2f2f2',
  fontGeistSans: 'var(--font-geist-sans)',
  fontGeistMono: 'var(--font-geist-mono)',
  foreground: 'var(--foreground)',
  background: 'var(--background)',
};

const darkVars = {
  grayRgb: '255, 255, 255',
  grayAlpha200: 'rgba(255, 255, 255, 0.145)',
  grayAlpha100: 'rgba(255, 255, 255, 0.06)',
  buttonPrimaryHover: '#ccc',
  buttonSecondaryHover: '#1a1a1a',
};

export const page = style({
  vars: {
    '--gray-rgb': vars.grayRgb,
    '--gray-alpha-200': vars.grayAlpha200,
    '--gray-alpha-100': vars.grayAlpha100,
    '--button-primary-hover': vars.buttonPrimaryHover,
    '--button-secondary-hover': vars.buttonSecondaryHover,
  },
  display: 'grid',
  gridTemplateRows: '20px 1fr 20px',
  alignItems: 'center',
  justifyItems: 'center',
  minHeight: '100svh',
  padding: '80px',
  gap: '64px',
  fontFamily: vars.fontGeistSans,
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        '--gray-rgb': darkVars.grayRgb,
        '--gray-alpha-200': darkVars.grayAlpha200,
        '--gray-alpha-100': darkVars.grayAlpha100,
        '--button-primary-hover': darkVars.buttonPrimaryHover,
        '--button-secondary-hover': darkVars.buttonSecondaryHover,
      },
    },
    '(max-width: 600px)': {
      padding: '32px',
      paddingBottom: '80px',
    },
  },
});

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  gridRowStart: 2,
  '@media': {
    '(max-width: 600px)': {
      alignItems: 'center',
    },
  },
});

export const mainOl = style({
  fontFamily: vars.fontGeistMono,
  paddingLeft: 0,
  margin: 0,
  fontSize: '14px',
  lineHeight: '24px',
  letterSpacing: '-0.01em',
  listStylePosition: 'inside',
  '@media': {
    '(max-width: 600px)': {
      textAlign: 'center',
    },
  },
});

export const mainLi = style({
  selectors: {
    '&:not(:last-of-type)': {
      marginBottom: '8px',
    },
  },
});

export const mainCode = style({
  fontFamily: 'inherit',
  background: 'var(--gray-alpha-100)',
  padding: '2px 4px',
  borderRadius: '4px',
  fontWeight: 600,
});

export const ctas = style({
  display: 'flex',
  gap: '16px',
  '@media': {
    '(max-width: 600px)': {
      flexDirection: 'column',
    },
  },
});

const ctaBase = style({
  appearance: 'none',
  borderRadius: '128px',
  height: '48px',
  padding: '0 20px',
  border: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 500,
  textDecoration: 'none',
  '@media': {
    '(max-width: 600px)': {
      fontSize: '14px',
      height: '40px',
      padding: '0 16px',
    },
  },
});

export const primaryCta = style([
  ctaBase,
  {
    background: vars.foreground,
    color: vars.background,
    gap: '8px',
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          background: 'var(--button-primary-hover)',
          borderColor: 'transparent',
        },
      },
    },
  },
]);

export const secondaryCta = style([
  ctaBase,
  {
    borderColor: 'var(--gray-alpha-200)',
    minWidth: '158px',
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          background: 'var(--button-secondary-hover)',
          borderColor: 'transparent',
        },
      },
      '(max-width: 600px)': {
        minWidth: 'auto',
      },
    },
  },
]);

export const footer = style({
  gridRowStart: 3,
  display: 'flex',
  gap: '24px',
  '@media': {
    '(max-width: 600px)': {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export const footerLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: 'inherit',
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
      },
    },
  },
});

export const footerImg = style({
  flexShrink: 0,
});

export const logo = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      filter: 'invert()',
    },
  },
});
