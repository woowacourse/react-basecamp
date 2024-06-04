import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_ENDPOINTS } from '../constants/api';
import { QUERY_KEYS } from '../constants/queryKeys';

async function deleteFromCart(id: number): Promise<number> {
  const response = await fetch(`${API_ENDPOINTS.CART}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

export function useDeleteFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
