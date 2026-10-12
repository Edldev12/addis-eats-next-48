"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function Providers({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(dish) {
    console.log("ADDING TO CART:", dish);

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
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside Providers");
  }

  return context;
}