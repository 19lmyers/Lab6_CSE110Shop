// Script.js

window.addEventListener('DOMContentLoaded', () => {
	run();
});

async function run() {

	let json = null;

	if (window.localStorage.getItem('products') == null) {

		const response = await fetch('https://fakestoreapi.com/products');
		json = await response.json();

		window.localStorage.setItem('products', JSON.stringify(json));

	} else {
		json = JSON.parse(window.localStorage.getItem('products'));
	}


	let cart = 0;

	json.forEach(function(item) {
		document.getElementById('product-list').appendChild(new ProductItem(item))
		if (window.localStorage.getItem('item-' + item['id']) == 'true') {
			cart++;
		}
	});

	document.getElementById('cart-count').textContent = cart;
}