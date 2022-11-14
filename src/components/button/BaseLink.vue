<template>
  <router-link :to="to" v-bind="$attrs">
    <i :class="icon"></i>
    <span>{{label}}</span>  
  </router-link>
</template>
<script setup>
  const props = defineProps({
    label: String,
    to: Object,
    icon: String
  })
</script>