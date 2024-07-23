<script setup lang="ts">

const {title} = defineProps<{
  title: string | number
}>()

</script>

<template>
  <li class="spinner-item">
        <p>{{ title }}</p>
      </li>
</template>

<style lang="scss" scoped></style>