<template>
  <select class="form-select mt-2" size="4" v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
    <option :value="null || ''" disabled>{{defaultVal ? defaultVal : '--Select Data--'}}</option>
    <option v-for="(obj, index) in options" :key="index" :value="obj[display.value]" 
    @click.stop="eventTriger({nama: obj[display.label], status: obj.status ? obj.status : ''})">{{ obj[display.label] }}</option>
  </select>
</template>
<script setup>

const emits = defineEmits(['clickEvent', 'update:modelValue'])
const props = defineProps({
  options: {
    type: Object
  },
  display: {
    type: Object,
    default: {
      value: 'id',
      label: 'nama',
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