<script setup lang="ts">
import { useClientStore } from '@/store/clients'
import { useControlStore } from '@/store/control'
import { useProductStore } from '@/store/products'
import { useStationStore } from '@/store/stations'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import AccountControl from '@/components/clients/AccountControl.vue'
import ClientDetails from '@/components/clients/ClientDetails.vue'
import PaymentHistory from '@/components/clients/PaymentHistory.vue'
import ProductHistory from '@/components/clients/ProductHistory.vue'
import SubscriptionDetails from '@/components/clients/SubscriptionDetails.vue'
import WashHistory from '@/components/clients/WashHistory.vue'

const clientStore = useClientStore()
const stationStore = useStationStore()
const productStore = useProductStore()
const controllStore = useControlStore()
const { getClientPayments, getClient } = useClientStore()
const { getWashes } = useStationStore()
const { getClientOrders } = useProductStore()
const { getControlForAccount } = useControlStore()

const route = useRoute()

const display = ref(false)

const clientIdRef = ref('')

const isLoading = ref(false)

onMounted(async () => {
  const clientId = route.params.clientId as string
  clientIdRef.value = clientId
  isLoading.value = true
  await getClient(clientId)
  await getClientPayments(clientId)
  await getWashes({
    clientId,
    first: 4,
  })
  await getClientOrders(clientId)
  await getControlForAccount({ clientId, first: 10 })
  isLoading.value = false
  display.value = true
})

const payments = computed(() => clientStore.clientPayments)
const washes = computed(() => stationStore.washes)
const clientOrders = computed(() => productStore.clientOrders)
const client = computed(() => clientStore.client)
const accountControl = computed(() => controllStore.controlForAccount)

const statusKey = {
  ACCEPTED: 'מחכה לאיסוף',
}
</script>

<template>
  <loading
    v-model:active="isLoading"
    :is-full-page="true"
  />
  <div class="grid grid-cols-2 gap-2 md:grid-cols-[1fr_2fr]">
    <div class="flex flex-col gap-y-2">
      <WashHistory
        :washes="washes"
        :client-id="clientIdRef"
      />
      <PaymentHistory
        :payments="payments"
        :client-id="clientIdRef"
      />
      <ProductHistory
        :client-orders="clientOrders"
        :status-key="statusKey"
        :client-id="clientIdRef"
      />
    </div>
    <div
      class="flex flex-col gap-y-2"
      v-if="display"
    >
      <ClientDetails :client="client" />
      <SubscriptionDetails :client="client" />
      <div
        class="col-span-2"
        v-if="accountControl"
      >
        <AccountControl
          :accountControl="accountControl"
          :client-id="clientIdRef"
        />
      </div>
    </div>
  </div>
</template>
