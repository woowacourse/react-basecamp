import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import useDeleteFromCart from "./useDeleteFromCart";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe("useDeleteFromCart 테스트", async () => {
  const { result } = renderHook(useDeleteFromCart, { wrapper });

  act(() => result.current.mutate(3));
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
