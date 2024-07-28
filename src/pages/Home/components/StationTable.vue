<template>
  <div
    class="flex flex-1"
    ref="tableRect"
  >
    <DataTable
      :value="data"
      scrollable
      scrollHeight="flex"
      class="rounded-sm"
      tableStyle="min-width: 50rem"
      :pt="preset"
      :ptOptions="{ mergeSections: false, mergeProps: true }"
      :virtualScrollerOptions="{ lazy: true, onLazyLoad: onLazyLoad, itemSize: 46, delay: 0, showLoader: loading, loading: loading, numToleratedItems: 10 }"
    >
      <Column
        field="status"
        frozen
        class="!p-0"
        style="width: 40px"
      >
        <template #body="{ data }">
          <div
            class="border-r-[4px] border-r-transparent p-7 !px-2 text-left"
            :class="{
        '!border-r-table-status-green': data.status === SubscriptionStatus.ACTIVE,
        'border-r-table-status-red': data.statusIndicator === SubscriptionStatus.CANCELED,
        'border-r-table-status-orange': data.statusIndicator === SubscriptionStatus.UNPAID,
        '!border-r-table-status-grey': data.subscription === EMPTY_FIELD,
      }"
          >
            {{ data.row }}
          </div>
        </template>
      </Column>
      <Column
        field="name"
        frozen
        :header="$t('stations.table.headers.customer-name')"
        bodyClass="!text-body-1-semi"
        :style="`max-width: ${calcValueOfPercentage(10, tableRect?.width ?? 0)}px; min-width: 134px`"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="car"
        :header="$t('stations.table.headers.subscription-number')"
        bodyClass="!text-body-1-semi"
        style="min-width: 98px"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="time"
        :header="$t('stations.table.headers.time')"
        style="min-width: 56px"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="date"
        :header="$t('stations.table.headers.date')"
        style="min-width: 84px"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="products"
        :header="$t('stations.table.headers.products')"
        style="min-width: 76px"
      >
        <template>
          <ShoppingBag :size="16" />
        </template>
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="subscription"
        :header="$t('stations.table.headers.subscription-type')"
        style="min-width: 124px"
        :style="`max-width: ${calcValueOfPercentage(10, tableRect?.width ?? 0)}px;`"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="originStation"
        :header="$t('stations.table.headers.origin-station')"
        style="min-width: 124px"
        :style="`max-width: ${calcValueOfPercentage(10, tableRect?.width ?? 0)}px;`"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="station"
        :header="$t('stations.table.headers.washed-at')"
        style="min-width: 124px"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="count"
        :header="$t('stations.table.headers.total-washes')"
        style="min-width: 80px"
        :style="`max-width: ${calcValueOfPercentage(5, tableRect?.width ?? 0)}px;`"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="image"
        :header="$t('stations.table.headers.image')"
        style="min-width: 56px"
      >
        <template #body="{ data }">
          <CarImage
            :image="data.image"
            :rowData="data"
          />
        </template>
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <template #empty>
        <div class="flex flex-col flex-1 gap-6 justify-center items-center p-14">
          <label class="text-headline-3-semi">{{ $t('stations.table.empty-message') }}</label>
          <Bucket />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between items-center"></div>
      </template>
    </DataTable>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ShoppingBag } from 'lucide-vue-next'
import { computed, nextTick, onMounted, ref } from 'vue'
import { getFormattedDate, getFormattedTime } from '@/composables/useDate'
import type { PropType } from 'vue'
import type { IWash } from '@/interfaces/wash'
import Bucket from '@/assets/bucket.svg'
import TableLoadingSkeleton from '@/pages/Home/components/TableLoadingSkeleton.vue'
import { useElementBounding } from '@vueuse/core'
import CarImage from '@/pages/Home/components/CarImage.vue'

const props = defineProps({
  stationWashes: {
    type: Array as PropType<IWash[]>,
    required: true,
  },
  currStation: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  hasNextPage: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['onLoadMoreWashes'])

const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  UNPAID: 'UNPAID',
  PAUSED: 'PAUSED',
  CANCELED: 'CANCELED',
}

const tableRef = ref<HTMLElement | null>(null)
const tableRect = ref(null as any)

onMounted(async () => {
  nextTick(() => {
    tableRect.value = useElementBounding(tableRef.value)
  })
})

const onLazyLoad = async (event) => {
  let { last } = event;
  if (last < data.value.length
    || props.loading
    || (last >= data.value.length && data.value.length === 0))
    return;
  emit('onLoadMoreWashes')
};

const calcValueOfPercentage = (percentage: number, total: number): number => {
  return Math.floor((percentage * total) / 100)
}

const EMPTY_FIELD = '---------'

const data = computed(
  () =>
    props.loading && !props.stationWashes?.length ? Array.from({ length: 10 }) :
      props.stationWashes?.map(({ id, account, car, washedOn, today, total, status, image, subscription }, index) => ({
        id,
        row: `${index + 1}`,
        name: account?.profile?.name ?? EMPTY_FIELD,
        car,
        time: getFormattedTime(washedOn),
        date: getFormattedDate(washedOn),
        count: `${today}/${total}`,
        status,
        isPremium: subscription?.plan?.description?.includes('ווקס+ניגוב'),
        image,
        products: 0, //FIXME:
        originStation: subscription?.station?.name ?? EMPTY_FIELD,
        station: props.currStation.name,
        subscription: subscription?.plan?.description ?? EMPTY_FIELD,
      })) ?? [],
)

const preset = {
  bodyrow: ({ context, props }) => {
    return {
      class: [
        'hover:bg-neutral-level-2 cursor-pointer',
        { '!bg-table-highlight-orange hover:!bg-table-highlight-orange-hover': props.rowData?.isPremium },
        { '!bg-table-highlight-red hover:!bg-table-highlight-red-hover': props.rowData?.today > 1 },
      ],
    }
  },
  column: {
    bodycell: ({ props, context, state, parent }) => {
      return {
        class: ['overflow-ellipsis whitespace-nowrap overflow-hidden'],
      }
    },
  },
};
</script>

<!-- add new colors to more states -->
<!-- fix products -->
<!-- fix photo -->
<!-- add star to subscriptions -->
