import { CartItem, Product } from './../types';
import { generateBasicToken } from '../utils/auth';
import SERVER_URL from '../config/serverUrl';

export async function fetchProducts(): Promise<Product[]> {
	console.log(SERVER_URL);
	const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
	const response = await fetch(`${SERVER_URL.apiUrl}/products`, {
		method: 'GET',
		headers: { Authorization: token },
	});

	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}

	const data = await response.json();
	return data.content;
}

export async function fetchCartItems(): Promise<CartItem[]> {
	const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
	const response = await fetch(`${SERVER_URL.apiUrl}/cart-items`, {
		method: 'GET',
		headers: { Authorization: token },
	});

	if (!response.ok) {
		throw new Error('Failed to fetch cart items');
	}

	const data = await response.json();
	return data.content;
}

export async function addCartItem(productId: number): Promise<void> {
	const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
	const response = await fetch(`${SERVER_URL.apiUrl}/cart-items`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({ productId }),
	});

	if (!response.ok) {
		throw new Error('Failed to add cart item');
	}
}

export async function removeCartItem(cartItemId: number): Promise<void> {
	const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
	const response = await fetch(`${SERVER_URL.apiUrl}/cart-items/${cartItemId}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to remove cart item');
	}
}
