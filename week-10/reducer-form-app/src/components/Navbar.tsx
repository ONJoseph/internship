import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          🧭 Reducer Form App
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({ isActive }) => (isActive ? "underline" : "")}>
            Home
          </NavLink>
          {state.user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Profile
              </NavLink>
              <span className="opacity-80">Hi, {state.user.username}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "underline" : "")}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
