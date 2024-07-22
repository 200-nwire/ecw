<script setup lang="ts">
import useGlobalStore from '@/store/global'

const globalStore = useGlobalStore()
</script>

<template>
  <div class="flex flex-1 flex-col h-screen">
    <RouterView />
    <div
      v-if="globalStore.loading"
      class="flex justify-center items-center h-full w-full flex-1 fixed top-0 left-0 transition-all duration-300 bg-black/40 pointer-events-auto z-overlay"
    >
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        class="fill-surface-0 dark:fill-surface-800"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
  </div>
</template>
