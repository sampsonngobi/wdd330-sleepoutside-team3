import { renderListWithTemplate } from "./utils.mjs";



export default class ProductList {
    constructor(category, dataSource, listelement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listelement;
    }

    async init() {
        // use the datasource to get the products for the current category
        // allow dataSource.getData() to be a promise
        const list = await this.dataSource.getData();
        this.products = list || [];

        // render using the reusable utility; clear existing contents and append
        renderListWithTemplate(productCardTemplate, this.listElement, this.products, "beforeend", true);
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}