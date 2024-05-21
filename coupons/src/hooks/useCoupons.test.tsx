import { renderHook } from '@testing-library/react';
import { useCoupons } from './useCoupons';
import { RecoilRoot } from 'recoil';
import { couponState } from '../recoil/atom';
import { mockCoupons } from '../mocks/coupons';

describe('useCoupons', () => {
  it('쿠폰 목록을 반환한다.', () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => <RecoilRoot initializeState={({ set }) => set(couponState, mockCoupons)}>{children}</RecoilRoot>,
    });

    expect(result.current.coupons).toBeDefined();
    expect(result.current.coupons.length).toBe(4);
  });
});
