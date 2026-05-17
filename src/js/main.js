import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./utils.mjs";

// create a ProductData instance for the tents category
const dataSource = new ProductData("tents");

// find the list container in the DOM and render the products
const listElement = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, listElement);
productList.init();

// initialize cart count badge on page load
updateCartCount();

