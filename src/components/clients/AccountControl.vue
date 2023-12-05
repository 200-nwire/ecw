<script setup lang="ts">
import { getFormattedDate, getFormattedTime } from '@/composables/useDate'
import { extractData } from '@/composables/useJSON'
import type { IControl } from '@/interfaces/control'
import type { IWash } from '@/interfaces/wash'
import { useControlStore } from '@/store/control'
import { useStationStore } from '@/store/stations'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const props = defineProps({
  accountControl: {
    type: Object,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
})

interface SortedActions {
  [date: string]: IControl[]
}

const controllStore = useControlStore()
const { getControlForAccount } = useControlStore()

const stationStore = useStationStore()
const { getWashes } = useStationStore()

onMounted(async () => {
  await getWashes({}, true)
})

const hasNextPageControl = computed(() => controllStore.hasNextPage)
const endCursorControl = computed(() => controllStore.endCursor)

const hasNextPageStations = computed(() => stationStore.hasNextPage)
const endCursorStations = computed(() => stationStore.endCursor)

const isLoading = ref(false)

const showWashes = ref(false)

const washes = computed(() => stationStore.fullClientWashes)

const handleScroll = async (ev: WheelEvent) => {
  const token = localStorage.getItem('token')
  const scrollableElement = ev.target as HTMLElement
  const loadMoreResults =
    scrollableElement &&
    scrollableElement.offsetHeight + scrollableElement.scrollTop + 1 >= scrollableElement.scrollHeight &&
    token &&
    (hasNextPageControl.value as Boolean)
  if (loadMoreResults) {
    isLoading.value = true
    await getControlForAccount({ clientId: props.clientId as any, first: 10 }, endCursorControl.value)
    if (showWashes.value && hasNextPageStations) {
      await getWashes({ clientId: props.clientId, first: 100, after: endCursorStations.value }, true)
    }
    isLoading.value = false
  }
}

const actionMap: any = {
  SUBSCRIPTION_RESUMED: 'חידוש מסלול',
  SUBSCRIPTION_CANCELED: 'רכב בוטל',
  SUBSCRIPTION_CREATED: 'רכב חדש',
  SUBSCRIPTION_PAYMENT_METHOD_ADDED: 'כרטיס אשראי חדש התווסף',
  SUBSCRIPTION_ACTIVATED: 'כרטיס אשראי חדש התווסף',
  SUBSCRIPTION_PAUSED: 'בעיה בחיוב',
  SUBSCRIPTION_PAYMENT_SUCCEEDED: 'תהליך תשלום רכב הצליח',
  ACCOUNT_UPDATED: 'עדכון מלקוח',
  ACCOUNT_CREATED: 'הלקוח התווסף',
  ORDER_PLACED: 'מוצר בתהליך רכישה',
  ORDER_ACCEPTED: 'הזמנת מוצר התקבלה',
  ORDER_PAYMENT_SUCCEEDED: 'תשלום מוצר הצליח',
  CAR_WASHED: 'רכב נשטף',
}

const sortedClientActions = (accountControl: object) => {
  const transformedActions = extractData(accountControl)
  if (showWashes.value) {
    const transformedWashes = extractData(washes.value)
    transformedWashes.forEach((wash: IWash) => {
      transformedActions.push({
        node: {
          id: wash.node.id,
          createdOn: wash.node.washedOn,
          name: 'CAR_WASHED',
        },
      })
    })
  }
  const sortedActions = transformedActions.reduce((acc: SortedActions, action: IControl) => {
    const actionDate = getFormattedDate(action.node.createdOn) as string
    if (!acc[actionDate]) acc[actionDate] = []
    acc[actionDate].push(action)
    return acc
  }, {})
  for (const date in sortedActions) {
    sortedActions[date].sort((a: any, b: any) /* not sure if this needs to change */ => {
      return b.node.createdOn - a.node.createdOn
    })
  }
  return sortedActions
}
</script>

<template>
  <loading
    v-model:active="isLoading"
    :is-full-page="true"
  />
  <VCard
    class="px-12 py-6 max-h-[70%] overflow-auto control-for-account"
    @scroll="handleScroll"
  >
    <div
      class="flex items-center justify-between w-full sticky top-[0%]"
      dir="rtl"
    >
      <h3 class="text-xl font-bold text-[#2087e3]">פעולות לקוח</h3>
      <VCheckbox
        v-model="showWashes"
        class="whitespace-nowrap"
        >הצג שטיפות</VCheckbox
      >
    </div>
    <div
      v-for="(actions, key) in sortedClientActions(props.accountControl)"
      :key="key"
      class="flex flex-col items-end"
    >
      <div class="flex flex-col items-end justify-start">
        <span class="text-base font-normal text-[#3e97ff]">
          {{ key }}
        </span>
        <div
          v-for="action in actions"
          class="flex flex-col items-end pr-4 my-2 border-r-[1px] border-dashed border-black"
        >
          <span class="font-semibold">{{ getFormattedTime(action.node.createdOn) }}</span>
          <span class="text-base font-normal">{{ actionMap[action.node.name] }}</span>
        </div>
      </div>
    </div>
  </VCard>
</template>

<style>
.control-for-account::-webkit-scrollbar {
  display: none;
}

.control-for-account {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
