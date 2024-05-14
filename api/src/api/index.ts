import { Product } from '../types';
import { generateBasicToken } from '../utils/auth';


export async function fetchProducts(): Promise<Product[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.content;
}
