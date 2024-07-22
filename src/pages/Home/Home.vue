<script setup lang="ts">
import HomeHeader from './components/HomeHeader.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
</script>

<template>
  <HomeLayout class="bg-transparent">
    <template #header>
      <HomeHeader />
    </template>

    <template #main>
      <RouterView class="bg-neutral-level-1 flex overflow-y-auto w-full flex-1" />
    </template>
  </HomeLayout>
</template>
