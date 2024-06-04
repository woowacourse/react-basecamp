export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}
