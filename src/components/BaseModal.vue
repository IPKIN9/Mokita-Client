<template>
  <div class="modal fade" :id="idModal" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" :class="prop.mdSize">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">{{ mdTitle }}</h4>
        </div>

        <!-- Modal body -->
        <slot name="body"></slot>

        <!-- Modal footer -->
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['clickEvent'])
const prop = defineProps({
  mdSize: {
    type: String
  },
  mdTitle: {
    type: String
  },
  idModal: String
})
</script>