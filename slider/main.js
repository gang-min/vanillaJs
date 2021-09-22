"use strict";
const sliderWrapper = document.querySelector(".container");
const sliderContainer = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const slideCount = slides.length;
let currentIndex = 0;
let topHeight = 0;
const navPrev = document.querySelector(".prev");
const navNext = document.querySelector(".next");

function calculateTallestSlide() {
  for (let i = 0; i < slideCount; i++) {
    if (slides[i].offsetHeight > topHeight) {
      topHeight = slides[i].offsetHeight;
    }
  }

  sliderWrapper.style.height = `${topHeight}px`;
  sliderContainer.style.height = `${topHeight}px`;
}
calculateTallestSlide();

for (let i = 0; i < slideCount; i++) {
  slides[i].style.left = `${i * 100}%`;
}

function goToSlide(index) {
  sliderContainer.style.left = `${index * -100}%`;
  sliderContainer.classList.add("animated");
  currentIndex = index;

  // updateNav();
}

function updateNav() {
  if (currentIndex === 0) {
    navPrev.classList.add("disabled");
  } else {
    navPrev.classList.remove("disabled");
  }

  if (currentIndex === slides.length - 1) {
    navNext.classList.add("disabled");
  } else {
    navNext.classList.remove("disabled");
  }
}

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
next.addEventListener("click", () => {
  // goToSlide(currentIndex + 1);
  if (currentIndex !== slides.length - 1) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
});

prev.addEventListener("click", () => {
  // goToSlide(currentIndex - 1);
  if (currentIndex !== 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(slides.length - 1);
  }
});

// goToSlide(0);
