import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          🛒 Joseph’s E-Shop
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/products" className="hover:underline">
            Products
          </NavLink>
          <NavLink to="/cart" className="hover:underline">
            Cart <span className="rounded bg-blue-600 px-2 py-0.5 text-white">{count}</span>
          </NavLink>

          <button onClick={toggleTheme} className="rounded border px-2 py-1">
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
              <NavLink to="/signup" className="hover:underline">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
