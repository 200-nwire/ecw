<template>
  <div>
    <Button
      :label="$t(options[type].label)"
      @click="() => {}"
      raised
      severity="special"
      :pt="preset"
      :ptOptions="{ mergeSections: false, mergeProps: true }"
      size="small"
    >
      <template #icon>
        <component :is="options[type].icon" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import WinnerCup from '@/assets/winner_cup.svg'
import Wallet from '@/assets/wallet.svg'
import type { PropType } from 'vue'

type SpecialTypes = 'recharge' | 'rank'

const options = {
  rank: {
    label: 'stations.station-details.watch-rank-table',
    icon: WinnerCup
  },
  recharge: {
    label: 'clients.recharge',
    icon: Wallet
  }
}

const props = defineProps({
  type: {
    type: String as PropType<SpecialTypes>,
    required: true,
  },
})

const preset = {
  root: ({ props, context, parent }) => ({
    class: [
      {
        '!px-7 !py-2': props.size === 'small',
        '!px-7 !py-3': props.size === null,
      },

      {
        'text-on-action': props.severity === 'special',
        'bg-primary-level-3': props.severity === 'special',
        'hover:bg-primary-level-4': props.severity === 'special',
        'focus:ring-primary-level-4': props.severity === 'special',
      },
    ],
  }),
}
</script>
