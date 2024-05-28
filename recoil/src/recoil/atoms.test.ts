import { RecoilRoot, useRecoilState } from "recoil";
import { act, renderHook } from "@testing-library/react";
import { cartItemCountState, itemQuantityState } from "./atoms";

describe("cartItemCountState", () => {
  it("초기값은 0", () => {
    // useRecoilState 훅은 Atom의 현재 값과 값을 업데이트하는 함수를 반환
    // renderHook 함수의 wrapper 옵션에 RecoilRoot 컴포넌트를 전달하여 Recoil 상태 관리 환경을 설정
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });
    // const [cartItemCount, setCatItemCount] = result
    expect(result.current[0]).toBe(0);
  });

  it("값 변경 가능", () => {
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((prevCount) => prevCount + 1);
    });
    expect(result.current[0]).toBe(3);
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
