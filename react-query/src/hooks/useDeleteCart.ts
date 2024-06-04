import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteToCart } from '../api/cart';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useDeleteToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteToCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
