import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { state } = useAuth();
  if (!state.user) return <Navigate to="/login" replace />;
  return children;
}
