import { Product } from '../hooks/useProducts';
import { PRODUCTS_ENDPOINT } from './endpoint';

export async function fetchProducts(page: number, limit: number): Promise<Product[]> {
  const response = await fetch(`${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`);

  if (!response.ok) throw new Error('Failed to fetch products');

  const data = await response.json();

  return data;
}
