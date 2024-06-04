import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "./useProducts";
import { Product } from "../types";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useProducts", () => {
  it("상품 목록을 가져올 수 있다", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<Product[]>([
      {
        id: 1,
        name: "Product 1",
        price: 10000,
        category: "fashion",
      },
      {
        id: 2,
        name: "Product 2",
        price: 20000,
        category: "fashion",
      },
    ]);
  });
});
