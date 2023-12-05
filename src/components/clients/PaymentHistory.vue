<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate'

import type Payment from '@/interfaces/payment'
import { useClientStore } from '@/store/clients'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const clientStore = useClientStore()
const { getClientPayments } = useClientStore()

const isLoading = ref(false)

const props = defineProps({
  payments: {
    type: Object,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
})

const dialog = ref(false)
const openPaymentsDialog = async () => {
  isLoading.value = true
  await getClientPayments(props.clientId, 25, true)
  isLoading.value = false
  dialog.value = true
}

const fullClientPayments = computed(() => clientStore.fullClientPayments)

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
      <p class="m-0 text-xl text-[#27c4a6]">היסטוריית תשלומים</p>
      <p
        v-if="payments.length !== 0"
        class="m-0"
      >
        סך הכל {{ payments.length }}
      </p>
    </div>
    <div v-if="payments.length === 0">
      <p class="text-xl text-[#4a74eb] text-center">-עדיין אין פה כלום-</p>
    </div>
    <div v-else>
      <VRow
        v-for="payment in payments"
        :key="(payment as Payment).node.id"
        class="d-flex items-center justify-between p-x-2 mt-4 mb-2"
      >
        <VCardText class="pt-0 w-[25%] pl-0"
          ><div class="text-base font-bold text-right">
            {{ (payment as Payment).node.paymentMethod.cardNumber }}
          </div></VCardText
        >
        <VCardText class="w-[25%] pl-0"
          ><div class="text-base font-bold text-right">{{ (payment as Payment).node.receipt }}</div></VCardText
        >
        <VCardText class="w-[25%] pl-0"
          ><div class="text-base font-bold text-right">
            {{ getFormattedDate((payment as Payment).node.createdOn) }}
          </div></VCardText
        >
        <VCardText class="w-[25%] pl-0"
          ><div class="text-base font-bold text-right">
            <span class="mr-2">{{ (payment as Payment).node.totalDue }}</span
            ><span>חיוב</span>
          </div></VCardText
        >
      </VRow>
      <VBtn
        @click="openPaymentsDialog"
        class="absolute bottom-0 right-[80%]"
        >הצג הכל</VBtn
      >
    </div>
    <VDialog v-model="dialog">
      <VCard class="full-payments-card max-w-[40%] px-4 py-4 fixed top-[50%] left-[50%] translate-x-[-50%]">
        <div
          v-for="payment in fullClientPayments"
          :key="payment.node.id"
          class="flex items-center justify-between my-2"
        >
          <span class="w-[25%] text-left text-base font-bold">{{ payment.node.paymentMethod.cardNumber }}</span>
          <div class="w-[25%] text-center text-base font-bold">
            <span v-for="subscription in payment.node.subscriptions">{{ subscription.car }}</span>
          </div>
          <span class="w-[25%] text-right text-base font-bold">{{ payment.node.receipt }}</span>
          <span class="w-[25%] text-right text-base font-bold">{{ getFormattedDate(payment.node.createdOn) }}</span>
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
.full-payments-card::-webkit-scrollbar {
  display: none;
}

.full-payments-card {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
