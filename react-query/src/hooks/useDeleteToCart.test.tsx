// src/hooks/useAddToCart.test.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useDeleteToCart } from './useDeleteToCart';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDeleteToCart', () => {
  it('장바구니에 상품을 삭제할 수 있다', async () => {
    const { result } = renderHook(() => useDeleteToCart(), { wrapper });

    act(() => {
      result.current.mutate({ id: 3 });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ id: 3 });
  });
});
