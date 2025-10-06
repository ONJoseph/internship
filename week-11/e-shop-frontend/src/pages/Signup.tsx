import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(name, email, pwd);
      nav("/products");
    } catch (err: any) {
      setError(err.message ?? "Signup failed");
    }
  };

  const valid = name.trim() && email.includes("@") && pwd.length >= 6;

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h2 className="text-2xl font-semibold">Create Account</h2>
      <form onSubmit={submit} className="mt-4 space-y-3 rounded border p-4 dark:border-gray-800">
        <input
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          placeholder="Password (min 6)"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={!valid} className="w-full rounded bg-green-600 py-2 text-white disabled:opacity-50">
          Sign up
        </button>
      </form>
    </section>
  );
}
