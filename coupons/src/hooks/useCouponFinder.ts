import { couponListSelector } from "../recoil/selectors";
import { useRecoilValue } from "recoil";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelector);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
