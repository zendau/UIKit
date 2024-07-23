<script setup lang="ts">
import Item from './item.vue'
import {reactive, ref} from 'vue'

const container = ref()
const spinnerData = reactive([1,2,3,4,5,6,7,8,9])

const FLIP_SPEED = ref(10);
const ITEM_SIZE = 200;

let isAnimation: number = 0;

function onRightSlide() {

  let counter = 0;


  function move() {
    counter++;
    if (!container.value) return

    if (counter * FLIP_SPEED.value >= ITEM_SIZE) {
      counter = 0;
      const firstItem = spinnerData.shift();

      if (!firstItem) return
      spinnerData.push(firstItem);
      cancelAnimationFrame(isAnimation);
      isAnimation = 0;
      container.value.style.transform = `translateX(-${counter * FLIP_SPEED.value}px)`;
      return;
    }
    container.value.style.transform = `translateX(-${counter * FLIP_SPEED.value}px)`;
    isAnimation = requestAnimationFrame(move);
  }



  isAnimation = requestAnimationFrame(move);
}


function onLeftSlide() {
let counter = 0;

function move() {
    counter++;
    if (!container.value) return

    if (counter * FLIP_SPEED.value >= ITEM_SIZE) {
      counter = 0;
      const lastItem = spinnerData.pop();

      if (!lastItem) return
      spinnerData.unshift(lastItem);
      cancelAnimationFrame(isAnimation);
      isAnimation = 0;
      container.value.style.transform = `translateX(${counter * FLIP_SPEED.value}px)`;
      return;
    }
    container.value.style.transform = `translateX(${counter * FLIP_SPEED.value}px)`;
    isAnimation = requestAnimationFrame(move);
  }


isAnimation = requestAnimationFrame(move);
}

function onTimeSlide(e:any) {
  const roundTime = (e.target.children.time.value / 5) * 1000;
  const phaseTime = roundTime / 20;

  let counter = 0;
  let speed = 100;

  console.log(counter, speed)

  const speedDecayInterval = setInterval(() => {
    if (!speed) {
      clearInterval(speedDecayInterval);
      return;
    }
    speed--;
  }, phaseTime);

  function move() {
    counter++;

    if (speed === 0) {
      cancelAnimationFrame(isAnimation);
      isAnimation = 0;
      return;
    }

    if (!container.value) return

    if (counter * FLIP_SPEED.value >= ITEM_SIZE) {
      counter = 0;
      const firstItem = spinnerData.shift();

      if (!firstItem) return
      spinnerData.push(firstItem);
    }
    container.value.style.transform = `translateX(-${counter * speed}px)`;
    isAnimation = requestAnimationFrame(move);
  }


  isAnimation = requestAnimationFrame(move);

}

function onAuto() {
  let counter = 0;

  if (isAnimation) {
    cancelAnimationFrame(isAnimation);
    isAnimation = 0
    return;
  }

  function move() {
    counter++;
    if (!container.value) return

    if (counter * FLIP_SPEED.value >= ITEM_SIZE) {
      counter = 0;
      const firstItem = spinnerData.shift();

      if (!firstItem) return
      spinnerData.push(firstItem);
    }
    container.value.style.transform = `translateX(-${counter * FLIP_SPEED.value}px)`;
    isAnimation = requestAnimationFrame(move);
  }


  isAnimation = requestAnimationFrame(move);

}



</script>

<template>
  <div class="container" >
    <ul class="spinner-container" ref="container">
      <Item v-for="item of spinnerData" :key="item" :title="item" />

    </ul>
  </div>

  <div class="btn-container">
    <button @click="onLeftSlide">left</button>
    <button @click="onAuto">auto</button>
    <button @click="onRightSlide">right</button>
  </div>


  <div>
    <input id='speed' v-model="FLIP_SPEED" type="range" min="1" max="100" value="1">
  </div>

  <form @submit.prevent="onTimeSlide">
    <label for="time">Секунды</label>
    <input name="time" id="time" type="number" required value="10">

    <input type="reset">
    <button type="submit">Запустить</button>
  </form>

</template>

<style>
 .container {
      width: 600px;
      height: 200px;
      margin: 0 auto;
      border: 1px solid black;
      overflow: hidden;

    }

    .spinner-container {
      padding: 0;
      margin: 0;
      display: flex;
      height: 100%;
      /* transition: all 0s ease-in-out; */

    }

    .spinner-item {
      height: 100%;
      min-width: 200px;
      text-align: center;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        width: 100%;
      }
    }

    .btn-container {
      display: flex;
      justify-content: center;
      margin: 10px;
    }

    .btn-container button {
      width: 100px;
      height: 40px;
      margin: 10px;
      font-size: 20px;
    }

    #mydiv {
      position: absolute;
      left: 0;
    }
</style>