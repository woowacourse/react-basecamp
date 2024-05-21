import { selector, selectorFamily } from "recoil";
import { cartState, couponsState } from "./atoms";
import { useCouponValidator } from "../hooks/useCouponValidator";

export const couponListSelector = selector({
  key: "couponListSelector",
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons;
  },
});

export const couponValidityState = selectorFamily<boolean, number>({
  key: "couponValidityState",
  get:
    (couponId) =>
    ({ get }) => {
      const { isCouponExpired } = useCouponValidator();
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
