import { Product } from "../types";
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
