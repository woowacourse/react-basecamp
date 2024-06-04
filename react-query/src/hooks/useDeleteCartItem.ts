import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { deleteCartItem } from "../api/cart";

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCartItem(id),
    onSuccess: (id: number) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DELETE_CART(id)] });
    },
  });
}
