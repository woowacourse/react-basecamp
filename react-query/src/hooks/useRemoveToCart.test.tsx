import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartItem } from '../types/index.ts';
import { useRemoveToCart } from './useRemoveToCart';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRemoveToCart', () => {
	it('장바구니에 상품을 삭제할 수 있다', async () => {
		const { result } = renderHook(() => useRemoveToCart(), { wrapper });

		act(() => {
			result.current.mutate({ id: 3, productId: 1, quantity: 1 });
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual<CartItem>({
			id: 3,
			productId: 1,
			quantity: 1,
		});
	});
});
