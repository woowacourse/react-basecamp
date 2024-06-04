import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../constants/api";
import { QUERY_KEYS } from "../constants/queryKeys";

async function deleteToCart(id: number) {
  const response = await fetch(`${API_ENDPOINTS.CART}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export function useDeleteToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
}
