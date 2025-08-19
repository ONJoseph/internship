import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { email: "", username: "", password: "", confirm: "" },
    (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.username.trim()) errs.username = "Username is required";
      if (!vals.email.trim()) errs.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(vals.email)) errs.email = "Enter a valid email";
      if (!vals.password) errs.password = "Password is required";
      else if (vals.password.length < 6) errs.password = "Min 6 characters";
      if (vals.confirm !== vals.password) errs.confirm = "Passwords do not match";
      return errs;
    },
    (vals) => {
      register({ username: vals.username.trim(), email: vals.email.trim() });
      navigate("/profile");
    }
  );

  const onSubmit = (e: FormEvent) => handleSubmit(e as unknown as Event);

  return (
    <section className="mx-auto max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            value={values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={() => handleBlur("username")}
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="joseph"
          />
          {touched.username && errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="you@example.com"
          />
          {touched.email && errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
          />
          {touched.password && errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Confirm password</label>
          <input
            type="password"
            value={values.confirm}
            onChange={(e) => handleChange("confirm", e.target.value)}
            onBlur={() => handleBlur("confirm")}
            className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
          />
          {touched.confirm && errors.confirm && (
            <p className="text-sm text-red-600 mt-1">{errors.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Create account
        </button>

        <p className="text-sm opacity-80">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
