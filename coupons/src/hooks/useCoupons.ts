import { couponListSelector } from "../recoil/selectors";
import { useRecoilValue } from "recoil";
import useDiscountCalculator from "./useDiscountCalculator";

const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return { coupons, calculateDiscountAmount };
};

export default useCoupons;
