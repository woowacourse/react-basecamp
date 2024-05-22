import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCartCalculator } from "./useCartCalculator";
import { cartState, couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

describe("useCartCalculator", () => {
  it("장바구니 총합을 계산할 수 있다", () => {
    const mockCartItems = [
      { id: 1, name: "Item 1", price: 10000, quantity: 2 },
      { id: 2, name: "Item 2", price: 20000, quantity: 1 },
    ];

    const { result } = renderHook(() => useCartCalculator(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartState, mockCartItems)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.calculateCartTotal()).toBe(40000);
  });

  it("쿠폰 할인이 적용된 최종 결제 금액을 계산할 수 있다", () => {
    const mockCartItems = [
      { id: 1, name: "Item 1", price: 10000, quantity: 2 },
      { id: 2, name: "Item 2", price: 20000, quantity: 1 },
      { id: 2, name: "Item 3", price: 60000, quantity: 1 },
    ];

    const { result } = renderHook(() => useCartCalculator(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartState, mockCartItems);
            set(couponsState, mockCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.calculateTotalWithCoupon("FIXED5000")).toBe(95000);
  });
});
