import React from 'react';
import { useTheme } from '../components/context/ThemeContext';
import { useAuth } from '../components/context/AuthContext';

const Navbar: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const { state: authState, dispatch: authDispatch } = useAuth();

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Autowave Todo</h1>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="bg-white text-blue-600 px-3 py-1 rounded">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        {authState.user && (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
