import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
//   cartItems.push(product);
//   setLocalStorage("so-cart", cartItems);
// }

function addProductToCart(product) {
  if (!product) return;

  const cartItems = getLocalStorage("so-cart") || [];

  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

async function addToCartHandler(e) {
  console.log(e.currentTarget.dataset.id);

  const product = await dataSource.findProductById(e.currentTarget.dataset.id);

  console.log(product);

  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
