import { shopItemsData } from "../src/products.js";
import { generateCartItems  , totalAmount} from "./cart.js";
import { getBasket, updateBasket } from "./basket.js";

let shop = document.getElementById("shop");

if (shop) {
  function generateShop() {
    let basket = getBasket();
    
    shop.innerHTML = shopItemsData
      .map(({ id, name, price, desc, img }) => {
        let itemInBasket = basket.find((x) => x.id === id);
        let quantity = itemInBasket ? itemInBasket.item : 0;
        
        return `
        <div id="product-id-${id}" class="item">
          <img width="225" src="${img}" alt="img">
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>${price} $</h2>
              <div class="buttons">
                <i data-id="${id}" class="fa-solid fa-minus decrement-btn"></i>
                <div id="quantity-${id}" class="quantity">${quantity}</div>
                <i data-id="${id}" class="fa-solid fa-plus increment-btn"></i>
              </div>
            </div>
          </div>
        </div>`;
      })
      .join("");

    addEventListeners();
  }
  
  generateShop();
}

// Add event listeners for increment and decrement buttons
export function addEventListeners() {
  document.querySelectorAll(".decrement-btn").forEach((button) => {
    button.addEventListener("click", handleDecrement);
  });

  document.querySelectorAll(".increment-btn").forEach((button) => {
    button.addEventListener("click", handleIncrement);
  });
}

// Handle decrement event
function handleDecrement(event) {
  let selectedItemId = event.target.dataset.id;
  let basket = getBasket();
  let itemIndex = basket.findIndex((x) => x.id == selectedItemId);

  if (itemIndex !== -1) {
    basket[itemIndex].item -= 1;

    if (basket[itemIndex].item === 0) {
      basket.splice(itemIndex, 1); // Remove item if quantity is 0
    }

    updateBasket(basket);
    updateUI(selectedItemId);
    generateCartItems();
  }
}

// Handle increment event
function handleIncrement(event) {
  let selectedItemId = event.target.dataset.id;
  let basket = getBasket();
  let search = basket.find((x) => x.id == selectedItemId);

  if (search) {
    search.item += 1;
  } else {
    basket.push({ id: selectedItemId, item: 1 });
  }

  updateBasket(basket);
  updateUI(selectedItemId);
  generateCartItems();
}

// Update quantity display
function updateUI(id) {
  let basket = getBasket();
  let item = basket.find((x) => x.id == id);
  let quantityElement = document.getElementById(`quantity-${id}`);
  
  if (quantityElement) {
    quantityElement.innerHTML = item ? item.item : 0;
  }
  
  
  totalAmount();
  updateCartCount();
}

// Update cart count on navbar
export function updateCartCount() {
  let basket = getBasket();
  let cartIcon = document.getElementById("cartAmount");
  
  if (cartIcon) {
    cartIcon.innerHTML = basket.reduce((total, item) => total + item.item, 0);
  }
}

updateCartCount();
