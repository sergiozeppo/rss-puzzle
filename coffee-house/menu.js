// Implementing menu
const itemGridContainer = document.querySelector(".item-grid-container");
const tabs = document.querySelectorAll(".tab-item");
const buttonRefresh = document.querySelector(".refresh");
// fetching data from JSON
async function createProducts() {
  let answer = await fetch("products/products.json");
  const productsJSON = await answer.json();
  if (!Array.isArray(productsJSON)) {
    throw TypeError(`Products array error`);
  } else {
    loadCards(itemGridContainer, productsJSON);
  }
  loadCategory("coffee");
}
createProducts();

// creating cards
function createCard(product) {
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const category = product.category;
  const imageURL =
    "./img/menu/" + product.name.toLowerCase().split(" ").join("-") + ".png";
  const card = document.createElement("div");
  card.classList.add("item-card", "hidden");
  card.dataset.category = category;
  const divContent = `<div class="item-box">
      <img class="item-img" src="${imageURL}" alt="${name}" />
    </div>
    <div class="item-description">
      <div class="item-title">
        <h3 class="item-tit">${name}</h3>
        <h4 class="item-desc">${description}</h4>
      </div>
      <h3 class="price">$${price}</h3>
    </div>
  </div>`;
  card.insertAdjacentHTML("afterbegin", divContent);
  return card;
}

// loading cards
function loadCards(place, productsJSON) {
  productsJSON.forEach((product) => {
    place.append(createCard(product));
  });
}

// loading categories
function loadCategory(category) {
  const cardsList = document.querySelectorAll(".item-card");
  cardsList.forEach((card) => {
    if (card.dataset.category === category) {
      card.classList.remove("hidden");
      card.classList.add("smooth-appear");
    } else if (
      card.dataset.category != category &&
      !card.classList.contains("hidden")
    ) {
      card.classList.add("hidden");
      card.classList.remove("smooth-appear");
    }
  });
  hideAdaptive(toShow());
}

// implementing switch tab function
tabs.forEach((tab) => {
  tab.addEventListener("click", switchTab);
});
function switchTab(e) {
  const currentTab = e.target.closest(".tab-item");
  let category;
  tabs.forEach((tab) => {
    if (tab === currentTab) {
      tab.classList.add("tab-item-active");
      category = tab.dataset.category;
    } else if (tab.classList.contains("tab-item-active")) {
      tab.classList.remove("tab-item-active");
    }
  });
  loadCategory(category);
}

// determining all visible cards
function getVisibleCards() {
  return document.querySelectorAll(".item-card:not(.hidden)");
}

function toShow() {
  const cardsAdaptive = 4;
  const cardsDesktop = 8;
  return window.innerWidth <= 992 ? cardsAdaptive : cardsDesktop;
}

// Hide of show refresh button
function hideRefreshButton(hideCards) {
  hideCards.length > 0
    ? buttonRefresh.classList.remove("hidden")
    : buttonRefresh.classList.add("hidden");
}

// function for increasing number of cards under Adaptive design
function adaptiveCards(countCards) {
  let visibleCards = getVisibleCards();
  const category = visibleCards[0].dataset.category;
  let hideCards = document.querySelectorAll(
    `.hidden[data-category=${category}]`
  );
  while ((countCards > visibleCards.length) & (hideCards.length > 0)) {
    visibleCards = getVisibleCards();
    hideCards[0].classList.remove("hidden");
    hideCards = document.querySelectorAll(`.hidden[data-category=${category}]`);
  }
  hideCards = document.querySelectorAll(`.hidden[data-category=${category}]`);
  // calling function to decide show refresh button or not
  hideRefreshButton(hideCards);
}

// hiding cards for adaptive design
function hideAdaptive(countCards) {
  while (countCards < getVisibleCards().length) {
    const visibleCards = getVisibleCards();
    visibleCards[visibleCards.length - 1].classList.add("hidden");
  }
  const visibleCards = getVisibleCards();
  const category = visibleCards[0].dataset.category;
  let hideCards = document.querySelectorAll(
    `.hidden[data-category=${category}]`
  );
  // calling function to decide show refresh button or not
  hideRefreshButton(hideCards);
}

function increaseCards() {
  const visibleCards = getVisibleCards();
  const category = visibleCards[0].dataset.category;
  let hideCards = document.querySelectorAll(
    `.hidden[data-category=${category}]`
  );
  hideCards.forEach((card) => {
    card.classList.remove("hidden");
    card.classList.add("smooth-appear");
  });
  hideCards = document.querySelectorAll(`.hidden[data-category=${category}]`);
  hideRefreshButton(hideCards);
}

// determining adaptive screen or not
let isTablet = window.innerWidth > 768 ? false : true;

function resizeNumber() {
  if (isTablet != window.innerWidth <= 768) {
    if (!(window.innerWidth > 768 === true)) {
      hideAdaptive(4);
      isTablet = true;
    } else {
      adaptiveCards(8);
      isTablet = false;
    }
  }
}

buttonRefresh.addEventListener("click", increaseCards);
window.addEventListener("resize", resizeNumber, true);
