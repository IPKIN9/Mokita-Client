<template>
  <button class="btn" v-bind="$attrs" @click="eventTriger">
    <slot></slot>
  </button>
</template>
<script setup>
const emits = defineEmits(['clickEvent'])
const eventTriger = () => {
  emits('clickEvent')
}
</script>