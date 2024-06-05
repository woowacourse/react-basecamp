// src/hooks/useAddToCart.test.tsx
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteCartItem } from "./useDeleteCartItem.ts";
import { CartItem } from "../types/index.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useDeleteCartItem", () => {
  it("장바구니에 있는 상품을 삭제할 수 있다", async () => {
    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

    act(() => {
      result.current.mutate(3);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      message: `product 3 deleted`,
    });
  });
});
