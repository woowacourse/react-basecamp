import { Product } from "../types";
import React from "react";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} width={100} />
            {product.name} - {product.price}원
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
