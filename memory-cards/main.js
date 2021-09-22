const cardsContainer = document.querySelector(".cards-container");
const cardsWrapper = document.querySelector(".cards");
const front = document.querySelectorAll(".inner-card__front");
const back = document.querySelectorAll(".inner-card__back");

const cards = document.querySelectorAll(".card");
const cardsCount = cards.length;
let currentIndex = 0;

const prevBtn = document.querySelector(".nav__prev");
const nextBtn = document.querySelector(".nav__next");

const navCurrent = document.querySelector(".nav__current");

// 카드 뒤집기
cardsContainer.addEventListener("click", () => {
  cards[currentIndex].classList.toggle("flip");
  front[currentIndex].classList.toggle("show-answer");
  back[currentIndex].classList.toggle("show-answer");
});

// cards position 미리 잡아 놓기
function cardPosition() {
  for (let i = 0; i < cardsCount; i++) {
    cards[i].style.left = `${i * 100}%`;
  }
}
cardPosition();

// navCurrent 변경
function navCurrentInnerText() {
  navCurrent.innerText = `${currentIndex + 1} / ${cardsCount}`;
}

navCurrentInnerText();

// slide 이동
function goToSlide(index) {
  cardsWrapper.style.left = `${index * -100}%`;
  cardsWrapper.classList.add("animated");
  currentIndex = index;
  navCurrentInnerText();
}

nextBtn.addEventListener("click", () => {
  if (currentIndex !== cardsCount - 1) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex !== 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(cardsCount - 1);
  }
});

// add new card
const addBtn = document.querySelector(".addBtn");
const addContainer = document.querySelector(".add-container");
const closeBtn = document.querySelector(".closeBtn");

addBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const addCard = document.querySelector(".add-card");

addCard.addEventListener("click", () => {
  const questionValue = question.value;
  const answerValue = answer.value;

  cardsWrapper.innerHTML += `
    <div class="card">
      <div class="inner-card__front">${questionValue}</div>
      <div class="inner-card__back">${answerValue}</div>
    </div>
  `;
  question.value = "";
  answer.value = "";
  addContainer.classList.remove("show");
});
