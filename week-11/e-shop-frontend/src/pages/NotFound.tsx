import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold">404 — Page not found</h2>
      <Link className="mt-4 inline-block underline" to="/">
        Go home
      </Link>
    </section>
  );
}
