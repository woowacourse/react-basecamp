import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteFromCart } from "../apis/carts";
import { QUERY_KEYS } from "../constants/api";

const useDeleteFromCart = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.CART],
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};

export default useDeleteFromCart;
