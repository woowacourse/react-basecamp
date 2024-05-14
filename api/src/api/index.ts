import { Product } from "../types";
import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_BASE_URL;
const USER_ID = import.meta.env.VITE_USER_NAME;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD;

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
