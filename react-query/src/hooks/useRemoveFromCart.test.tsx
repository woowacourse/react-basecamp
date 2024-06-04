import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useRemoveFromCart } from './useRemoveFromCart';
import { act } from 'react';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRemoveFromCart', () => {
  it('장바구니에서 상품을 제거할 수 있다', async () => {
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    act(() => {
      result.current.mutate(2);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      {
        id: 1,
        name: 'Product 1',
        price: 10000,
        category: 'fashion',
      },
    ]);
  });
});
