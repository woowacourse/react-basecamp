import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeleteCartItem } from "./useDeleteCartItem";
import { CartItem, Product } from "../types";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useDeleteCartItem에 대한 테스트 코드 작성", () => {
  it("장바구니에 상품을 삭제할 수가 있다.", async () => {
    const { result } = renderHook(() => useDeleteCartItem(), { wrapper });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
