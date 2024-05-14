import { CartItem, Product } from "../types";

import { generateBasicToken } from "../utils/auth";

const API_URL = "http://api-url.com";
const USER_ID = "username";
const USER_PASSWORD = "password";

// fetchProducts 함수는 상품 목록 데이터를 가져오는 비동기 함수입니다.
export async function fetchProducts(): Promise<Product[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.content;
}

// fetchCartItems 함수는 장바구니 데이터를 가져오는 비동기 함수입니다.
export async function fetchCartItems(): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const data = await response.json();
  return data.content;
}

// addCartItem 함수는 장바구니에 상품을 추가하는 비동기 함수입니다.
export async function addCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add cart item");
  }
}

// removeCartItem 함수는 장바구니에서 상품을 삭제하는 비동기 함수입니다.
export async function removeCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
}
