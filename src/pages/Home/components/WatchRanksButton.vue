<template>
  <div>
    <Button
      :label="$t('stations.station-details.watch-rank-table')"
      @click="() => {}"
      raised
      severity="rank"
      :pt="preset"
      :ptOptions="{ mergeSections: false, mergeProps: true }"
      size="small"
    >
      <template #icon>
        <WinnerCup />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import WinnerCup from '@/assets/winner_cup.svg'

const preset = {
  root: ({ props, context, parent }) => ({
    class: [
      {
        '!px-7 !py-2': props.size === 'small',
        '!px-7 !py-3': props.size === null,
      },

      {
        'text-on-action': props.severity === 'rank',
        'bg-primary-level-3': props.severity === 'rank',
        'hover:bg-primary-level-4': props.severity === 'rank',
        'focus:ring-primary-level-4': props.severity === 'rank',
      },
    ],
  }),
}
</script>
