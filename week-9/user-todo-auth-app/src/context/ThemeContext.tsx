import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

type ThemeAction = { type: 'TOGGLE' } | { type: 'SET'; payload: Theme };

const ThemeContext = createContext<{
  state: ThemeState;
  toggleTheme: () => void;
} | null>(null);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE':
      return { theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET':
      return { theme: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = (localStorage.getItem('theme') as Theme) || 'light';
  const [state, dispatch] = useReducer(themeReducer, { theme: stored });

  // Apply/remove 'dark' class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  const toggleTheme = () => dispatch({ type: 'TOGGLE' });

  return (
    <ThemeContext.Provider value={{ state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
