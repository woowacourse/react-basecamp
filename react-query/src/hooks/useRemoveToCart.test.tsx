import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRemoveToCart } from "./useRemoveToCart";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useRemoveToCart", () => {
  it("장바구니에서 상품을 삭제할 수 있다", async () => {
    const { result } = renderHook(() => useRemoveToCart(), { wrapper });

    act(() => {
      result.current.mutate(3);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
