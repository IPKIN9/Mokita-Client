<template>
  <button class="btn" v-bind="$attrs" @click="eventTriger">
    <slot></slot>
  </button>
</template>
<script setup>
const emits = defineEmits(['clickEvent'])
let props = defineProps({
  dataRows: {
    type: Object,
  },
  dataId: {
    type: Number
  },
  typeButton: {
    type: String
  }
})
const eventTriger = () => {
  emits('clickEvent', props)
}
</script>