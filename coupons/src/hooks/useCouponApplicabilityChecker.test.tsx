import { renderHook } from '@testing-library/react';
import { useCouponApplicabilityChecker } from './useCouponApplicabilityChecker';
import { RecoilRoot } from 'recoil';
import { couponState } from '../recoil/atom';
import { mockCoupons } from '../mocks/coupons';

describe('useCouponApplicabilityChecker', () => {
  it('주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가', () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={({ set }) => set(couponState, mockCoupons)}>{children}</RecoilRoot>,
    });

    expect(result.current.isCouponApplicable(mockCoupons[0], 50000)).toBeFalsy();
  });

  it('주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능', () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={({ set }) => set(couponState, mockCoupons)}>{children}</RecoilRoot>,
    });
    expect(result.current.isCouponApplicable(mockCoupons[2], 60000)).toBeTruthy();
  });
});
