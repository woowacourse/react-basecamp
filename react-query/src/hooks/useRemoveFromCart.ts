import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromCart } from '../api/cart';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
