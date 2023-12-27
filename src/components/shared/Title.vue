<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="text-h6 text-right font-weight-bold">{{ text }}</div>
</template>

<style scoped>
div {
  color: #4A74EB;
}
</style>
