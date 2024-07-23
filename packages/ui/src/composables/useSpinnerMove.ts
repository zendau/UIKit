import { ref, reactive } from "vue";
type moveSide = "left" | "right";

const container = ref();
const spinnerData = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const FLIP_SPEED = ref(10);

export function useSpinnerMove(cellSize: number) {
  let isAnimation: number = 0;


  function startMove(side: moveSide, isClear = true) {
    const counter = 0;
    isAnimation = requestAnimationFrame(() => move(counter, side, isClear));
  }


  function startAuto() {
    if (isAnimation) {
      cancelAnimationFrame(isAnimation);
      isAnimation = 0;
      return;
    }
    startMove('right', false)
  }


  function move(counter: number, side: moveSide, isClear = true) {
    counter++;
    debugger


    if (FLIP_SPEED.value === 0) {
      cancelAnimationFrame(isAnimation);
      isAnimation = 0;
      return;
    }

    if (!container.value) return;

    if (counter * FLIP_SPEED.value >= cellSize) {
      counter = 0;
      if (side === "right") {
        pushRightItem();
      } else if (side === "left") {
        pushLeftItem();
      }

      if (isClear) {
        cancelAnimationFrame(isAnimation);
        isAnimation = 0;

        if (side === "right") {
          rightTransform(counter);
        } else if (side === "left") {
          leftTransform(counter);
        }
        return;
      }
    }
    if (side === "right") {
      rightTransform(counter);
    } else if (side === "left") {
      leftTransform(counter);
    }
    isAnimation = requestAnimationFrame(() => move(counter, side, isClear));
  }

  function pushLeftItem() {
    const lastItem = spinnerData.pop();

    if (!lastItem) return;
    spinnerData.unshift(lastItem);
  }
  function pushRightItem() {
    const firstItem = spinnerData.shift();

    if (!firstItem) return;
    spinnerData.push(firstItem);
  }

  function leftTransform(counter: number) {
    container.value.style.transform = `translateX(${
      counter * FLIP_SPEED.value
    }px)`;
  }
  function rightTransform(counter: number) {
    container.value.style.transform = `translateX(-${
      counter * FLIP_SPEED.value
    }px)`;
  }

  function attenuationSpeed(phaseTime: number) {
    FLIP_SPEED.value = 100;

    const speedDecayInterval = setInterval(() => {
      if (!FLIP_SPEED.value) {
        clearInterval(speedDecayInterval);
        return;
      }
      FLIP_SPEED.value--;
    }, phaseTime);
  }


  return {
    startMove,
    startAuto,
    attenuationSpeed,
    spinnerData,
    FLIP_SPEED,
    container
  };
}
