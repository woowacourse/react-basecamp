import { useRecoilValue } from "recoil";
import { cartState, couponsState } from "../recoil/atoms";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartState);
  const coupons = useRecoilValue(couponsState);
  const { calculateDiscountAmount } = useDiscountCalculator();

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotalWithCoupon = (couponCode: string) => {
    const cartTotal = calculateCartTotal();
    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) return cartTotal;

    const discountAmount = calculateDiscountAmount(coupon, cartTotal);
    return cartTotal - discountAmount;
  };

  return {
    calculateCartTotal,
    calculateTotalWithCoupon,
  };
};
