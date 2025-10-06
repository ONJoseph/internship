import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

export default function Cart() {
  const { state, total, removeFromCart, setQty, clear } = useCart();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      {state.items.length === 0 ? (
        <p className="mt-4 text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mt-4 divide-y rounded border dark:divide-gray-800 dark:border-gray-800">
            {state.items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 p-3">
                <img src={i.image} alt={i.title} className="h-16 w-20 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{i.title}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(i.price)}</p>
                </div>
                <input
                  type="number"
                  min={1}
                  className="w-16 rounded border px-2 py-1 text-center"
                  value={i.qty}
                  onChange={(e) => setQty(i.id, Math.max(1, Number(e.target.value)))}
                />
                <button onClick={() => removeFromCart(i.id)} className="rounded bg-red-600 px-3 py-1 text-white">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={clear} className="rounded border px-3 py-2">
              Clear Cart
            </button>
            <div className="text-right">
              <p className="text-xl font-semibold">Total: {formatCurrency(total)}</p>
              <button className="mt-2 rounded bg-green-600 px-4 py-2 text-white">Checkout (mock)</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
