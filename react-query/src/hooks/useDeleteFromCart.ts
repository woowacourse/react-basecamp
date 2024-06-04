import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromCart } from "../api/cart";

export function useDeleteFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
