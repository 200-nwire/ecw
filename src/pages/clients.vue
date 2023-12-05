<script setup lang="ts">
import ClientRow from '@/components/clients/ClientRow.vue'
import ClientsFilter from '@/components/clients/ClientsFilter.vue'
import SummaryRow from '@/components/clients/SummaryRow.vue'
import { useClientStore } from '@/store/clients'
import { computed, ref } from 'vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const clientStore = useClientStore()
const { getClients, getClientsSummary } = useClientStore()

const showClients = ref(false)

const isLoading = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoading.value = true
    await getClients()
    await getClientsSummary()
    showClients.value = true
    isLoading.value = false
  }
})

const clients = computed(() => clientStore.clients)
const clientsSummary = computed(() => clientStore.clientsSummary)
</script>

<template>
  <loading
    v-model:active="isLoading"
    :is-full-page="true"
  />

  <ClientsFilter />

  <SummaryRow
    v-if="clientsSummary.totalAccounts"
    :clients-summary="clientsSummary"
  />

  <div>
    <div
      dir="rtl"
      class="flex items-center justify-between pr-4 py-2 sticky top-0 z-10 bg-[#e5e7eb]"
    >
      <span class="justify-self-start w-[9%]">שם מלא</span>
      <span class="flex justify-center w-[9%]">הרשמה</span>
      <span class="flex justify-center w-[9%]">טלפון</span>
      <span class="flex justify-center w-[9%]">מקור</span>
      <span class="flex justify-center w-[9%]">ווש בק</span>
      <span class="flex justify-center w-[9%]">מוצרים</span>
      <span class="flex justify-center w-[9%]">סניף רשום</span>
      <span class="flex justify-center w-[9%]">מספר רכב</span>
      <span class="flex justify-center w-[9%]">חיוב קרוב</span>
      <span class="flex justify-center w-[9%]">מסלול</span>
      <button class="justify-self-start w-[9%]">חיוב קבוצה</button>
    </div>
    <div
      v-if="showClients"
      class="w-full flex flex-col gap-y-4 mt-4"
    >
      <ClientRow :clients="clients.accounts.edges" />
    </div>
  </div>
</template>
