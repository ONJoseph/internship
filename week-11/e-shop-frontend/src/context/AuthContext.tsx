import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type User = { name: string; email: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User>("auth_user", null);

  const login = async (email: string, password: string) => {
    if (!email.includes("@") || password.length < 6) throw new Error("Invalid credentials");
    setUser({ name: email.split("@")[0], email });
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.includes("@") || password.length < 6) throw new Error("Invalid signup data");
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
