<script setup>
import { ref, onMounted } from 'vue'
import { useClientStore } from '@/store/clients'
import { usePlanStore } from '@/store/plans'
import { useStationStore } from '@/store/stations'
import VueDatePicker from '@vuepic/vue-datepicker'
import InstantScroll from '@/components/InstantScroll.vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { sources, statuses } from '@/composables/useFilter'
const clientStore = useClientStore()
const planStore = usePlanStore()
const stationStore = useStationStore()
const { getClients, getClientsSummary } = useClientStore()
const { getPlans } = usePlanStore()
const { getStations } = useStationStore()

const hasNextPage = computed(() => clientStore.hasNextPage)
const endCursor = computed(() => clientStore.endCursor)

const isLoading = ref(false)

const setInitialFilters = () => {
  return {
    search: '',
    stations: [],
    plans: [],
    statuses: [],
    dates: null,
    sources: [],
    value: 0,
    clientsWithSubscriptions: false,
    clientsWithPurchases: false,
  }
}

const clientFilters = ref({})

onMounted(async () => {
  clientFilters.value = setInitialFilters()
  const token = localStorage.getItem('token')
  if (token) {
    isLoading.value = true
    await getPlans()
    await getStations()
    isLoading.value = false
  }
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = async () => {
  const token = localStorage.getItem('token')
  if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight && token && hasNextPage.value) {
    isLoading.value = true
    await getClients(clientFilters.value, endCursor.value)
    isLoading.value = false
  }
}

const plans = computed(() => planStore.plans)
const stations = computed(() => stationStore.stations)

const resetFilters = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoading.value = true
    await getClientsSummary()
    await getClients()
    clientFilters.value = setInitialFilters()
    isLoading.value = false
  }
}

const isTempClintes = ref(false)

const setTempClients = () => {
  isTempClintes.value = !isTempClintes.value
  if (isTempClintes.value) {
    clientFilters.value.clientsWithSubscriptions = false
    clientFilters.value.clientsWithPurchases = false
  } else if (!isTempClintes.value) {
    clientFilters.value.clientsWithSubscriptions = true
    clientFilters.value.clientsWithPurchases = true
  }
}

const dateRange = ref([])

const setFilters = async () => {
  try {
    isLoading.value = true
    await getClients(clientFilters.value)
    await getClientsSummary(clientFilters.value)
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <loading v-model:active="isLoading" :is-full-page="true" />
  <InstantScroll :filters="clientFilters" />
  <VCard class="flex w-full pa-6 pb-6 mb-4 gap-4 flex-col flex-wrap">
    <div class="flex gap-4 gap-y-4">
      <VSelect :items="stations.map(station => {
        return {
          id: station.id,
          name: station.name,
        }
      })
        " v-model="clientFilters.stations" item-value="id" item-title="name" density="compact" chips label="סניף"
        multiple></VSelect>
      <VSelect :items="plans.map(plan => {
        return {
          id: plan.id,
          description: plan.description,
        }
      })
        " v-model="clientFilters.plans" item-value="id" item-title="description" chips density="compact" label="מסלול"
        multiple></VSelect>
      <VSelect :items="statuses.map(status => {
        return {
          id: status.id,
          value: status.value,
        }
      })
        " v-model="clientFilters.statuses" item-value="id" item-title="value" density="compact" chips label="סטטוס רכב"
        multiple></VSelect>
      <VSelect :items="sources.map(source => {
        return {
          id: source.id,
          value: source.value,
        }
      })
        " v-model="clientFilters.sources" item-value="id" item-title="value" chips density="compact" label="מקור הגעה"
        multiple></VSelect>
    </div>
    <div class="flex gap-2 items-center justify-between py-4">
      <VMenu>
        <template v-slot:activator="{ props }">
          <vue-date-picker :teleport="true" v-model="dateRange" model-type="timestamp" :range="true"
            @update:model-value="setDate" />
        </template>
      </VMenu>
      <VTextField v-model="clientFilters.search" placeholder="חיפוש" variant="outlined" density="compact" />
    </div>
    <div class="flex flex-1 flex-wrap gap-8 ">
      <VCheckbox @click="setTempClients" label="לקוחות זמניים"></VCheckbox>
      <VCheckbox v-model="clientFilters.clientsWithSubscriptions" label="לקוחות מנויים"></VCheckbox>
      <VCheckbox v-model="clientFilters.clientsWithPurchases" label="לקוחות עם רכישות"></VCheckbox>
    </div>
    <div class="flex items-center w-full flex-wrap justify-end">
      <v-btn @click="setFilters">עדכן עמוד</v-btn>
      <VBtn @click="resetFilters" variant="text">אפס סינון</VBtn>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.dp__main {
  flex: 1;
}
</style>
