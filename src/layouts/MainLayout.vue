<template>
  <div>
    <aside
      v-if="hasSlot('sidebar')"
      class="flex bg-white w-[20%] flex-col"
    >
      <slot name="sidebar"></slot>
    </aside>
    <div class="flex flex-col flex-1">
      <div class="grid grid-cols-12 gap-5 p-5 h-full px-11 py-8">
        <div class="flex flex-col flex-1 gap-4 overflow-y-auto col-span-12">
          <!-- <ScrollableContainer> -->
          <slot name="main-content"></slot>
          <!-- </ScrollableContainer> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import ScrollableContainer from '@/components/ScrollableContainer.vue'
import { useSlots } from 'vue'

const slots = useSlots()
const hasSlot = name => !!slots[name]
</script>
