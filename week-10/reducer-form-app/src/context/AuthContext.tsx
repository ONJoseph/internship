import { createContext, useContext, useEffect, useReducer } from "react";

type User = { username: string; email: string } | null;

type State = {
  user: User;
};

type Action =
  | { type: "LOGIN"; payload: { username: string; email: string } }
  | { type: "REGISTER"; payload: { username: string; email: string } }
  | { type: "LOGOUT" };

const AuthContext = createContext<{
  state: State;
  login: (u: { username: string; email: string }) => void;
  register: (u: { username: string; email: string }) => void;
  logout: () => void;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return { user: { username: action.payload.username, email: action.payload.email } };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

const initialState: State = { user: null };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    // hydrate from localStorage
    const raw = localStorage.getItem("auth:user");
    if (raw) {
      try {
        return { user: JSON.parse(raw) as User };
      } catch {
        return init;
      }
    }
    return init;
  });

  useEffect(() => {
    if (state.user) localStorage.setItem("auth:user", JSON.stringify(state.user));
    else localStorage.removeItem("auth:user");
  }, [state.user]);

  const login = (u: { username: string; email: string }) =>
    dispatch({ type: "LOGIN", payload: u });
  const register = (u: { username: string; email: string }) =>
    dispatch({ type: "REGISTER", payload: u });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
