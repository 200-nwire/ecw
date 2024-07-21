<template>
  <div class="flex flex-1 flex-col h-screen">
    <div v-if="hasSlot('header')">
      <slot name="header"></slot>
    </div>
    <main
      v-if="hasSlot('main')"
      class="flex flex-col flex-1 h-full overflow-y-auto"
    >
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
const hasSlot = name => !!slots[name]
</script>
