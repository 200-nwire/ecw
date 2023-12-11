<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate'

import type { IWash } from '@/interfaces/wash'
import { useStationStore } from '@/store/stations'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import Camera from '@/assets/images/svg/camera.svg'

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

const washDialog = ref(false)
const openWashDialog = async () => {
  isLoading.value = true
  await getWashes({ clientId: props.clientId, first: 25 }, true)
  isLoading.value = false
  washDialog.value = true
}

const fullClientWashes = computed(() => {
  return stationStore.fullClientWashes
})

const closeDialog = () => {
  washDialog.value = false
}

const imageDialog = ref(false)

const showImage = () => {
  imageDialog.value = true
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
        dir="rtl"
        class="d-flex items-center justify-between p-x-2 mt-4 mb-4 whitespace-nowrap flex-nowrap"
      >
        <VCardText class="pt-0 pb-0 w-[33%]"
          ><div class="text-base font-bold">
            {{ (wash as IWash).node.car }}<span>.{{ index + 1 }}</span>
          </div></VCardText
        >
        <VCardText class="pt-0 pb-0 w-[33%]"
          ><div
            v-if="(wash as IWash).node.subscription"
            class="text-base font-bold"
          >
            {{ getFormattedDate((wash as IWash).node.subscription.expiresOn) }}
          </div></VCardText
        >
        <VCardText class="pt-0 pb-0 w-[33%]"
          ><div
            v-if="(wash as IWash).node.subscription"
            class="text-base font-bold"
          >
            {{ (wash as IWash).node.subscription.station.name }}
          </div></VCardText
        >
        <div
          class="ml-4 cursor-pointer"
          @click="showImage"
        >
          <VDialog v-model="imageDialog">
            <VCard class="max-w-[40%] fixed top-1/2 left-1/2 px-4 py-4 translate-x-[-50%] translate-y-[-50%]">
              <img
                :src="(wash as IWash).node.image"
                alt="לא נמצאה תמונה"
              />
            </VCard>
          </VDialog>
          <Camera />
        </div>
      </VRow>
      <VBtn
        @click="openWashDialog"
        class="absolute bottom-0 left-0 mr-2"
        >הצג הכל</VBtn
      >
    </div>
    <VDialog v-model="washDialog">
      <VCard
        class="full-washes-card max-w-[40%] px-4 py-4 fixed top-[50%] left-[50%] translate-x-[-50%]"
        dir="rtl"
        @click:outside="closeDialog"
      >
        <div class="mb-4">
          <p class="m-0 text-xl text-[#4a74eb]">היסטוריית שטיפות</p>
          <p class="m-0">סך הכל {{ fullClientWashes.length }}</p>
        </div>
        <div
          v-for="(wash, index) in fullClientWashes"
          :key="wash.node.id"
          class="flex items-center justify-between my-2"
          dir="rtl"
        >
          <span class="text-base font-bold w-[33%] text-right">
            <span>{{ wash.node.car }}</span>
            <span>.{{ index + 1 }}</span>
          </span>
          <span class="text-base font-bold w-[33%] text-right">{{ getFormattedDate(wash.node.washedOn) }}</span>
          <span
            v-if="wash.node.subscription"
            class="text-base font-bold w-[33%] text-right"
            >{{ wash.node.subscription.station.name }}</span
          >
          <span
            v-else
            class="text-base font-bold w-[33%] text-right"
            >לא נמצאה תחנה</span
          >
          <div
            class="ml-4 cursor-pointer"
            @click="showImage"
          >
            <VDialog v-model="imageDialog">
              <VCard class="max-w-[40%] fixed top-1/2 left-1/2 px-4 py-4 translate-x-[-50%] translate-y-[-50%]">
                <img
                  :src="(wash as IWash).node.image"
                  alt="לא נמצאה תמונה"
                />
              </VCard>
            </VDialog>
            <Camera />
          </div>
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
