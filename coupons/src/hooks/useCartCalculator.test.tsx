import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { mockCoupons } from "../mocks/coupons";
import { cartState, couponsState } from "../recoil/atoms";
import { useCartCalculator } from "./useCartCalculator";

describe("useCartCalculator", () => {
  // 생략 ...

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
