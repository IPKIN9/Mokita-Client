<template>
  <div v-if="show" class="dataTable-bottom d-flex">
    <div class="dataTable-info py-2 flex-grow-1">Showing {{ page }} to {{ pageOf }} of {{ total }} entries</div>
    <ul class="pagination pagination-primary float-end dataTable-pagination">
      <li @click="eventTriger('pre')" class="page-item pager"><button v-if="previous" class="page-link">‹
          Previous</button></li>
      <li class="page-item active">
        <div class="page-link">{{ page }}</div>
      </li>
      <li @click="eventTriger('next')" class="page-item pager"><button v-if="next" class="page-link">Next ›</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const emits = defineEmits(['eventClick'])
const props = defineProps({
  limit: [String, Number],
  page: [String, Number],
  pageOf: [String, Number],
  total: [String, Number],
})

const show = computed(() => {
  if (props.limit === props.total) {
    return false
  } else {
    return true
  }
})


const previous = computed(() => {
  if (props.page > 1) {
    return true
  } else {
    return false
  }
})
const next = computed(() => {
  if (props.page === props.pageOf) {
    return false
  } else {
    return true
  }
})

const eventTriger = (params) => {
  emits('eventClick', params)
}
</script>