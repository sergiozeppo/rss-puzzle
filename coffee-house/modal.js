"use strict";
//DOM
import { data } from "./data.js";
const modalContainer = document.querySelector(".modal-container");
const closeModalButton = document.querySelector(".close-button");
const overlay = document.querySelector(".modal-overlay");
const itemImg = document.getElementById("modal-product");
const itemTitle = document.getElementById("modal-item-name");
const itemDesc = document.getElementById("modal-item-description");
const itemPrice = document.getElementById("modal-total");
let price;
const size1 = document.getElementById("size1");
const size2 = document.getElementById("size2");
const size3 = document.getElementById("size3");
const additive1 = document.getElementById("option1");
const additive2 = document.getElementById("option2");
const additive3 = document.getElementById("option3");

const sizeOptions = [
  document.getElementById("small-size"),
  document.getElementById("medium-size"),
  document.getElementById("large-size"),
];

const additiveOptions = [
  document.getElementById("additive1"),
  document.getElementById("additive2"),
  document.getElementById("additive3"),
];

function loadModal() {
  document.querySelectorAll(".item-card").forEach((card) => {
    card.addEventListener("click", function () {
      openModal(event, data);
    });
  });
}
loadModal();

// opening modal
function openModal(event, data) {
  document.querySelector("body").classList.toggle("no-scroll");
  modalContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
  let title = getTitle(event);
  let product = findProduct(title, data);
  fillModal(product, modalContainer);
}

// find title of the clicked card
function getTitle(event) {
  let card = event.target.closest(".item-card");
  let title = card.querySelector(".item-tit").textContent;
  return title;
}

// finding product
function findProduct(title, array) {
  let product = array.find((obj) => {
    if (obj.name === title) {
      return title;
    }
  });
  console.log(product);
  return product;
}

// filling template
function fillModal(obj, modal) {
  itemTitle.textContent = obj.name;
  itemDesc.textContent = obj.description;
  itemImg.src =
    `./img/menu/${obj.name.toLowerCase().split(" ").join("-")}` + ".png";
  itemPrice.textContent = `$${obj.price}`;
  price = Number(obj.price);
  itemPrice.setAttribute("price", obj.price);
  size1.textContent = obj.sizes.s.size;
  size2.textContent = obj.sizes.m.size;
  size3.textContent = obj.sizes.l.size;
  additive1.textContent = obj.additives[0].name;
  additive2.textContent = obj.additives[1].name;
  additive3.textContent = obj.additives[2].name;

  document
    .querySelectorAll(".size")
    .forEach((btn) => btn.addEventListener("click", updateSizes, false));
  document
    .querySelectorAll(".additive")
    .forEach((btn) => btn.addEventListener("click", updateAddivities, false));
}

// updating sizes
function updateSizes() {
  document
    .querySelectorAll(".size")
    .forEach((btn) => btn.classList.remove("modal-tab-item-active"));
  this.classList.add("modal-tab-item-active");
  updateModal();
}

// updating additives
function updateAddivities() {
  this.classList.toggle("modal-tab-item-active");
  updateModal();
}

// updating modal prices
function updateModal() {
  let sizesPrice = 0;
  document.querySelectorAll(".size").forEach((btn) => {
    if (btn.classList.contains("modal-tab-item-active")) {
      sizesPrice += Number.parseFloat(btn.dataset.addPrice);
    }
  });

  let addivitiesPrice = 0;
  document.querySelectorAll(".additive").forEach((btn) => {
    if (btn.classList.contains("modal-tab-item-active")) {
      addivitiesPrice += Number.parseFloat(btn.dataset.addPrice);
    }
  });
  let finalPrice = price + sizesPrice + addivitiesPrice;
  itemPrice.textContent = `$${finalPrice.toFixed(2)}`;
}

// closing and clearing modal
function closeModal(event) {
  if (event.target === closeModalButton || event.target === overlay) {
    modalContainer.classList.add("hidden");
    overlay.classList.add("hidden");
    document.querySelector("body").classList.toggle("no-scroll");
    itemTitle.textContent = "";
    itemDesc.textContent = "";
    itemImg.src = "";
    itemPrice.textContent = "";
    price = "";
    size1.textContent = "";
    size2.textContent = "";
    size3.textContent = "";
    additive1.textContent = "";
    additive2.textContent = "";
    additive3.textContent = "";
    sizeOptions.forEach((size, i) => {
      size.classList.remove("modal-tab-item-active");
    });
    document
      .getElementById("small-size")
      .classList.add("modal-tab-item-active");
    additiveOptions.forEach((additive) => {
      additive.classList.remove("modal-tab-item-active");
    });
  }
}

modalContainer.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
