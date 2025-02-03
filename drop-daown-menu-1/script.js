const navMenu = document.getElementById('nav-menu'),
toggleMenu = document.getElementById('toggle-menu'),
closeMenu = document.getElementById('close-menu'),
dropdownNav = document.querySelector('.dropdown'),
megaMenu = document.querySelector('.megamenu'),
dropDownIcon = document.querySelector('.dropdown__icon');

toggleMenu.addEventListener('click' , ()=>{
  navMenu.classList.toggle('show__menu');
})

closeMenu.addEventListener('click' , ()=>{
  navMenu.classList.remove('show__menu');
})

dropdownNav.addEventListener('click' , ()=>{
  megaMenu.classList.toggle('active');
  dropDownIcon.classList.toggle('active');
})
