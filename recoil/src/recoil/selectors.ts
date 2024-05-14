import { selector } from 'recoil';
import { cartItemCountState } from './atom';

export const cartTotalPriceState = selector<number>({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const count = get(cartItemCountState);
    const itemPrice = 10;

    return count * itemPrice;
  },
});
