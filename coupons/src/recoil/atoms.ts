import { isCouponExpired } from "./../hooks/useCouponValidator";
import { atom, selector, selectorFamily } from "recoil";
import { Coupon } from "../types/coupon";
import { CartItem } from "../types/cart";

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const couponValidityState = selectorFamily<boolean, number>({
  key: "couponValidityState",
  get:
    (couponId) =>
    ({ get }) => {
      const coupon = get(couponsState).find((c) => c.id === couponId);
      if (!coupon) return false;
      return !isCouponExpired(coupon.expirationDate);
    },
});

export const cartTotalState = selector<number>({
  key: "cartTotalState",
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
});

// export const discountAmountState = selector<number>({
//   key: "discountAmountState",
//   get: ({ get }) => {
//     get(couponListSelector);
//   },
// });
// export const totalAmountState = selector<number>({
//   key: "totalAmountState",
//   get: ({ get }) => {
//     get();
//   },
// });
