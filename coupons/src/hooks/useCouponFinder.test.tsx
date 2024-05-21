<<<<<<< HEAD
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCouponFinder } from "./useCouponFinder";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useCouponFinder", () => {
  it("존재하는 쿠폰 코드로 쿠폰을 찾을 수 있다", () => {
=======
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useCouponFinder } from './useCouponFinder';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';

describe('useCouponFinder', () => {
  it('존재하는 쿠폰 코드로 쿠폰을 찾을 수 있다', () => {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(couponsState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
<<<<<<< HEAD
    expect(result.current.findCouponByCode("FIXED5000")).toBe(mockCoupons[0]);
  });

  it("존재하지 않는 쿠폰 코드로 쿠폰을 찾으면 undefined를 반환한다", () => {
=======
    expect(result.current.findCouponByCode('FIXED5000')).toBe(mockCoupons[0]);
  });

  it('존재하지 않는 쿠폰 코드로 쿠폰을 찾으면 undefined를 반환한다', () => {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(couponsState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
<<<<<<< HEAD
    expect(result.current.findCouponByCode("INVALID_CODE")).toBeUndefined();
=======
    expect(result.current.findCouponByCode('INVALID_CODE')).toBeUndefined();
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  });
});
