<script setup lang="ts">
import type { IClientSummary } from '@/interfaces/clientSummary'

const props = defineProps({
  clientsSummary: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="flex flex-wrap gap-y-3 items-center justify-between my-4 border-[1px] border-solid border-gray p-4 bg-white"
  >
    <div class="border-e-[9px] border-e-solid border-e-[red] pr-2">
      <span class="mr-2">{{ (clientsSummary as IClientSummary).totalAccounts.Active }}</span
      ><span>לקוח פעיל</span>
    </div>
    <div class="border-e-[9px] border-e-solid border-e-[green] pr-2">
      <span class="mr-2">{{ (clientsSummary as IClientSummary).totalAccounts.OnHold }}</span
      ><span>לקוח בהשהייה</span>
    </div>
    <div class="border-e-[9px] border-e-solid border-e-[red] pr-2">
      <span class="mr-2">{{ (clientsSummary as IClientSummary).totalSubscriptions.Active }}</span
      ><span>רכב פעיל</span>
    </div>
    <div class="border-e-[9px] border-e-solid border-e-[yellow] pr-2">
      <span class="mr-2">{{ (clientsSummary as IClientSummary).totalSubscriptions.Inactive }}</span
      ><span>רכב מושהה</span>
    </div>
    <div class="border-e-[9px] border-e-solid border-e-[green] pr-2">
      <span class="mr-2">{{ (clientsSummary as IClientSummary).totalSubscriptions.OnHold }}</span
      ><span>רכב מבוטל</span>
    </div>
  </div>
</template>
