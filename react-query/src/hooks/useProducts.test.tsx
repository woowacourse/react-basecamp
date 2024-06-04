import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { renderHook, waitFor } from '@testing-library/react';
import { Product, useProducts } from './useProducts';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe('useProducts', () => {
  it('상품 목록을 가져올 수 있다.', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual<Product[]>([
      {
        id: 1,
        name: 'Product 1',
        price: 10000,
        category: 'fashion',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20000,
        category: 'fashion',
      },
    ]);
  });
});
