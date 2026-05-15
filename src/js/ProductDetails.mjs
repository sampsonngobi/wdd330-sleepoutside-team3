import { qs, getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        if (!this.productId) {
            console.warn('No product ID provided in URL.');
            return;
        }

        // use the datasource to get the details for the current product
        this.product = await this.dataSource.findProductById(this.productId);

        if (!this.product) {
            console.error(`Product not found: ${this.productId}`);
            return;
        }

        // the product details are needed before rendering the HTML
        this.renderProductDetails();

        // once the HTML is rendered, add a listener to the Add to Cart button
        const buttonEl = document.getElementById('addToCart');
        if (buttonEl) {
            buttonEl.addEventListener('click', this.addProductToCart.bind(this));
        }
    }

    addProductToCart() {
        if (!this.product || !this.product.Id) return;

        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }

    renderProductDetails() {
        const brandEl = qs('.product-detail h3');
        const nameEl = qs('.product-detail h2');
        const imageEl = qs('.product-detail img');
        const priceEl = qs('.product-card__price');
        const colorEl = qs('.product__color');
        const descEl = qs('.product__description');
        const buttonEl = qs('#addToCart');

        if (brandEl) {
            brandEl.textContent = this.product.Brand?.Name || '';
        }
        if (nameEl) {
            nameEl.textContent = this.product.Name || '';
        }
        if (imageEl) {
            imageEl.src = this.product.Image || imageEl.src;
            imageEl.alt = this.product.Name || imageEl.alt;
        }
        if (priceEl) {
            priceEl.textContent = this.product.FinalPrice != null ? `$${this.product.FinalPrice.toFixed(2)}` : '';
        }
        if (colorEl) {
            colorEl.textContent = this.product.Colors?.[0]?.ColorName || '';
        }
        if (descEl) {
            descEl.innerHTML = this.product.DescriptionHtmlSimple || '';
        }
        if (buttonEl) {
            buttonEl.dataset.id = this.product.Id || '';
        }
    }
}
