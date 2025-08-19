import { useState } from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateName = (value: string) => {
    if (!value.trim()) return "Name is required.";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      console.log({ name, email, password });
      alert(`✅ Registration successful! Welcome, ${name}!`);
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  const isValid =
    !validateName(name) &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    !validateConfirmPassword(confirmPassword);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
    >
      <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
          }}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
          }}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
          }}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors((prev) => ({
              ...prev,
              confirmPassword: validateConfirmPassword(e.target.value),
            }));
          }}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 px-4 rounded text-white ${
          isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Register
      </button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>
        © 2025 Joseph Ogbole — Connect with me:{" "}
        <a
          href="https://github.com/ONJoseph"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/o-n-joseph/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://twitter.com/ONJoseph1"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </p>
    </footer>
  );
}
