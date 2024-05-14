import { selector } from "recoil";
import { cartItemCountState } from "./atoms";

export const cartTotalPriceState = selector<number>({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const count = get(cartItemCountState);
    const itemPrice = 10;
    return count * itemPrice;
  },
});

const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return error;
  }
};

export const productsState = selector({
  key: "productsState",
  get: async () => {
    const products = await fetchProducts();
    return products;
  },
});
