import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { cartItemCountState, itemQuantityState } from './atoms';

describe('cartItemCountState', () => {
  it('초기값은 0', () => {
    // wrapper로 RecoilRoot 컴포넌트를 전달해 Recoil 상태 관리 환경을 설정
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });
    // [0]: atom의 현재 값
    // [1]: atom의 값을 업데이트하는 함수
    expect(result.current[0]).toBe(0);
  });

  it('값 변경 가능', () => {
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

describe('itemQuantityState', () => {
  it('초기 수량은 0', () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(itemQuantityState(productId)),
      {
        wrapper: RecoilRoot,
      }
    );
    expect(result.current[0]).toBe(0);
  });

  it('수량 변경 가능', () => {
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
