<<<<<<< HEAD
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useDiscountCalculator } from "./useDiscountCalculator";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useDiscountCalculator", () => {
  describe("고정 금액 할인", () => {
    it("고정 금액 할인 쿠폰의 할인 금액을 계산할 수 있다", () => {
=======
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useDiscountCalculator } from './useDiscountCalculator';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';

describe('useDiscountCalculator', () => {
  describe('고정 금액 할인', () => {
    it('고정 금액 할인 쿠폰의 할인 금액을 계산할 수 있다', () => {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCoupons)}>{children}</RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCoupons[0], 120000)).toBe(5000);
    });

<<<<<<< HEAD
    it("주문 금액이 최소 주문 금액 미만일 때는 고정 금액 할인이 적용되지 않는다", () => {
=======
    it('주문 금액이 최소 주문 금액 미만일 때는 고정 금액 할인이 적용되지 않는다', () => {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponsState, mockCoupons)}>{children}</RecoilRoot>
        ),
      });
      expect(result.current.calculateDiscountAmount(mockCoupons[0], 50000)).toBe(0);
    });
  });

<<<<<<< HEAD
  describe("비율 할인", () => {
    // ... 비율 할인 테스트 케이스
  });

  describe("Buy X Get Y 할인", () => {
=======
  describe('비율 할인', () => {
    // ... 비율 할인 테스트 케이스
  });

  describe('Buy X Get Y 할인', () => {
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    // ... Buy X Get Y 할인 테스트 케이스
  });
});
