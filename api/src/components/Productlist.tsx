import React from "react";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} width={100} />
            {product.name} - {product.price}원
            <button onClick={() => onAddToCart(product.id)}>
              장바구니에 추가
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
