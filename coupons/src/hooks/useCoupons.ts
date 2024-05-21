import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateDiscountAmount,
  };
};
