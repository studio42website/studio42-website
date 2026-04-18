import { writable } from 'svelte/store';

// Cart store
export const cart = writable([]);

// Theme store (for future dark/light mode toggle)
export const theme = writable('dark');

// Products store
export const products = writable([
	{
		id: 'lighting-v1',
		title: 'LIGHTING-V1',
		price: 50,
		description: 'Handmade lighting object with minimal design',
		image: '/images/products/lighting-v1.jpg'
	}
]);

// Add to cart function
export function addToCart(product) {
	cart.update((items) => [...items, product]);
}

// Remove from cart
export function removeFromCart(productId) {
	cart.update((items) => items.filter((item) => item.id !== productId));
}
