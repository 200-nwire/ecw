<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate'
const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="grid gap-2 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3"
    dir="rtl"
  >
    <VCard
      v-if="client.account.subscriptions"
      v-for="(subscription, index) in client.account.subscriptions"
      :key="index"
      class="pa-3 pl-3 pr-3"
    >
      <div
        class="flex items-center justify-between border-r-[9px] border-r-solid pr-2 mb-4"
        :class="{
          'border-r-[green]': subscription.status === 'ACTIVE',
          'border-r-[red]': subscription.status !== 'ACTIVE',
        }"
      >
        <div class="flex flex-col gap-y-4 items-start justify-between">
          <p class="flex items-center gap-x-2 text-xl font-bold mb-0">
            <span>רכב מספר</span>
            <span>{{ subscription.car }}({{ subscription.label }})</span>
          </p>
          <p class="txet-xs font-normal mb-0">נרשם ב {{ getFormattedDate(subscription.createdOn) }}</p>
        </div>
        <div>
          <span class="text-[#4a74eb] text-base font-normal">{{ subscription.metering }}/{{ subscription.usage }}</span>
        </div>
      </div>
      <div class="flex flex-col w-full gap-y-4 mt-2">
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold mb-0">מסלול</p>
          <p class="mb-0">{{ subscription.plan.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold mb-0">חיוב קרוב</p>
          <p class="mb-0">{{ getFormattedDate(subscription.chargedOn) }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold mb-0">אמצעי תשלום</p>
          <p class="mb-0">{{ subscription.cardNumber || 'לא נמצא אמצעי תשלום' }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold mb-0">סניף</p>
          <p class="mb-0">{{ subscription.station.name }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-base font-semibold mb-0">קופון</p>
          <p class="mb-0">none</p>
        </div>
      </div>
    </VCard>
  </div>
</template>
