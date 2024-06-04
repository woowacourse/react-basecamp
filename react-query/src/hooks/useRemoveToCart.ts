import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { removeToCart } from "../api/cart";

export function useRemoveToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
