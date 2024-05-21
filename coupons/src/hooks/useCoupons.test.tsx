<<<<<<< HEAD
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCoupons } from "./useCoupons";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useCoupons", () => {
  it("쿠폰 목록을 반환한다", () => {
=======
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useCoupons } from './useCoupons';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';

describe('useCoupons', () => {
  it('쿠폰 목록을 반환한다', () => {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(couponsState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
    expect(result.current.coupons).toBeDefined();
    expect(result.current.coupons.length).toBe(4);
  });
});
