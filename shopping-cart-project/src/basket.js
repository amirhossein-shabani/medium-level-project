let basket = JSON.parse(localStorage.getItem("data")) || [];

export function getBasket() {
  return basket;
}

export function updateBasket(newBasket) {
  basket = newBasket;
  localStorage.setItem("data", JSON.stringify(basket));
}
