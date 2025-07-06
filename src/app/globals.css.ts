import { globalStyle } from '@vanilla-extract/css';

// Reset and base styles
globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
});

globalStyle('html, body', {
  maxWidth: '100vw',
  overflowX: 'hidden',
});

globalStyle('body', {
  color: '#171717',
  background: '#ffffff',
  fontFamily: 'Arial, Helvetica, sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#ededed',
      background: '#0a0a0a',
    },
  },
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('html', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      colorScheme: 'dark',
    },
  },
});
