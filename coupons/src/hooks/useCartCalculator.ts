import { useRecoilValue } from "recoil";
import { cartState, couponsState } from "../recoil/atoms";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartState);
  const coupons = useRecoilValue(couponsState);
  const { calculateDiscountAmount } = useDiscountCalculator();

  /**
   * cartState 아톰에 저장된 값을 순회하며 총합 계산
   * @returns { number }
   */
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  /**
   * 쿠폰 코드로 쿠폰을 찾고, 장바구니 총합에서 쿠폰 할인 금액을 뺌
   * @param couponCode
   * @returns { number }
   */
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
