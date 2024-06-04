import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import MOCK_PRODUCTS from "../mocks/products.json";
import { useProducts } from "./useProducts";
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe("useProducts", () => {
  it("상품 목록을 가져올 수 있다.", async () => {
    const { result } = renderHook(useProducts, { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(MOCK_PRODUCTS);
  });
});
