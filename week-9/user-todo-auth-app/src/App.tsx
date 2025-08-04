import React from 'react';
import { AuthProvider } from './components/context/AuthContext';
import { TodoProvider } from './components/context/TodoContext';
import { ThemeProvider } from './components/context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TodoProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <Navbar />
            <Home />
          </div>
        </TodoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
