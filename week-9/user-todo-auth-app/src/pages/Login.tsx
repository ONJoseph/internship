import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username.trim());
    navigate('/');
  };

  return (
    <main className="mx-auto max-w-sm px-4 py-10">
      <div className="rounded border bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-center text-xl font-semibold">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-700"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          No account?{' '}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
