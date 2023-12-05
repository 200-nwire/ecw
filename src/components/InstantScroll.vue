<script setup lang="ts">
import { useClientStore } from '@/store/clients'
import { ref } from 'vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const props = defineProps({
  filters: {
    type: Object,
    default: {},
  },
})

const isLoading = ref(false)

const { getClients } = useClientStore()
const clientStore = useClientStore()

const scrollDirectionDown = ref(true)

const hasNextPage = computed(() => clientStore.hasNextPage)
const endCursor = computed(() => clientStore.endCursor)

const pageScroll = async () => {
  if (scrollDirectionDown.value && hasNextPage.value) {
    if (!isLoading.value) isLoading.value = true
    await getClients(props.filters.value, endCursor.value)
    if (hasNextPage.value) {
      isLoading.value = true
      await pageScroll()
      isLoading.value = false
    } else {
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
      scrollDirectionDown.value = false
    }
    isLoading.value = false
  } else if (scrollDirectionDown.value && !hasNextPage.value) {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
    scrollDirectionDown.value = false
  } else {
    window.scrollTo(0, 0)
    scrollDirectionDown.value = true
  }
}
</script>

<template>
  <loading
    v-model:active="isLoading"
    :is-full-page="true"
  />
  <div
    class="rounded-[50%] cursor-pointer fixed bottom-[10%] right-[10%] bg-[lightblue] h-[50px] w-[50px] z-10 flex items-center justify-center"
    :class="{
      'rotate-90': scrollDirectionDown,
      'rotate-[-90deg]': !scrollDirectionDown,
    }"
    @click="pageScroll"
  >
    ->
  </div>
</template>
