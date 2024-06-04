import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '../api/cart';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
