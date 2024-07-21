const container = document.querySelector(".spinner-container");
const spinnerList = document.getElementsByClassName("spinner-item");

const leftBtn = document.getElementById("left");
const auto = document.getElementById("auto");
const rightBtn = document.getElementById("right");

let SPINNER_SPEED = 1;
const FLIP_SPEED = 10;
const ITEM_SIZE = spinnerList[0].getBoundingClientRect().width;
let counter = 0;
let isAnimation = null;

leftBtn.addEventListener("click", (event) => {
  function lefttMove() {
    counter++;
    if (counter * FLIP_SPEED >= ITEM_SIZE) {
      counter = 0;
      const lastItem = spinnerList[spinnerList.length - 1];
      container.prepend(lastItem);
      // container.style.transform = `translateX(0px)`;
      cancelAnimationFrame(isAnimation);
      isAnimation = null;
      container.style.transform = `translateX(${counter * FLIP_SPEED}px)`;
      return;
    }
    container.style.transform = `translateX(${counter * FLIP_SPEED}px)`;
    isAnimation = requestAnimationFrame(lefttMove);
  }

  isAnimation = requestAnimationFrame(lefttMove);
});

rightBtn.addEventListener("click", (event) => {
  function rightMove() {
    counter++;

    if (counter * FLIP_SPEED >= ITEM_SIZE) {
      counter = 0;
      const firstItem = spinnerList[0];
      container.append(firstItem);
      // container.style.transform = `translateX(0px)`;
      cancelAnimationFrame(isAnimation);
      isAnimation = null;
      container.style.transform = `translateX(-${counter * FLIP_SPEED}px)`;
      return;
    }
    container.style.transform = `translateX(-${counter * FLIP_SPEED}px)`;
    isAnimation = requestAnimationFrame(rightMove);
  }

  isAnimation = requestAnimationFrame(rightMove);

  // counter++;
  // container.style.transform = `translateX(-${counter * sizePX}px)`;

  // q = true;
  // container.style.transitionDelay = "";
  // container.style.transitionDuration = "";

  // counter--;
  // container.style.transform = `translateX(-${counter * sizePX}px)`;

  // console.log(container.style);
  // counter += 200;
  // container.style.transform = `translateX(-${counter}px)`;
  // i++;
  // container.style.transitionDelay = "";
  // container.style.transitionDuration = "";
  // if (i === 6) {
  //   i = 0;
  //   counter = 0;
  //   container.style.transitionDelay = "0ms";
  //   container.style.transform = `translateX(-${counter}px)`;
  //   const q = Array.from(spinnerList).slice(0, 6);
  //   container.append(...q);
  // }
  // let firstItem = spinnerList[0];
  // container.append(firstItem);
});

auto.addEventListener("click", (event) => {
  if (isAnimation) {
    isAnimation = cancelAnimationFrame(isAnimation);
    return;
  }

  function rightMove() {
    counter++;

    if (counter * SPINNER_SPEED >= ITEM_SIZE) {
      counter = 0;
      const firstItem = spinnerList[0];
      container.append(firstItem);
      // container.style.transform = `translateX(0px)`;
    }
    container.style.transform = `translateX(-${counter * SPINNER_SPEED}px)`;
    isAnimation = requestAnimationFrame(rightMove);
  }

  isAnimation = requestAnimationFrame(rightMove);

  // counter++;
  // container.style.transform = `translateX(-${counter * sizePX}px)`;

  // q = true;
  // container.style.transitionDelay = "";
  // container.style.transitionDuration = "";

  // counter--;
  // container.style.transform = `translateX(-${counter * sizePX}px)`;

  // console.log(container.style);
  // counter += 200;
  // container.style.transform = `translateX(-${counter}px)`;
  // i++;
  // container.style.transitionDelay = "";
  // container.style.transitionDuration = "";
  // if (i === 6) {
  //   i = 0;
  //   counter = 0;
  //   container.style.transitionDelay = "0ms";
  //   container.style.transform = `translateX(-${counter}px)`;
  //   const q = Array.from(spinnerList).slice(0, 6);
  //   container.append(...q);
  // }
  // let firstItem = spinnerList[0];
  // container.append(firstItem);
});
// container.addEventListener("transitionend", () => {
//   if (q) {
//     console.log("1");
//     q = false;
//     container.style.transitionDelay = "0ms";
//     container.style.transitionDuration = "0ms";
//     let firstItem = spinnerList[0];
//     container.append(firstItem);
//     counter--;
//     container.style.transform = `translateX(-${counter * sizePX}px)`;
//   }
// });

const speed = document.getElementById("speed");

speed.addEventListener("input", (e) => {
  console.log("e", e.target.value);
  SPINNER_SPEED = +e.target.value;
});

const time = document.getElementById("time");

time.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") return;

  const roundTime = (e.target.value / 5) * 1000;
  const phaseTime = roundTime / 20;

  let speed = 100;

  const speedDecayInterval = setInterval(() => {
    console.log(speed);
    if (!speed) {
      clearInterval(speedDecayInterval);
      return;
    }
    speed--;
  }, phaseTime);

  function rightMove() {
    counter++;

    if (speed === 0) {
      cancelAnimationFrame(isAnimation);
      isAnimation = null;
    }

    if (counter * speed >= ITEM_SIZE) {
      counter = 0;
      const firstItem = spinnerList[0];
      container.append(firstItem);
      // container.style.transform = `translateX(0px)`;
    }
    container.style.transform = `translateX(-${counter * speed}px)`;
    isAnimation = requestAnimationFrame(rightMove);
  }

  isAnimation = requestAnimationFrame(rightMove);

  // console.log("", roundTime * 1000, phaseTime * 1000);

  // const interval = setInterval(() => {
  //   console.log("t", t);
  //   t--;

  //   if (t === 0) clearInterval(interval);
  // }, 1000);
});
