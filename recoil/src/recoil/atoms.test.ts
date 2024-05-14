import { renderHook, act } from "@testing-library/react";

import { RecoilRoot, useRecoilState } from "recoil";

import { cartItemCountState, itemQuantityState } from "./atoms";

describe("cartItemCountState", () => {
  const setUp = () => {
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });

    const [count, setCount] = result.current;

    return { count, setCount };
  };

  it("초기값은 0", () => {
    const { count } = setUp();

    expect(count).toBe(0);
  });

  it("값 변경 가능", () => {
    const { count, setCount } = setUp();

    act(() => {
      setCount(2);
    });

    expect(count).toBe(2);

    act(() => {
      setCount((prevCount) => prevCount + 1);
    });

    expect(count).toBe(3);
  });
});

describe("itemQuantityState", () => {
  it("초기 수량은 0", () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(itemQuantityState(productId)),
      {
        wrapper: RecoilRoot,
      }
    );
    expect(result.current[0]).toBe(0);
  });

  it("수량 변경 가능", () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(itemQuantityState(productId)),
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((prevQuantity) => prevQuantity + 1);
    });
    expect(result.current[0]).toBe(3);
  });
});
