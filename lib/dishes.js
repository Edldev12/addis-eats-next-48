const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    price: 450,
    category: "Traditional",
    description:
      "Traditional Ethiopian minced beef seasoned with spiced butter and mitmita.",
    image: "/images/kitfo.jpg",
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 250,
    category: "Traditional",
    description:
      "Smooth and flavorful chickpea stew prepared with Ethiopian spices.",
    image: "/images/shiro.jpg",
  },
  {
    id: "pizza",
    name: "Pizza",
    price: 500,
    category: "Fast Food",
    description:
      "Freshly prepared pizza with a delicious combination of toppings.",
    image: "/images/pizza.jpg",
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    price: 400,
    category: "Traditional",
    description:
      "Spicy Ethiopian chicken stew slowly cooked with berbere and traditional spices.",
    image: "/images/Doro-wet.jpg",
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 450,
    category: "Traditional",
    description:
      "Tender pieces of meat sautéed with onions, peppers, and Ethiopian spices.",
    image: "/images/tibs.jpg",
  },
  {
    id: "beyaynet",
    name: "Beyaynet",
    price: 300,
    category: "Traditional",
    description:
      "A colorful combination of Ethiopian vegetable and lentil dishes served on injera.",
    image: "/images/beyaynet.jpg",
  },
  {
    id: "special-firfir",
    name: "Special Firfir",
    price: 280,
    category: "Traditional",
    description:
      "Pieces of injera mixed with a flavorful, spicy Ethiopian sauce.",
    image: "/images/speshal-firfir.jpg",
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    price: 220,
    category: "Breakfast",
    description:
      "Traditional Ethiopian flatbread pieces mixed with spiced butter and berbere.",
    image: "/images/checebsa.jpg",
  },
  {
    id: "club-sandwich",
    name: "Club Sandwich",
    price: 350,
    category: "Fast Food",
    description:
      "A layered sandwich filled with fresh vegetables and delicious savory ingredients.",
    image: "/images/club-sandweh.jpg",
  },
  {
    id: "spris",
    name: "Spris",
    price: 180,
    category: "Drinks",
    description:
      "Refreshing Ethiopian-style layered mixed juice made with fresh fruit.",
    image: "/images/spric.jpg",
  },
];

export function getDishes() {
  return dishes;
}

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

export default dishes;
