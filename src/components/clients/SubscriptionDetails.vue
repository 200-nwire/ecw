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
  <div class="grid gap-2 grid-cols-1 md:grid-cols-2">
    <VCard
      v-if="client.account.subscriptions"
      v-for="(subscription, index) in client.account.subscriptions"
      :key="index"
      class="pa-3 pl-3 pr-3"
    >
      <div
        class="flex items-center justify-between border-r-[9px] border-r-solid pr-2"
        :class="{
          'border-r-[green]': subscription.status === 'ACTIVE',
          'border-r-[red]': subscription.status !== 'ACTIVE',
        }"
      >
        <div>
          <span class="text-[#4a74eb] text-base font-normal">{{ subscription.metering }}/{{ subscription.usage }}</span>
        </div>
        <div class="flex flex-col items-end">
          <p class="flex items-center gap-x-2 text-xl font-bold">
            <span>({{ subscription.label }}){{ subscription.car }}</span>
            <span>רכב מספר</span>
          </p>
          <p class="txet-xs font-normal">נרשם ב {{ getFormattedDate(subscription.createdOn) }}</p>
        </div>
      </div>
      <div
        class="flex items-center justify-between px-4 py-2"
        dir="rtl"
      >
        <div class="flex flex-col items-start">
          <p class="text-base font-semibold">מסלול</p>
          <p>{{ subscription.plan.description }}</p>
        </div>
        <div class="flex flex-col items-start">
          <p class="text-base font-semibold">חיוב קרוב</p>
          <p>{{ getFormattedDate(subscription.chargedOn) }}</p>
        </div>
        <div class="flex flex-col items-start">
          <p class="text-base font-semibold">אמצעי תשלום</p>
          <p>{{ subscription.cardNumber || 'לאה נמצא אמצעי תשלום' }}</p>
        </div>
      </div>
      <div
        class="flex items-center gap-x-[20%] px-4"
        dir="rtl"
      >
        <div class="flex flex-col items-start">
          <p class="text-base font-semibold">סניף</p>
          <p>{{ subscription.station.name }}</p>
        </div>
        <div class="flex flex-col items-start">
          <p class="text-base font-semibold">קופון</p>
          <p>none</p>
        </div>
      </div>
    </VCard>
  </div>
</template>
