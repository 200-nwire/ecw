<script setup lang="ts">
import List from '@/components/shared/List.vue';
import Title from '@/components/shared/Title.vue';
import { useStationStore } from '@/store/stations';
import { groupBy, sumBy, uniqBy } from 'lodash';
import { computed, ref } from 'vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const stationStore = useStationStore()
const { getStations, getWashes } = useStationStore()

const isLoading = ref(false)

const washes = computed(() => stationStore.fullClientWashes.map((wash: any) => ({
  ...(wash.node ?? {}),
  stationId: wash.node?.station?.id
})))
const stations = computed(() => stationStore.stations)

const washesPerStations = computed(() => {
  const grouped = groupBy(washes.value, 'stationId')
  return grouped;
})
const data = computed(() => stations.value.map((station: any) => ({
  ...station,
  address: station.location.address,
  washesCountToday: sumBy(washesPerStations.value[station.id], 'today') ?? 0,
  totalWashesCount: sumBy(washesPerStations.value[station.id], 'total') ?? 0,
  totalUniqCarsCount: uniqBy(washesPerStations.value[station.id], 'car').length ?? 0
})))


onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoading.value = true
    await getStations()
    await getWashes({}, true)
    isLoading.value = false
  }
})

const boxClasses = 'border border-[#616A82] rounded-md justify-center p-4 mt-2 w-[6em] max-w-[6em]';

const listDefinition = ref([{
  id: 'group1',
  flex: '1',
  items: [{
    id: 'name',
    title: 'שם סניף',
    class: "text-[#616A82] font-bold",
    flex: '1'
  }]
}
  , {
  id: 'group2',
  flex: '1',
  items: [{
    id: 'address',
    title: 'כתובת',
    class: "font-light",
    flex: '1'
  }]
}, {
  id: 'group3',
  flex: '2',
  class: 'justify-end',
  items: [{
    id: 'washesCountToday',
    text: 'שטיפות היום',
    class: `text-[#4A74EB] ${boxClasses}`,
    flex: '1'
  }, {
    id: 'totalWashesCount',
    text: 'סך שטיפות',
    class: `text-[#7852FF] ${boxClasses}`,
    flex: '1'
  }, {
    id: 'totalUniqCarsCount',
    class: `text-[#616A82] ${boxClasses}`,
    text: 'סך רכבים',
    flex: '1'
  }]
}])

</script>

<template>
  <loading v-model:active="isLoading" :is-full-page="true" />
  <div class="flex flex-col w-full h-full gap-2">
    <Title text="סניפים" />
    <!-- <div class="actions flex justify-end py-4 px-2">
      <v-btn color="primary" rounded class="">
        סניף חדש
        <v-icon icon="mdi-plus" class="ml-1"></v-icon>
      </v-btn>
    </div> -->

    <List :listDefinition="listDefinition" :data="data" />
  </div>
</template>
