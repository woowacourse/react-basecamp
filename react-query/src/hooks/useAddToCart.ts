import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { addToCart } from "../api/cart";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}

/**
 * useMutation이 반환하는 값
    {
      context: undefined,
      data: { id: 3, productId: 1, quantity: 1 },
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      status: 'success',
      variables: { id: 3, productId: 1, quantity: 1 },
      submittedAt: 1717470008576,
      isPending: false,
      isSuccess: true,
      isError: false,
      isIdle: false,
      mutate: [Function (anonymous)],
      reset: [Function: bound reset],
      mutateAsync: [Function: bound mutate]
    }
   */
