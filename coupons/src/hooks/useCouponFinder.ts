import { useRecoilValue } from "recoil";
import { couponListSelector } from "../recoil/selectors";

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListSelector);
  /**
   * code로 쿠폰 찾기
   * @param code
   * @returns 일치하는 쿠폰  | undefined 반환
   */
  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
