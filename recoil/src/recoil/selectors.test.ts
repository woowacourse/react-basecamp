import { renderHook, act } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemCountState } from "./atoms";
import { cartTotalPriceState } from "./selectors";

describe("cartTotalPriceState", () => {
  it("초기 총 가격은 0", () => {
    const { result } = renderHook(() => useRecoilValue(cartTotalPriceState), {
      wrapper: RecoilRoot,
    });
    expect(result.current).toBe(0);
  });

  it("상품 개수에 따른 총 가격 계산", () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(cartTotalPriceState);
        const setCartItemCount = useSetRecoilState(cartItemCountState);
        return { totalPrice, setCartItemCount };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartItemCount(2);
    });
    expect(result.current.totalPrice).toBe(20);

    act(() => {
      result.current.setCartItemCount(5);
    });
    expect(result.current.totalPrice).toBe(50);
  });
});
