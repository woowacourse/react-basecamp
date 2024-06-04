import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromCart } from "../api/cart";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useDeleteFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
