import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteToCart } from "../api/cart";
import { QUERY_KEYS } from "../constants/queryKeys";

const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}

export default useDeleteCart;
