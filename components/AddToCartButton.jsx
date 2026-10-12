"use client";

import { useState } from "react";
import { useCart } from "@/app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(dish);
    setAdded(true);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Add ${dish.name} to cart`}
      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
