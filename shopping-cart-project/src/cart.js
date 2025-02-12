import { shopItemsData } from "../src/products.js";
import { updateCartCount, addEventListeners } from "../src/script.js";
import { getBasket, updateBasket } from "./basket.js";

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

export function generateCartItems() {
  let basket = getBasket();

  if (!shoppingCart) return;

  if (basket.length === 0) {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="./index.html">
        <button class="homeBtn">Back to home</button>
      </a>`;
    return;
  }

  shoppingCart.innerHTML = basket
    .map(({ id, item }) => {
      let product = shopItemsData.find((p) => p.id === id) || {};
      let {img , name , price} = product ; 
      return `
      <div class="cart-item" id="cart-item-${id}">
        <img width='100' src="${img}" alt="">
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">${price} $</p>
            </h4>
            <i class="fa-solid fa-xmark remove-btn" data-id="${id}"></i>
          </div>
          <div class="buttons">
            <i data-id="${id}" class="fa-solid fa-minus decrement-btn"></i>
            <div id="quantity-${id}" class="quantity">${item}</div>
            <i data-id="${id}" class="fa-solid fa-plus increment-btn"></i>
          </div>

          <h3>${item * price} $</h3>
        </div>  
      </div>`;
    })
    .join("");

  addEventListeners();
  setupRemoveButtons();
}

// Add event listeners for remove buttons
function setupRemoveButtons() {
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      let selectedItemId = event.target.dataset.id;
      let basket = getBasket().filter((item) => item.id !== selectedItemId);
      updateBasket(basket);
      generateCartItems();
      totalAmount();
      updateCartCount();
    });
  });
}

export function totalAmount() {
  if (!shoppingCart) return;
  let basket = getBasket();
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { item, id } = x;
      let product = shopItemsData.find((p) => p.id === id) || {};
      return item * product.price;
    }).reduce((total, item) => total + item, 0);
    label.innerHTML = `
     <h2>Total Bill : ${amount} $</h2>
     <button class="checkout">Checkout</button>
     <button class="remove-all">Clear Cart</button>
     `;
    let removeAllC = document.querySelector('.remove-all');
    removeAllC.addEventListener('click', clearCart);
  } else return;
}

function clearCart() {
  updateBasket([]); // Clear the basket
  generateCartItems();
  totalAmount();
  updateCartCount();
}

totalAmount();
generateCartItems();
updateCartCount();



