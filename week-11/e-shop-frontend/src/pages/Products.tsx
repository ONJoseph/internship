import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { products, query, setQuery, category, setCategory, allProducts } = useProducts();
  const categories = Array.from(new Set(allProducts.map(p => p.category)));

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="flex w-full gap-2 sm:w-auto">
          <input
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="rounded border px-3 py-2 dark:bg-gray-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
