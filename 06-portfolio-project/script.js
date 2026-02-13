function togglemenu(){
 const menu = document.querySelector('.js-menu-links');
 const icon = document.querySelector('.js-hamburger-icon');
 menu.classList.toggle('open');
 icon.classList.toggle('open');
}