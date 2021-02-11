// product-item.js

class ProductItem extends HTMLElement {

	constructor(item) {
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: 'open'});

		// Apply external styles to the shadow dom
		const linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', 'styles/styles.css');

		const product = document.createElement('li');
		product.setAttribute('class', 'product')

		const image = document.createElement('img');
		image.setAttribute('width', '400');
		image.src = item['image'];

		const title = document.createElement('p');
		title.setAttribute('class', 'title');
		title.textContent = item['title'];

		const price = document.createElement('p');
		price.setAttribute('class', 'price');
		price.textContent = item['price']

		const button = document.createElement('button');

		if (window.localStorage.getItem('item-' + item['id']) == 'true') {
			button.textContent = 'Remove From Cart';
		} else {
			button.textContent = 'Add To Cart';
		}

		button.onclick = function() { 
			if (window.localStorage.getItem('item-' + item['id']) == 'true') {
				window.localStorage.setItem('item-' + item['id'], 'false');
				button.textContent = 'Add To Cart';
				document.getElementById('cart-count').textContent = parseInt(document.getElementById('cart-count').textContent) - 1;
			} else {
				window.localStorage.setItem('item-' + item['id'], 'true');
				button.textContent = 'Remove From Cart';
				document.getElementById('cart-count').textContent = parseInt(document.getElementById('cart-count').textContent) + 1;
			}
		}

		product.appendChild(image);
		product.appendChild(title);
		product.appendChild(price);
		product.appendChild(button);

		shadow.appendChild(linkElem);
		shadow.appendChild(product);
	}

}

customElements.define('product-item', ProductItem);