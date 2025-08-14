import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { state: auth, logout } = useAuth();
  const { state: theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          📝 Joseph’s Todo
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme.theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>

          {auth.user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                Hello, <strong>{auth.user.username}</strong>
              </span>
              {pathname !== '/' && (
                <Link
                  to="/"
                  className="rounded px-3 py-1 text-sm border hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Home
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded px-3 py-1 text-sm border hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
