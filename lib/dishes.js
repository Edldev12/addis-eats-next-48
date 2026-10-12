const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    price: 450,
    category: "Traditional",
    description:
      "Traditional Ethiopian minced beef seasoned with spiced butter and mitmita.",
    image: "/images/kitfo.png",
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 250,
    category: "Traditional",
    description:
      "Smooth and flavorful chickpea stew prepared with Ethiopian spices.",
    image: "/images/shiro.png",
  },
  {
    id: "pizza",
    name: "Pizza",
    price: 500,
    category: "Fast Food",
    description:
      "Freshly prepared pizza with a delicious combination of toppings.",
    image: "/images/pizza.png",
  },
];

export function getDishes() {
  return dishes;
}

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

export default dishes;