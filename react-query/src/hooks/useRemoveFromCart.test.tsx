import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";

import { useRemoveFromCart } from "./useRemoveFromCart.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useRemoveFromCart", () => {
  it("장바구니에 상품을 삭제할 수 있다", async () => {
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    act(() => {
      result.current.mutate(2);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ id: 2 });
  });
});
