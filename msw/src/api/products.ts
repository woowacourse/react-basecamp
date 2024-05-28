import { PRODUCTS_ENDPOINT } from "./endpoints";

export async function fetchProducts(page: number) {
  const limit = page === 1 ? 20 : 4;
  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
