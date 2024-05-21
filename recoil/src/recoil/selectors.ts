import { selector } from 'recoil';
import { cartItemCountState } from './atoms';

export const cartTotalPriceState = selector<number>({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const count = get(cartItemCountState);
    const itemPrice = 10;
    return count * itemPrice;
  },
});

const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    return data.products;
  } catch (error) {
<<<<<<< HEAD
    console.error('Failed to fetch products: ', error);
=======
    console.error('Failed to fetch products:', error);
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    return error;
  }
};

export const productsState = selector({
  key: 'productsState',
  get: async () => {
    const products = await fetchProducts();
    return products;
  },
});
