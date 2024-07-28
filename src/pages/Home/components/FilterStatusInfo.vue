<template>
  <div class="flex">
    <div
      v-for="(stat, index) in subscriptionStats"
      :key="index"
      class="flex"
    >
      <div class="flex-col py-5 px-7 gap-2 w-[11.25rem]">
        <div class="flex items-center gap-3">
          <span
            class="h-5 w-5 rounded-full"
            :style="{ backgroundColor: stat.color }"
          ></span>
          <label class="text-body-1-semi text-secondary">{{ stat.label }}</label>
        </div>
        <label class="text-headline-2 px-7 text-primary">{{ stat.value }}</label>
      </div>
      <Divider
        v-if="index < subscriptionStats.length - 1"
        layout="vertical"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { bgColors, textColors } from '@/theme/Colors'
import { useStationStore } from '@/store/stations'
import { computed } from 'vue'

const stationStore = useStationStore()

const washesSummary = computed(() => stationStore.currStationWashesSummary)

const subscriptionStats = computed(() => [
  {
    label: 'מנוי פעיל',
    color: bgColors.table.status.green,
    value: washesSummary.value?.totalActive ?? 0,
  },
  {
    label: 'מנוי מבוטל',
    color: bgColors.table.status.red,
    value: washesSummary.value?.totalCanceled ?? 0,
  },
  {
    label: 'מנוי בהשהייה',
    color: bgColors.table.status.orange,
    value: washesSummary.value?.totalUnpaid ?? 0,
  },
  {
    label: 'אין מנוי',
    color: bgColors.table.status.grey,
    value: washesSummary.value?.totalGuests ?? 0,
  },
  {
    label: 'מנוי מתבטל חודש הבא',
    color: textColors.end,
    value: washesSummary.value?.totalSubscriptions?.NoSubscription ?? 0,
  }, // FIXME:
])

</script>
