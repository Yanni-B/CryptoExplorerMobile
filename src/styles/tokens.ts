export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 60,
} as const;

// Border radius
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 22,
  full: 9999,
} as const;

// Typography - Tailles
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 28,
} as const;

// Typography - Poids
export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: 'bold',
} as const;

// Shadow presets
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
} as const;

export type Spacing = typeof SPACING;
export type Radius = typeof RADIUS;
export type FontSize = typeof FONT_SIZE;
export type FontWeight = typeof FONT_WEIGHT;
export type Shadows = typeof SHADOWS;