
import { createContext, useContext } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4361ee',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0',
    subtitle: '#64748b',
    accent: '#4d7cfe',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4361ee',
    background: '#0f172a',
    card: '#1e293b',
    text: '#f1f5f9',
    border: '#334155',
    subtitle: '#94a3b8',
    accent: '#60a5fa',
  },
};

export type Theme = typeof lightTheme;
export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
