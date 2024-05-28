import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "./useProducts";

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회한다.", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it("상품 목록 조회 중 로딩 상태", () => {
      const { result } = renderHook(() => useProducts());

      expect(result.current.loading).toBe(true);
    });
  });
});
