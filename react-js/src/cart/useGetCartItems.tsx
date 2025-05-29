import { useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  id: number;
  product: Product;
};

export function useGetCartItems() {
  const [cartItems] = useState<CartItem[]>([
    { id: 1, product: { id: 1, name: "Product 1", price: 100 } },
    { id: 2, product: { id: 2, name: "Product 2", price: 200 } },
  ]);

  return cartItems;
}
