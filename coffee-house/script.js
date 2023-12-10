// declaring variables

const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuCont = document.querySelector(".burger-menu-container");
const body = document.querySelector("body");
const menuItems = document.querySelectorAll(".menu-item");

// activating burger-menu
function openMenu(event) {
  if (event.target.closest(".burger-menu-icon") || event.target.closest("a")) {
    burgerMenu.classList.toggle("active-burger");
    burgerMenuCont.classList.toggle("active-burger");
    body.classList.toggle("no-scroll");
  }
  // deactivating burger-menu on window resize
  window.onresize = function () {
    let windowSize = window.innerWidth;
    if (windowSize > 768) {
      burgerMenu.classList.remove("active-burger");
      burgerMenuCont.classList.remove("active-burger");
      body.classList.remove("no-scroll");
    }
  };
}
burgerMenu.addEventListener("click", openMenu);

// smooth deactivating burger-menu on click on any link

for (const menuItem of menuItems) {
  menuItem.addEventListener("click", function (event) {
    burgerMenu.classList.toggle("active-burger");
    burgerMenuCont.classList.toggle("active-burger");
    body.classList.toggle("no-scroll");
  });
}
