import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useDeleteFromCart from "./useDeleteFromCart.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddToCart", () => {
  it("장바구니에 상품을 제거할 수 있다", async () => {
    const { result } = renderHook(() => useDeleteFromCart(), { wrapper });
    const CART_ID = "3";

    act(() => {
      result.current.mutate(CART_ID);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log(result.current.data);
    expect(result.current.data).toEqual({ cartId: CART_ID });
  });
});
