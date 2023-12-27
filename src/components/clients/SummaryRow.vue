<script setup lang="ts">
import type { IClientSummary } from '@/interfaces/clientSummary';

const props = defineProps({
  clientsSummary: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 my-2">
    <div class="border-r-[8px] border-r-solid border-r-[#12AAA3] flex gap-2 px-2">
      <span>לקוח פעיל</span>
      <span>({{ (clientsSummary as IClientSummary).totalAccounts.Active }})</span>
    </div>
    <div class="border-r-[8px] border-r-solid border-r-[#FBE28A] flex gap-2 px-2">
      <span>לקוח בהשהייה</span>
      <span>({{ (clientsSummary as IClientSummary).totalAccounts.OnHold }})</span>
    </div>
    <div class="flex gap-2">
      <v-icon icon="mdi-circle-medium" color="green"></v-icon>
      <span>רכב פעיל</span>
      <span>({{ (clientsSummary as IClientSummary).totalSubscriptions.Active }})</span>
    </div>
    <div class="flex gap-2">
      <v-icon icon="mdi-circle-medium" color="yellow"></v-icon>
      <span>רכב מושהה</span>
      <span>({{ (clientsSummary as IClientSummary).totalSubscriptions.Inactive }})</span>
    </div>
    <div class="flex gap-2">
      <v-icon icon="mdi-circle-medium" color="red"></v-icon>
      <span>רכב מבוטל</span>
      <span>({{ (clientsSummary as IClientSummary).totalSubscriptions.OnHold }})</span>
    </div>
  </div>
</template>
