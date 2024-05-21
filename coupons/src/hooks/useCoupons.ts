import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListSelector);

  return {
    coupons,
  };
};
