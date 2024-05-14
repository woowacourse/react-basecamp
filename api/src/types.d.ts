interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
