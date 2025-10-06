import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { formatCurrency } from "../utils/currency";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import QuantityInput from "../components/QuantityInput";

export default function ProductDetails() {
  const { id } = useParams();
  const p = (products as any[]).find((x) => String(x.id) === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!p) return <div className="mx-auto max-w-6xl px-4 py-10">Product not found.</div>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <img src={p.image} alt={p.title} className="h-80 w-full rounded object-cover" />
        <div>
          <h1 className="text-2xl font-semibold">{p.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{p.description}</p>
          <p className="mt-4 text-xl font-bold">{formatCurrency(p.price)}</p>

          <div className="mt-6 flex items-center gap-4">
            <QuantityInput value={qty} onChange={setQty} />
            <button
              onClick={() => addToCart({ id: p.id, title: p.title, price: p.price, image: p.image }, qty)}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
