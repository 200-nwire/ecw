<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate'

import type { IWash } from '@/interfaces/wash'
import { useStationStore } from '@/store/stations'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const stationStore = useStationStore()
const { getWashes } = useStationStore()

const isLoading = ref(false)

const props = defineProps({
  washes: {
    type: Array,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
})

const dialog = ref(false)
const openWashDialog = async () => {
  isLoading.value = true
  await getWashes({ clientId: props.clientId, first: 25 }, true)
  isLoading.value = false
  dialog.value = true
}

const fullClientWashes = computed(() => {
  return stationStore.fullClientWashes
})

const closeDialog = () => {
  dialog.value = false
}
</script>

<template>
  <loading
    v-model:active="isLoading"
    :is-full-page="true"
  />
  <VCard class="text-right px-4 py-4">
    <div class="mb-4">
      <p class="m-0 text-xl text-[#4a74eb]">היסטוריית שטיפות</p>
      <p
        v-if="washes.length !== 0"
        class="m-0"
      >
        סך הכל {{ washes.length }}
      </p>
    </div>
    <div v-if="washes.length === 0">
      <p class="text-xl text-[#4a74eb] text-center">-עדיין אין פה כלום-</p>
    </div>
    <div v-else>
      <VRow
        v-for="(wash, index) in washes"
        :key="((wash as IWash)).node.id"
        class="d-flex items-center justify-between p-x-2 mt-4 mb-2"
      >
        <VCardText class="pt-0 w-[33%]"
          ><div
            v-if="(wash as IWash).node.subscription"
            class="text-base font-bold"
          >
            {{ (wash as IWash).node.subscription.station.name }}
          </div></VCardText
        >
        <VCardText class="pt-0 w-[33%]"
          ><div
            v-if="(wash as IWash).node.subscription"
            class="text-base font-bold"
          >
            {{ getFormattedDate((wash as IWash).node.subscription.expiresOn) }}
          </div></VCardText
        >
        <VCardText class="pt-0 w-[33%]"
          ><div class="text-base font-bold">
            {{ (wash as IWash).node.car }}<span>.{{ index + 1 }}</span>
          </div></VCardText
        >
      </VRow>
      <VBtn
        @click="openWashDialog"
        class="absolute bottom-0 right-[80%]"
        >הצג הכל</VBtn
      >
    </div>
    <VDialog v-model="dialog">
      <VCard class="full-washes-card max-w-[40%] px-4 py-4 fixed top-[50%] left-[50%] translate-x-[-50%]">
        <div
          v-for="(wash, index) in fullClientWashes"
          :key="wash.node.id"
          class="flex items-center justify-between my-2"
        >
          <span
            v-if="wash.node.subscription.station"
            class="text-base font-bold w-[33%] text-right"
            >{{ wash.node.subscription.station.name }}</span
          >
          <span class="text-base font-bold w-[33%] text-right">{{ getFormattedDate(wash.node.washedOn) }}</span>
          <span class="text-base font-bold w-[33%] text-right">
            <span>{{ wash.node.car }}</span>
            <span>.{{ index + 1 }}</span>
          </span>
        </div>
        <VBtn
          class="mt-2"
          @click="closeDialog"
          >סגור</VBtn
        >
      </VCard>
    </VDialog>
  </VCard>
</template>

<style>
.full-washes-card::-webkit-scrollbar {
  display: none;
}

.full-washes-card {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
