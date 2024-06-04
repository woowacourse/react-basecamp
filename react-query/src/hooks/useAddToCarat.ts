import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api/cart";

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    //성공 시 쿼리 무효화를 사용해 최신 데이터 가져오게 함.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
