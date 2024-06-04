import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRemoveFromCart } from "./useRemoveFromCart.ts";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useRemoveFromCart", () => {
  beforeEach(() => {});

  it("장바구니에서 상품을 제거할 수 있다", async () => {
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    const DELETE_ITEM_ID = 3;

    act(() => {
      result.current.mutate(DELETE_ITEM_ID);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      deletedItemId: DELETE_ITEM_ID,
    });
  });
});
