import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToCart } from "../apis/carts";
import { QUERY_KEYS } from "../constants/api";

const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CART],
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};

export default useAddToCart;
