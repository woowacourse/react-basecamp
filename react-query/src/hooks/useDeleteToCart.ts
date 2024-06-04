import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { deleteToCart } from "../api/cart";

export function useDeleteToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
