<script setup lang="ts">
import Item from './item.vue'
import {useSpinnerMove} from '../composables/useSpinnerMove'



const {startMove, startAuto, attenuationSpeed, spinnerData, FLIP_SPEED, container} = useSpinnerMove(200)

function onRightSlide() {
  startMove('right')
}

function onLeftSlide() {
  startMove('left')
}

function onAuto() {
  startAuto()
}

function onTimeSlide(e:any) {
  const roundTime = (e.target.children.time.value / 5) * 1000;
  const phaseTime = roundTime / 20;


  attenuationSpeed(phaseTime)
  startMove('right', false)
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