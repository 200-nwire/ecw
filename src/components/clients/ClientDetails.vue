<script setup lang="ts">
import { getFormattedDate } from '@/composables/useDate';
const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <VCard class="pl-3 pr-3 pa-3" v-if="client.account">
    <div class="flex items-center justify-between mb-2 mx-4">
      <div class="flex gap-x-2 text-2xl font-semibold" dir="rtl">
        <p>{{ client.account.profile.lastname }}</p>
        <p>{{ client.account.profile.firstname }}</p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-[#4a74eb] text-base font-semibold" v-if="client.account.createdOn">
          נרשם ב {{ getFormattedDate(client.account.createdOn) }}
        </p>
        <p class="text-[#4a74eb] text-xs">ווש בק {{ client.account.points }}</p>
        <p v-if="client.account.source">הגעה מ {{ client.account.source }}</p>
      </div>

    </div>
    <div class="flex items-center justify-between mx-4" dir="rtl">
      <div class="flex flex-col items-start">
        <p class="text-base font-semibold m-0">טלפון</p>
        <p class="text-[#2087e3] m-0">{{ client.account.profile.phone }}</p>
      </div>
      <div class="flex flex-col items-start">
        <p class="text-base font-semibold m-0">דוא"ל</p>
        <p class="m-0">{{ client.account.profile.email }}</p>
      </div>
      <div class="flex flex-col items-start">
        <p class="text-base font-semibold m-0">ערך לקוח</p>
        <p class="text-[#ff923e] m-0">{{ client.account.value }}</p>
      </div>
    </div>
  </VCard>
</template>
