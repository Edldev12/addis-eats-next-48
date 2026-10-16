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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-slate-950 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:translate-y-0"
    >
      {added ? (
        <>
          <span aria-hidden="true">✓</span>
          Added to Cart
        </>
      ) : (
        <>
          <span aria-hidden="true">+</span>
          Add to Cart
        </>
      )}
    </button>
  );
}