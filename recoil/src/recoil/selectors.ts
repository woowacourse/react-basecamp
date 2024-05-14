import { selector } from "recoil";
import { cartItemCountState } from "./atoms";

// Selector : Atom의 값을 기반으로 파생된 상태를 계산하는 역할
// Selector의 get 함수 : 파생된 상태 값을 계산하는 역할
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
