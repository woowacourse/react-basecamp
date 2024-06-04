import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { CartItem } from "../types";
import useAddToCart from "./useAddToCart";
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe("useAddToCart 테스트", () => {
  it("장바구니에 상품을 추가할 수 있다.", async () => {
    const { result } = renderHook(useAddToCart, { wrapper });
    const CART_ITEM_TO_POST: CartItem = {
      id: 3,
      productId: 1,
      quantity: 1,
    };

    act(() => {
      result.current.mutate(CART_ITEM_TO_POST);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(CART_ITEM_TO_POST);
  });
});
