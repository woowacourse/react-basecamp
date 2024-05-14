import { cartItemCountState } from "./atoms";
import { selector } from "recoil";

// Selector는 Atom의 값을 기반으로 파생된 상태를 계산하는 역할
// Selector는 하나 이상의 Atom이나 다른 Selector를 입력으로 받아 새로운 상태 값을 계산하고 반환
// 이를 통해 상태 간의 의존성을 관리하고 파생된 값을 쉽게 계산
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
    alert(1);
    return products;
  },
});
