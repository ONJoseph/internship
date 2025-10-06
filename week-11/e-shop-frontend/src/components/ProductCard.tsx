import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/currency";
import type { Product } from "../hooks/useProducts";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Link to={`/products/${p.id}`}>
        <img src={p.image} alt={p.title} className="h-44 w-full rounded object-cover" />
        <h3 className="mt-3 line-clamp-1 font-medium">{p.title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{formatCurrency(p.price)}</p>
      </Link>
      <Link
        to={`/products/${p.id}`}
        className="mt-3 inline-block w-full rounded bg-blue-600 px-3 py-2 text-center text-white hover:bg-blue-700"
      >
        View
      </Link>
    </div>
  );
}
