// src/api/products.ts
import { Product } from '../types';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('http://woteco.com/products');
  return await response.json();
}
