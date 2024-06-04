import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { addToCart } from "../api/carts";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
