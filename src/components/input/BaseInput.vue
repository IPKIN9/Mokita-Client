<template>
  <input type="text" class="form-control rounded" v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
</template>
<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: [String, Number],
})
</script>