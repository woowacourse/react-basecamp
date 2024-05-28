import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import useProducts from "./useProducts";

import { PRODUCTS_ENDPOINT } from "../api/endpoints";

import { server } from "../mocks/server";
import { act } from "react";

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 정상적으로 조회한다.", async () => {
      const EXPECTED_PRODUCTS_LENGTH = 20;

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(EXPECTED_PRODUCTS_LENGTH);
      });
    });

    it("상품 목록 조회 중 로딩 상태", () => {
      const { result } = renderHook(() => useProducts());

      expect(result.current.loading).toBeTruthy();
    });

    it("상품 목록 조회 중 에러 상태", async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe("페이지네이션", () => {
    it("초기에 첫 페이지의 상품 20개를 불러온다", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(1);
      });
    });

    it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(1);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      const EXPECTED_INITIAL_PRODUCTS_LENGTH = 20;
      const ADDITIONAL_PRODUCT_LENGTH_PER_REQUEST = 4;
      const EXPECTED_NEXT_PAGE = 2;

      const EXPECTED_PRODUCTS_LENGTH =
        EXPECTED_INITIAL_PRODUCTS_LENGTH +
        ADDITIONAL_PRODUCT_LENGTH_PER_REQUEST;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(EXPECTED_PRODUCTS_LENGTH);
        expect(result.current.page).toBe(EXPECTED_NEXT_PAGE);
      });
    });

    it("모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      for (let i = 2; i < 22; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = 20 + (i - 1) * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.page).toBe(i);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
        expect(result.current.page).toBe(21);
      });
    });
  });
});
