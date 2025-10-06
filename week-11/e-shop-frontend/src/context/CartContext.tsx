import { createContext, useContext, useMemo, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = { id: number; title: string; price: number; image: string; qty: number };
type CartState = { items: CartItem[] };
type Action =
  | { type: "ADD"; payload: Omit<CartItem, "qty"> & { qty?: number } }
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "SET_QTY"; payload: { id: number; qty: number } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartState };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.payload.qty ?? 1;
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(i => (i.id === existing.id ? { ...i, qty: i.qty + qty } : i))
        };
      }
      const { id, title, price, image } = action.payload;
      return { items: [{ id, title, price, image, qty }, ...state.items] };
    }
    case "REMOVE":
      return { items: state.items.filter(i => i.id !== action.payload.id) };
    case "SET_QTY":
      return {
        items: state.items.map(i => (i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i))
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

type CartContextType = {
  state: CartState;
  addToCart: (p: { id: number; title: string; price: number; image: string }, qty?: number) => void;
  removeFromCart: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [persisted, setPersisted] = useLocalStorage<CartState>("cart_state", { items: [] });
  const [state, dispatch] = useReducer(reducer, persisted);

  // persist whenever state changes
  useMemo(() => setPersisted(state), [state, setPersisted]);

  const addToCart: CartContextType["addToCart"] = (p, qty = 1) => dispatch({ type: "ADD", payload: { ...p, qty } });
  const removeFromCart = (id: number) => dispatch({ type: "REMOVE", payload: { id } });
  const setQty = (id: number, qty: number) => dispatch({ type: "SET_QTY", payload: { id, qty } });
  const clear = () => dispatch({ type: "CLEAR" });

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, setQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
