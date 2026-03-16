import { TextStyle } from 'react-native';

export const fonts = {
  heading: 'System', // TODO: Load Nunito via expo-font
  body: 'System',    // TODO: Load Inter via expo-font
  mono: 'SpaceMono', // Already included in template
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  counter: { fontSize: 48, fontWeight: '700', fontFamily: 'SpaceMono', lineHeight: 56 },
  counterLabel: { fontSize: 14, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
};
