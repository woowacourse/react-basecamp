import { RecoilRoot } from 'recoil';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';
import { renderHook } from '@testing-library/react';
import { useDiscountCalculator } from './useDiscountCalculator';

describe('useDiscountCalculator', () => {
  describe('고정 금액 할인', () => {
    it('고정 금액 할인 쿠폰의 할인 금액을 계산할 수 있다', () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(
        result.current.calculateDiscountAmount(mockCoupons[0], 120000)
      ).toBe(5000);
    });

    it('주문 금액이 최소 주문 금액 미만일 때는 고정 금액 할인이 적용되지 않는다', () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      expect(
        result.current.calculateDiscountAmount(mockCoupons[0], 50000)
      ).toBe(0);
    });
  });

  describe('비율 할인', () => {
    test('쿠폰 할인 비율에 맞게 가격을 할인한다.', () => {
      const { result } = renderHook(() => useDiscountCalculator(), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      });
      const fakeDate = new Date(2024, 5, 21, 4, 57);
      jest.useFakeTimers().setSystemTime(fakeDate);
      expect(
        result.current.calculateDiscountAmount(mockCoupons[3], 10000)
      ).toBe(3000);
    });
  });

  describe('Buy X Get Y 할인', () => {
    test('3개를 구매하면 1개를 할인한다.', () => {
      // const { result } = renderHook(() => useDiscountCalculator(), {
      //   wrapper: ({ children }) => (
      //     <RecoilRoot
      //       initializeState={({ set }) => set(couponsState, mockCoupons)}
      //     >
      //       {children}
      //     </RecoilRoot>
      //   ),
      // });
      // expect(
      //   result.current.calculateDiscountAmount(mockCoupons[2], 10000)
      // ).toBe(3000);
    });
  });
});
