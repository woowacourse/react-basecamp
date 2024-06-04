import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useDeleteToCart } from './useDeleteToCart';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDeleteToCart', () => {
  it('장바구니에 상품을 삭제 할 수 있다', async () => {
    const { result } = renderHook(() => useDeleteToCart(), { wrapper });

    // 삭제
    act(() => {
      result.current.mutate(3);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
