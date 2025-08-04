import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';

const LoginForm: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const { dispatch } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN', payload: { username } });
    onLoginSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border px-3 py-2 w-full mb-4"
        placeholder="Enter username"
        required
      />
      <button className="w-full bg-blue-600 text-white px-3 py-2 rounded">Login</button>
    </form>
  );
};

export default LoginForm;
