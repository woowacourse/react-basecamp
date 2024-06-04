import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('http://wooteco.com/products');

  return await response.json();
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
