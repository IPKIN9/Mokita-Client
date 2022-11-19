<template>
  <select class="form-select mt-2" size="5" v-bind="$attrs" @change="eventTriger"
    @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
    <option :value="null || ''" disabled>{{defaultVal ? defaultVal : '--Select Data--'}}</option>
    <option v-for="(obj, index) in options" :key="index" :value="obj[display.value]" 
    @click.stop="eventTriger({nama: obj[display.label], status: obj.status})">{{ obj[display.label] }}</option>
  </select>
</template>
<script setup>
import BaseInput from './BaseInput.vue';

const emits = defineEmits(['clickEvent', 'update:modelValue'])
const props = defineProps({
  options: {
    type: Object
  },
  display: {
    type: Object,
    default: {
      value: 'id',
      label: 'name'
    }
  },
  defaultVal: {
    type: String,
    default: 'Select'
  },
  modelValue: [String, Number],
})

const eventTriger = (params) => {
  emits('clickEvent', params)
}
</script>