<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate'
import type { IClient } from '@/interfaces/client'
import router from '@/router'

const props = defineProps({
  clients: {
    type: Array,
    required: true,
  },
})

const gotToClientPage = (clientId: string) => {
  router.push({ path: `clients/${clientId}` })
}
</script>

<template>
  <VCard
    v-for="(client, index) in clients"
    :key="index"
    class="gap-x-2 flex-1"
    dir="rtl"
    @click="gotToClientPage((client as IClient).node.id)"
  >
    <div
      class="flex flex-row items-center justify-between border-r-[9px] border-r-solid pr-4 pb-4 pt-4"
      :class="{ 'border-r-[red]': (client as IClient).node.status === 'INACTIVE',
        'border-r-[green]': (client as IClient).node.status === 'ACTIVE'
      }"
    >
      <VCardText class="flex-1 pt-0 pb-0 pl-0 pr-1 w-[20%] sm:w-[8%] overflow-hidden">{{
        (client as IClient).node.profile.name || ' '
      }}</VCardText>
      <VCardText class="hidden sm:flex-1 sm:pt-0 sm:pb-0 sm:pl-0 sm:pr-0 sm:w-[8%] sm:overflow-hidden">{{
        getFormattedDate((client as IClient).node.createdOn) || ' '
      }}</VCardText>
      <VCardText class="flex-1 pt-0 pb-0 pl-0 pr-0 w-[20%] sm:w-[8%] overflow-hidden">{{
        (client as IClient).node.profile.phone || ' '
      }}</VCardText>
      <VCardText class="hidden sm:flex-1 sm:pt-0 sm:pb-0 sm:pl-0 sm:pr-0 sm:w-[8%] sm:overflow-hidden">{{
        (client as IClient).node.profile.source || 'אחר'
      }}</VCardText>
      <VCardText class="hidden sm:flex-1 sm:pt-0 sm:pb-0 sm:pl-0 sm:pr-0 sm:w-[8%] sm:overflow-hidden">
        {{ (client as IClient).node.points }}
      </VCardText>
      <VCardText class="hidden sm:flex-1 sm:pt-0 sm:pb-0 sm:pl-0 sm:pr-0 sm:w-[8%] sm:overflow-hidden">{{
        (client as IClient).node.totalPurchases
      }}</VCardText>
      <div class="hidden sm:w-[8%] sm:overflow-hidden sm:pl-8">
        <VCardText
          v-for="(subscription, index) in (client as IClient).node.subscriptions"
          :key="index"
          class="pt-0 pb-0 pl-0 pr-0"
        >
          {{ subscription.station.name || ' ' }}
        </VCardText>
      </div>
      <div class="w-[20%] sm:w-[8%] overflow-hidden">
        <VCardText
          v-for="(subscription, index) in (client as IClient).node.subscriptions"
          :key="index"
          class="pt-0 pb-0 pl-0 pr-0 mb-1 flex items-center gap-x-2"
        >
          <div
            class="h-[0.75rem] w-[0.75rem] rounded-[50%]"
            :class="{
              'bg-[red]': subscription.status === 'CANCELED' || subscription.status === 'UNPAID',
              'bg-[yellow]': subscription.status === 'PENDING',
              'bg-[green]': subscription.status === 'ACTIVE',
            }"
          ></div>
          <span>{{ subscription.car || ' ' }}</span>
        </VCardText>
      </div>
      <div class="w-[20%] sm:w-[8%] overflow-hidden">
        <VCardText
          v-for="(subscription, index) in (client as IClient).node.subscriptions"
          :key="index"
          class="pt-0 pb-0 pl-0 pr-0 text-[#27c4a6]"
        >
          {{ getFormattedDate(subscription.expiresOn) || ' ' }}
        </VCardText>
      </div>
      <div class="hidden sm:w-[8%] sm:overflow-hidden">
        <VCardText
          v-for="(subscription, index) in (client as IClient).node.subscriptions"
          :key="index"
          class="pt-0 pb-0 pl-0 pr-0"
        >
          {{ subscription.plan.description || ' ' }}
        </VCardText>
      </div>
      <VCardText class="text-[#27c4a6] flex-1 pt-0 pb-0 pl-0 pr-0 whitespace-nowrap">חיוב תשלום</VCardText>
    </div>
  </VCard>
</template>
