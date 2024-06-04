import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { useDeleteToCart } from './useDeleteCart';
import { useAddToCart } from './useAddCart';
import { CartItem } from '../types';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe('useDeleteToCart', () => {
  it('장바구니에 상품을 삭제할 수 있다.', async () => {
    const { result } = renderHook(
      () => {
        const addCart = useAddToCart();
        const deleteCart = useDeleteToCart();

        return { addCart, deleteCart };
      },
      { wrapper },
    );

    act(() => {
      result.current.addCart.mutate({ id: 3, productId: 1, quantity: 1 });
    });

    await waitFor(() => expect(result.current.addCart.isSuccess).toBe(true));

    expect(result.current.addCart.data).toEqual<CartItem>({
      id: 3,
      productId: 1,
      quantity: 1,
    });

    act(() => {
      result.current.deleteCart.mutate(3);
    });

    await waitFor(() => expect(result.current.deleteCart.isSuccess).toBe(true));
  });
});
