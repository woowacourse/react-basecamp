export const API_BASE_URL = "http://woteco.com";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  CART: `${API_BASE_URL}/cart`,
  DELETE_CART_ITEMS: (id: number) => `${API_BASE_URL}/cart-items/${id}`,
};

// /cart-items/{id}
