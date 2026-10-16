
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();
const ThemeContext = createContext();

export function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState(null);

  // Sync with the theme initialized on the document.
  function toggleTheme() {
    const currentTheme =
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";

    const nextTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );

    try {
      localStorage.setItem("addis-eats-theme", nextTheme);
    } catch {
      // Theme switching still works if storage is unavailable.
    }

    setTheme(nextTheme);
  }

  function addToCart(dish) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === dish.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...dish,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(dishId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== dishId)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside Providers");
  }

  return context;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside Providers");
  }

  return context;
}
