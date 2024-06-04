import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CartItem } from '../types';
import { API_ENDPOINTS } from '../constants/api';
import { QUERY_KEYS } from '../constants/queryKeys';

async function removeToCart(item: CartItem): Promise<CartItem> {
	const response = await fetch(API_ENDPOINTS.CART, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});

	return await response.json();
}

export function useRemoveToCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
		},
	});
}
