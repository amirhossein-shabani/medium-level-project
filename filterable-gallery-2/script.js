let searchBox = document.querySelector('#search-box');
let images = document.querySelectorAll('.container .image-container .image');

searchBox.oninput = () =>{
  let value = searchBox.value;
 images.forEach(image => image.style.display = 'none');
 images.forEach(image =>{
  let title = image.getAttribute('data-title');
  if(value == title){
    image.style.display = 'block' ; 
  }
  if(searchBox.value == ''){
    image.style.display = 'block'
  }
 })
}
