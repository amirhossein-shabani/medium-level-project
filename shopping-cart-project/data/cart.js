export const cartItems = JSON.parse(localStorage.getItem("carts")) || [];

export function addProductCart(id , quantity){

  quantity = parseInt(quantity , 10); //Ensure quantity is a number
  
  const existingProducts = cartItems.find(item => item.id === id);

  if(existingProducts){
    existingProducts.quantity +=quantity;
  }else{
    cartItems.push({id , quantity});
  }

  localStorage.setItem('carts' , JSON.stringify(cartItems))
}