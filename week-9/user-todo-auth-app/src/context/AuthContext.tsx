import React, { createContext, useContext, useEffect, useReducer } from 'react';

type User = { username: string } | null;

interface AuthState {
  user: User;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { username: string } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: { username: string } };

const AuthContext = createContext<{
  state: AuthState;
  login: (username: string) => void;
  logout: () => void;
  register: (username: string) => void;
} | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return { user: { username: action.payload.username } };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = localStorage.getItem('auth_user');
  const [state, dispatch] = useReducer(authReducer, {
    user: stored ? JSON.parse(stored) : null
  });

  useEffect(() => {
    localStorage.setItem('auth_user', JSON.stringify(state.user));
  }, [state.user]);

  const login = (username: string) => dispatch({ type: 'LOGIN', payload: { username } });
  const register = (username: string) => dispatch({ type: 'REGISTER', payload: { username } });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
