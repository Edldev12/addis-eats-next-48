"use client";

import { useState } from "react";

type NewDish = {
  name: string;
  price: string;
  category: string;
  image: string;
};

type AddDishFormProps = {
  onAdd: (dish: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
  }) => void;
  onCancel: () => void;
};

export default function AddDishForm({ onAdd, onCancel }: AddDishFormProps) {
  const [dish, setDish] = useState<NewDish>({
    name: "",
    price: "",
    category: "Traditional",
    image: "/images/kitfo.jpg",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = dish.name.trim();
    const price = Number(dish.price);
    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!name || !Number.isFinite(price) || price <= 0 || !id) {
      return;
    }

    onAdd({
      id,
      name,
      price,
      category: dish.category,
      image: dish.image.trim() || "/images/kitfo.jpg",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 sm:grid-cols-2"
    >
      <h2 className="text-xl font-bold sm:col-span-2">Add New Dish</h2>

      <input
        required
        value={dish.name}
        onChange={(event) =>
          setDish({ ...dish, name: event.target.value })
        }
        placeholder="Dish name"
        className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
      />

      <input
        required
        type="number"
        min="1"
        step="1"
        value={dish.price}
        onChange={(event) =>
          setDish({ ...dish, price: event.target.value })
        }
        placeholder="Price in ETB"
        className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
      />

      <select
        value={dish.category}
        onChange={(event) =>
          setDish({ ...dish, category: event.target.value })
        }
        className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
      >
        <option value="Traditional">Traditional</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Drinks">Drinks</option>
      </select>

      <input
        value={dish.image}
        onChange={(event) =>
          setDish({ ...dish, image: event.target.value })
        }
        placeholder="Image path, e.g. /images/kitfo.jpg"
        className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
      />

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Save Dish
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 px-5 py-3 hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}