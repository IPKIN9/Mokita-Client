<template>
  <div class="form-floating">
    <textarea class="form-control" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue"
      placeholder="Leave a comment here" id="floatingTextarea"></textarea>
    <label for="floatingTextarea">{{ label }}</label>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  modelValue: [String, Number],
})
</script>