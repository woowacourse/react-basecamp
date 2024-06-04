import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartItem } from "../types/index.ts";
import { useDeleteToCart } from "./useDeleteToCart.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddToCart", () => {
  it("장바구니에 상품을 제거할 수 있다", async () => {
    const { result } = renderHook(() => useDeleteToCart(), { wrapper });

    act(() => {
      result.current.mutate({ id: 3 });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<CartItem>(3);
  });
});
