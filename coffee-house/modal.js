//DOM
const modalContainer = document.querySelector(".modal-container");
const closeModalButton = document.querySelector(".close-button");
const overlay = document.querySelector(".modal-overlay");

async function fetchJSON() {
  let answer = await fetch("products/products.json");
  const productsJSON = await answer.json();
  if (!Array.isArray(productsJSON)) {
    throw TypeError(`Products array error`);
  } else {
    document.querySelectorAll(".item-card").forEach((card) => {
      card.addEventListener("click", function () {
        openModal(event, productsJSON);
      });
    });
  }
}
fetchJSON();

function openModal(event, productsJSON) {
  document.querySelector("body").classList.toggle("no-scroll");
  modalContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal(event) {
  if (event.target === closeModalButton || event.target === overlay) {
    modalContainer.classList.add("hidden");
    overlay.classList.add("hidden");
    document.querySelector("body").classList.toggle("no-scroll");
  }
}

modalContainer.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
