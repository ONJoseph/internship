import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome to Joseph’s E-Shop</h1>
        <p className="mt-2 text-white/90">Your minimalist demo store built with React + Context + useReducer.</p>
        <Link to="/products" className="mt-6 inline-block rounded bg-white/10 px-4 py-2 hover:bg-white/20">
          Browse Products
        </Link>
      </div>
    </section>
  );
}
