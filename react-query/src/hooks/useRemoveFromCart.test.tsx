import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useRemoveFromCart } from './useRemoveFromCart';
import { CartItem } from '../types';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRemoveFromCart', () => {
  it('장바구니에 상품을 제거할 수 있다', async () => {
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    act(() => {
      result.current.mutate({ id: 2, productId: 2, quantity: 1 });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<CartItem>({
      id: 3,
      productId: 1,
      quantity: 1,
    });
  });
});
