"use strict";

const headerToggleBtn = document.querySelector(".header__toggleBtn");
const body = document.body;
const signUpBtn = document.querySelector(".header__signUpBtn");
const modalContainer = document.querySelector(".modalContainer");
const modalCloseBtn = document.querySelector(".modal__closeBtn");

headerToggleBtn.addEventListener("click", (e) => {
  body.classList.toggle("active");
});

function closeNavBar(e) {
  const target = e.target;
  if (
    target.nodeName === "BUTTON" ||
    target.nodeName === "I" ||
    target.nodeName === "NAV"
  ) {
    return;
  } else {
    body.classList.remove("active");
  }
}

body.addEventListener("click", closeNavBar);

signUpBtn.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

modalCloseBtn.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});

window.addEventListener("click", (e) => {
  e.target === modalContainer ? modalContainer.classList.remove("show") : false;
});
