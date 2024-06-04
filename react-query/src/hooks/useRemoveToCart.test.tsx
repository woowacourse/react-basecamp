// src/hooks/useAddToCart.test.tsx
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useRemoveToCart } from './useRemoveToCart';

import MOCK_DATA from '../mocks/products.json';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRemoveToCart', () => {
  it('장바구니에 상품을 제거 할 수 있다', async () => {
    const { result } = renderHook(() => useRemoveToCart(), { wrapper });

    act(() => {
      result.current.mutate(MOCK_DATA[0].id);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(Number(result.current.data?.id)).toBe(MOCK_DATA[0].id);
  });
});
