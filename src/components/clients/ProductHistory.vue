<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate'
import type Order from '@/interfaces/order'
import { useProductStore } from '@/store/products'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const productStore = useProductStore()

const { getClientOrders } = useProductStore()

const isLoading = ref(false)

const props = defineProps({
  clientOrders: {
    type: Array,
    required: true,
  },
  statusKey: {
    type: Object,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
})

const dialog = ref(false)

const openOrderDialog = async () => {
  isLoading.value = true
  await getClientOrders(props.clientId, 25, true)
  isLoading.value = false
  dialog.value = true
}

const fullClientOrders = computed(() => {
  return productStore.fullClientOrders
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
      <p class="m-0 text-xl font-semibold text-[#29d570]">היסטוריית מוצרים</p>
      <p
        v-if="clientOrders.length !== 0"
        class="m-0"
      >
        סך הכל {{ clientOrders.length }}
      </p>
    </div>
    <div v-if="clientOrders.length === 0">
      <p class="text-xl text-[#4a74eb] text-center">-עדיין אין פה כלום-</p>
    </div>
    <div
      class="mb-12"
      v-else
    >
      <VRow
        v-for="order in clientOrders"
        :key="(order as Order).node.id"
        dir="rtl"
        class="d-flex items-center justify-between p-x-2 mt-4 my-4 mr-2"
      >
        <VCardText class="pt-0 w-[15%] pl-0 pb-0 pr-0 whitespace-nowrap"
          ><div class="text-base font-bold text-right">
            (x{{ (order as Order).node.quantity }}){{ (order as Order).node.product.name }}
          </div></VCardText
        >
        <VCardText class="pt-0 w-[15%] pl-0 pb-0 pr-0 whitespace-nowrap ml-8"
          ><div class="text-base font-bold text-right whitespace-nowrap">
            {{ getFormattedDate((order as Order).node.account.createdOn) }}
          </div></VCardText
        >
        <VCardText class="pt-0 w-[15%] pl-0 pb-0 pr-0 whitespace-nowrap ml-8"
          ><div class="text-base font-bold text-right whitespace-nowrap">
            {{ statusKey[(order as Order).node.status] }}
          </div></VCardText
        >
        <VCardText class="pt-0 w-[15%] pl-0 pb-0 pr-0 whitespace-nowrap"
          ><div class="text-base font-bold text-right">{{ (order as Order).node.pickedOn || '---' }}</div></VCardText
        >
        <VCardText class="pt-0 w-[15%] pl-0 pb-0 pr-0 whitespace-nowrap"
          ><div class="text-base font-bold text-right">
            <span>{{ (order as Order).node.pickedQuantity || 0 }}</span
            >/<span>{{ (order as Order).node.quantity || 0 }}</span>
          </div>
        </VCardText>
      </VRow>
      <VBtn
        @click="openOrderDialog"
        class="absolute bottom-2 left-2 mr-2"
        >הצג הכל</VBtn
      >
    </div>
    <VDialog v-model="dialog">
      <VCard
        class="max-h-[20rem] full-products-card max-w-[60%] px-4 py-4 fixed top-[50%] left-[50%] translate-x-[-50%]"
      >
        <div
          v-for="(order, index) in fullClientOrders"
          :key="order.node.account.id"
          class="flex items-center justify-between my-2"
        >
          <span
            class="w-[15%] text-left"
            v-if="order.node.pickedIn"
            >{{ order.node.pickedIn.name }}</span
          >
          <span
            class="w-[15%] text-right text-base font-bold whitespace-nowrap"
            v-else
            >לא מומש בתחנה</span
          >
          <div class="w-[15%] text-right text-base font-bold">
            <span class="mr-2">{{ order.node.pickedQuantity || 0 }}</span
            >/<span class="ml-2">{{ order.node.quantity }}</span>
          </div>
          <span class="w-[15%] text-right text-base font-bold">{{
            getFormattedDate(order.node.pickedOn) || '---'
          }}</span>
          <span class="w-[15%] text-right text-base font-bold">{{ order.node.status }}</span>
          <span class="w-[15%] text-right text-base font-bold">{{ order.node.totalDue }}</span>
          <span class="w-[15%] text-right text-base font-bold">{{ getFormattedDate(order.node.createdOn) }}</span>
          <span class="w-[15%] text-left ml-2 text-base font-bold"
            >{{ order.node.account.profile.name }}<span>.{{ index + 1 }}</span></span
          >
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
.full-products-card::-webkit-scrollbar {
  display: none;
}

.full-products-card {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
