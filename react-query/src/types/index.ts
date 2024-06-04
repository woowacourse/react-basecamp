// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface CartItem {
  cartItemId: number;
  productId: number;
  quantity: number;
}
