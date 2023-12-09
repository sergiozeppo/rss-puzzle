// activating burger-menu
const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuCont = document.querySelector(".burger-menu-container");
const body = document.querySelector("body");
let windowSize = window.innerWidth;
function openMenu(event) {
  if (event.target.closest(".burger-menu-icon")) {
    burgerMenu.classList.toggle("active-burger");
    burgerMenuCont.classList.toggle("active-burger");
    body.classList.toggle("no-scroll");
  }
}
burgerMenu.addEventListener("click", openMenu);
