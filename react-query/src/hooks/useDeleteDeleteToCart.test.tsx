// src/hooks/useAddToCart.test.tsx
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeleteToCart } from './useDeleteDeleteToCart.ts';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAddToCart', () => {
  it('장바구니에 상품을 삭제할 수 있다', async () => {
    const { result } = renderHook(() => useDeleteToCart(), { wrapper });

    act(() => {
      result.current.mutate(10);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<string>('삭제되었습니다.10');
  });
});
