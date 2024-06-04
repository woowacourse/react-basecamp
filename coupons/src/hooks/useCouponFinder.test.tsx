import React from "react";

import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useCouponFinder } from "./useCouponFinder";
import { couponsState } from "../recoil/atoms";
import { mockCoupons } from "../mocks/coupons";

//recoilRoot에서 initializeState을 사용하면
//set의 첫번째 인자를 두번째 인자로 설정할 수 있다.
describe("쿠폰 목록을 반환한다.", () => {
  it("존재하는 쿠폰 코드로 쿠폰을 찾을 수 있다", () => {
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.findCouponByCode("FIXED5000")).toBe(mockCoupons[0]);
  });
  it("존재하는 쿠폰 코드로 쿠폰을 찾을 수 있으면 undefined를 반환한다.", () => {
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.findCouponByCode("INVALID_CODE")).toBe(undefined);
  });
});
