import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        primary: {
          100: '#d0d1d5',
          // ... other shades
          900: '#00ffff', // main cyan
        },
        grey: {
          100: '#e0e0e0',
          // ... other shades
          900: '#212121',
        },
        background: {
          default: '#020b1a', // dark blue
          alt: 'rgba(10, 25, 47, 0.85)', // sidebar background
        },
      }
    : {
        primary: {
          100: '#d0d1d5',
          // ... other shades
          900: '#0d47a1', // dark blue for light mode
        },
        grey: {
          100: '#f5f5f5',
          // ... other shades
          900: '#212121',
        },
        background: {
          default: '#fcfcfc',
          alt: '#f0f0f0',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: { main: colors.primary[900] },
            background: {
              default: colors.background.default,
              paper: colors.background.alt,
            },
          }
        : {
            primary: { main: colors.primary[900] },
            background: {
              default: colors.background.default,
            },
          }),
    },
    typography: {
      fontFamily: ['"Source Sans 3"', 'sans-serif'].join(','),
      fontSize: 12,
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(() => ({ toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }), []);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};