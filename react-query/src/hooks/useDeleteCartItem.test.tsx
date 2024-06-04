import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useDeleteCartItem } from "./useDeleteCartItem.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useDeleteCartItem", () => {
  it("장바구니에서 상품을 삭제할 수 있다", async () => {
    const cartItemId = 3;

    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

     act( () => {
       result.current.mutate(cartItemId);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<string>(`${cartItemId} 상품이 삭제되었습니다.`);
  });
});