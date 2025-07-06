import * as stylex from '@stylexjs/stylex';

// 4px 기준 간격 시스템
export const spacing = stylex.defineVars({
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
});

// 기본 색상 시스템
export const colors = stylex.defineVars({
  primary: '#0070f3',
  secondary: '#666',
  text: '#000',
  textMuted: '#666',
  background: '#fff',
  border: '#eaeaea',
});

// 기본 타이포그래피
export const typography = stylex.defineVars({
  fontSize: '16px',
  fontSizeSm: '14px',
  fontSizeLg: '18px',
  fontSizeXl: '24px',
  lineHeight: '1.5',
});

// 기본 레이아웃
export const layout = stylex.defineVars({
  borderRadius: '8px',
  borderWidth: '1px',
  maxWidth: '1200px',
});

// 미디어 쿼리 (일반 상수로 정의)
export const media = {
  mobile: '@media (max-width: 767px)',
  tablet: '@media (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
} as const;
