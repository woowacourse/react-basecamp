import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";
import { useDiscountCalculator } from "./useDiscountCalculator";

//쿠폰에 대해 가장 마지막에 필요한 값을 넣어주는 커스텀 훅
export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateDiscountAmount,
  };
};
