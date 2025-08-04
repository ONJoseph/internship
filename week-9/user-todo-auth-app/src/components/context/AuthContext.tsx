import { createContext, useContext, useReducer } from "react";

type User = { username: string } | null;
type AuthState = { user: User };
type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "REGISTER"; payload: User };

const AuthContext = createContext<{
  state: AuthState;
  login: (username: string) => void;
  logout: () => void;
  register: (username: string) => void;
} | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (username: string) => dispatch({ type: "LOGIN", payload: { username } });
  const register = (username: string) => dispatch({ type: "REGISTER", payload: { username } });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
