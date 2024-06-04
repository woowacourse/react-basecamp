import { PRODUCTS_ENDPOINT } from './endpoints';

export async function fetchProducts(page: number) {
  const response = await fetch(`${PRODUCTS_ENDPOINT}?page=${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;
}
