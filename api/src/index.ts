import SERVER_URL from './config/serverUrl';
import { Product } from './types';
import { generateBasicToken } from './utils/auth';

export async function fetchProducts(): Promise<Product[]> {
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
