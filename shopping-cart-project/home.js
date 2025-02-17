import { products } from "./data/products.js";
import { priceChange } from "./data/mony.js";
import { cartItems , addProductCart } from "./data/cart.js";
const productsContainer = document.querySelector(".products-container");

function home() {
  function generateP() {
    products.forEach((product) => {
      const { id, name, des, priceCent, img } = product;
      const productDiv = document.createElement("div");
      productDiv.classList.add("product", `product-${id}`);
      productDiv.innerHTML = `
        <img src="${img}"/>
        <div class="des-box">
          <h1>${name}</h1>
          <div class="des-sec">
            <p class="text">${des}</p>
          </div>
          <div class="cost-sec">
            <div class="price">$ ${priceChange(priceCent)}</div>
            <div class="add add-${id}">
              <select id="count-${id}">
                    ${[...Array(100)]
                      .map(
                        (_, i) =>
                          `<option value=" ${i + 1}"> ${i + 1} </option>`
                      )
                      .join("")} 
              </select>
              <button class="add-item ${id}">Add</button>
            </div>
          </div>
        </div>
      `;
      productsContainer.appendChild(productDiv);
    });
  }

  generateP();

  function getQuantity(){
    
    document.querySelectorAll("button")
    .forEach((button)=>{
      button.addEventListener('click' , (event)=>{
        const productId = event.target.classList[1];
        const selectElement = document.getElementById(`count-${productId}`);
        const quantity = selectElement.value ; 

        // Now , I can push this data to localStorage for the order page . 

        addProductCart(productId , quantity);
      })
    })
  }

  getQuantity();



}

home();
