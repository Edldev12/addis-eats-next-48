"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const initialDishes = [
  { id: "kitfo", name: "Kitfo", price: 450, category: "Traditional", image: "/images/kitfo.jpg" },
  { id: "shiro", name: "Shiro", price: 250, category: "Traditional", image: "/images/shiro.jpg" },
  { id: "pizza", name: "Pizza", price: 500, category: "Fast Food", image: "/images/pizza.jpg" },
  { id: "doro-wot", name: "Doro Wot", price: 400, category: "Traditional", image: "/images/Doro-wet.jpg" },
  { id: "tibs", name: "Tibs", price: 450, category: "Traditional", image: "/images/tibs.jpg" },
  { id: "beyaynet", name: "Beyaynet", price: 300, category: "Traditional", image: "/images/beyaynet.jpg" },
  { id: "special-firfir", name: "Special Firfir", price: 280, category: "Traditional", image: "/images/speshal-firfir.jpg" },
  { id: "chechebsa", name: "Chechebsa", price: 220, category: "Breakfast", image: "/images/checebsa.jpg" },
  { id: "club-sandwich", name: "Club Sandwich", price: 350, category: "Fast Food", image: "/images/club-sandweh.jpg" },
  { id: "spris", name: "Spris", price: 180, category: "Drinks", image: "/images/spric.jpg" },
];

export default function AdminMenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dishes] = useState(initialDishes);

  const categories = ["All", ...new Set(initialDishes.map((dish) => dish.category))];

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || dish.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <p className="mt-2 text-sm text-slate-400">
              View and manage your restaurant dishes.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="We'll implement adding dishes in the next step."
            className="cursor-not-allowed rounded-lg bg-cyan-500/50 px-5 py-3 font-semibold text-slate-950"
          >
            + Add Dish (Next Step)
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total Dishes</p>
            <p className="mt-2 text-3xl font-bold">{dishes.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Categories</p>
            <p className="mt-2 text-3xl font-bold">{categories.length - 1}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Menu Status</p>
            <p className="mt-2 text-xl font-semibold text-emerald-400">
              Available
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search dishes..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400 sm:max-w-sm"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-5 py-4">Dish</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="bg-slate-950 hover:bg-slate-900">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold">{dish.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-300">{dish.category}</td>
                  <td className="px-5 py-4 font-semibold">
                    {dish.price.toLocaleString()} ETB
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400">
                      Available
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled
                      title="We'll implement editing in a later step."
                      className="text-cyan-400 opacity-60"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDishes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                    No dishes match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing {filteredDishes.length} of {dishes.length} dishes
        </p>
      </div>
    </main>
  );
}