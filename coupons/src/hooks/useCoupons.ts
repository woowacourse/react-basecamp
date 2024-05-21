import { couponListSelector } from "../recoil/selectors";
import { useRecoilValue } from "recoil";

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);

  return {
    coupons,
  };
};
