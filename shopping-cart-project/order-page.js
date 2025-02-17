import { products } from "./data/products.js";
import { cartItems, addProductCart } from "./data/cart.js";
const cartSec = document.querySelector(".cart-sec");
const paySec = document.querySelector(".pay-sec");

function generateCart() {
  cartItems.forEach((cart) => {
    const matchedId = products.find((product) => product.id === cart.id);
    const { id, name, des, priceCent, img } = matchedId;

    if (matchedId) {
      const cartBoxDiv = document.createElement("div");
        cartBoxDiv.classList.add(`cart-${id}`);
        cartBoxDiv.innerHTML = `
        
        `
        cartSec.appendChild(cartBoxDiv);
    }
  });
}

generateCart();
console.log(cartSec);