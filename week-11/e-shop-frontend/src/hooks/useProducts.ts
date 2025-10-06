import { useMemo, useState } from "react";
import productsData from "../data/products.json";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export function useProducts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");

  const products = productsData as Product[];

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter(p => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }, [products, query, category]);

  return { products: filtered, allProducts: products, query, setQuery, category, setCategory };
}
