import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRemoveFromCart } from './useRemoveFromCart.ts';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRemoveFromCart', () => {
  it('장바구니에서 상품을 제거할 수 있다', async () => {
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    act(() => {
      result.current.mutate(3);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
