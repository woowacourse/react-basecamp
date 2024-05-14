import { RecoilRoot, useRecoilState } from 'recoil';
import { act, renderHook } from '@testing-library/react';

import { cartItemCountState } from './atoms';

describe('cartItemCountState', () => {
  it('초기값은 0', () => {
    const { result } = renderHook(() => useRecoilState(cartItemCountState), {
      wrapper: RecoilRoot,
    });
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
      result.current[1](prevCount => prevCount + 1);
    });
    expect(result.current[0]).toBe(3);
  });
});
