const cardsContainer = document.querySelector(".cards-container");
const cardsWrapper = document.querySelector(".cards");
let front = document.querySelectorAll(".inner-card__front");
let back = document.querySelectorAll(".inner-card__back");

let cards = document.querySelectorAll(".card");
let cardsCount = cards.length;
let currentIndex = 0;

const prevBtn = document.querySelector(".nav__prev");
const nextBtn = document.querySelector(".nav__next");

const navCurrent = document.querySelector(".nav__current");

const addBtn = document.querySelector(".addBtn");
const addContainer = document.querySelector(".add-container");
const closeBtn = document.querySelector(".closeBtn");

const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const addCard = document.querySelector(".add-card");

const clearBtn = document.querySelector(".clear__btn");

let questionArr = [];
let answerArr = [];

function flip() {
  cards[currentIndex].classList.toggle("flip");
}

function frontShowAnswer() {
  front[currentIndex].classList.toggle("show-answer");
}

function backShowAnswer() {
  back[currentIndex].classList.toggle("show-answer");
}

function cardFlip() {
  flip();
  frontShowAnswer();
  backShowAnswer();
}

// cards position 미리 잡아 놓기
function cardPosition() {
  for (let i = 0; i < cardsCount; i++) {
    cards[i].style.left = `${i * 100}%`;
  }
}
cardPosition();

// navCurrent 변경
function navCurrentInnerText() {
  if (!cards[0]) {
    currentIndex -= 1;
  }
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
addBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

addCard.addEventListener("click", () => {
  const questionValue = question.value;
  const answerValue = answer.value;

  questionArr.push(questionValue);
  answerArr.push(answerValue);

  localStorage.setItem("question", JSON.stringify(questionArr));
  localStorage.setItem("answer", JSON.stringify(answerArr));

  cardsWrapper.innerHTML += `
    <div class="card">
      <div class="inner-card__front">${questionValue}</div>
      <div class="inner-card__back">${answerValue}</div>
    </div>
  `;

  front = document.querySelectorAll(".inner-card__front");
  back = document.querySelectorAll(".inner-card__back");
  cards = document.querySelectorAll(".card");

  cardsCount = cards.length;

  cardPosition();
  navCurrentInnerText();
  goToSlide(0);

  //카드 뒤집기
  cardsContainer.addEventListener("click", cardFlip);

  question.value = "";
  answer.value = "";
  addContainer.classList.remove("show");
});

// localStorage에 저장된게 있다면 보여주기
if (localStorage.getItem("question")) {
  questionArr = JSON.parse(localStorage.getItem("question"));
  answerArr = JSON.parse(localStorage.getItem("answer"));
  console.log(questionArr);
  console.log(answerArr);

  for (let i = 0; i < questionArr.length; i++) {
    cardsWrapper.innerHTML += `
    <div class="card">
      <div class="inner-card__front">${questionArr[i]}</div>
      <div class="inner-card__back">${answerArr[i]}</div>
    </div>
  `;
  }
  cards = document.querySelectorAll(".card");
  cardsCount = cards.length;
  cardPosition();

  front = document.querySelectorAll(".inner-card__front");
  back = document.querySelectorAll(".inner-card__back");
  currentIndex += 1;
  navCurrentInnerText();

  // 카드뒤집기
  cardsContainer.addEventListener("click", cardFlip);
}

// localStorage 비우기
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  questionArr = [];
  answerArr = [];

  cardsWrapper.innerHTML = "";
  currentIndex = 0;
  cards = document.querySelectorAll(".card");
  cardsCount = cards.length;
  navCurrentInnerText();
  // 카드가 없다면 작동x
  cardsContainer.removeEventListener("click", cardFlip);
});
