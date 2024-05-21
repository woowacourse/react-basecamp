import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCartCalculator } from "../useCartCalculator";
import { cartState } from "../../recoil/atoms";

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
});
