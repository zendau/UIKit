<script setup lang="ts">

const emit = defineEmits<{
  timeSlideSumbit: [time: number]
}>()

function onTimeSlide(e: any) {
  const time = e.target.children.time.value
  emit('timeSlideSumbit', time)
}

</script>

<template>
    <form @submit.prevent="onTimeSlide">
    <label for="time">Секунды</label>
    <input name="time" id="time" type="number" required value="10">

    <input type="reset">
    <button type="submit">Запустить</button>
  </form>
</template>

<style scoped>

button {
  display: block;
  margin: 20px auto;
}

</style>