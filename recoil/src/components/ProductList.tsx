import React from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "../recoil/selectors";
import styled from "styled-components";

import CartItem from "./CartItem";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

function ProductList() {
  const products = useRecoilValue(productsState);

  if (products.length === 0) {
    return <div>상품이 없습니다.</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>상품명</TableHeader>
            <TableHeader>설명</TableHeader>
            <TableHeader>가격</TableHeader>
            <TableHeader>수량</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}원</TableCell>
              <TableCell>
                <CartItem item={product} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
