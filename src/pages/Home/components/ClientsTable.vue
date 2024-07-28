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
        // FIXME
        // '!border-r-table-status-green': data.status === SubscriptionStatus.ACTIVE,
        // 'border-r-table-status-red': data.statusIndicator === SubscriptionStatus.CANCELED,
        // 'border-r-table-status-orange': data.statusIndicator === SubscriptionStatus.UNPAID,
        // '!border-r-table-status-grey': data.subscription === EMPTY_FIELD,
      }"
          >
            {{ data?.row }}
          </div>
        </template>
      </Column>
      <Column
        field="name"
        frozen
        :header="$t('clients.table.client-name')"
        bodyClass="!text-body-1-semi"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="company"
        :header="$t('clients.table.company-name')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="date"
        :header="$t('clients.table.date')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="points"
        :header="$t('clients.table.client-value')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="phone"
        :header="$t('clients.table.client-phone')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
      </Column>
      <Column
        field="totalPurchases"
        :header="$t('clients.table.products')"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <ShoppingBag :size="20" />
            {{ data.totalPurchases }}
          </div>
        </template>
        <template #loading>
          <TableLoadingSkeleton />
        </template>

      </Column>
      <Column
        field="source"
        :header="$t('clients.table.source')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>

      </Column>
      <Column
        field="subscriptions"
        :header="$t('clients.table.subscribers')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
        <template #body="{ data }">
          <div class="flex flex-col gap-4">
            <div
              v-for="sub in data?.subscriptions ?? []"
              class=""
              :key="sub.id"
            >
              <div
                class="flex items-center gap-2 rounded-full px-5 py-1 w-min"
                :class="{
        // FIXME:
        'bg-status-active': sub.status === 'ACTIVE',
        'bg-status-cancelled': sub.status === 'CANCELED',
        'bg-status-hold': sub.status === 'UNPAID',
        'bg-status-end': sub.status === 'ENDED',
      }"
              >
                <span
                  class="rounded-full h-[14px] w-[14px]"
                  :class="{
        // FIXME:
        'bg-green-500': sub.status === 'ACTIVE',
        'bg-red-500': sub.status === 'CANCELED',
        'bg-orange-500': sub.status === 'UNPAID',
        'bg-lime-600': sub.status === 'ENDED',
      }"
                ></span>
                <span
                  class="!text-body-1-semi"
                  :class="{
        // FIXME:
        'text-active': sub.status === 'ACTIVE',
        'text-cancelled': sub.status === 'CANCELED',
        'text-hold': sub.status === 'UNPAID',
        'text-end': sub.status === 'ENDED',
      }"
                >{{ sub.car }}</span>
              </div>
            </div>
          </div>
        </template>
      </Column>
      <Column
        field="subscriptions"
        :header="$t('clients.table.subscribers-station')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
        <template #body="{ data }">
          <div class="flex flex-col gap-4">
            <div
              v-for="sub in data?.subscriptions ?? []"
              class=""
              :key="sub.id"
            >
              {{ sub.station?.name }}
            </div>
          </div>
        </template>
      </Column>
      <Column
        field="subscriptions"
        :header="$t('clients.table.subscribers-plan')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
        <template #body="{ data }">
          <div class="flex flex-col gap-4">
            <div
              v-for="sub in data?.subscriptions ?? []"
              class=""
              :key="sub.id"
            >
              <span>{{ sub?.plan?.description?.replace('ווקס+ניגוב', '') }}</span>
              <Star v-if="sub?.plan?.description?.includes('ווקס+ניגוב')" />
            </div>
          </div>
        </template>
      </Column>
      <Column
        field="subscriptions"
        :header="$t('clients.table.subscribers-charge')"
      >
        <template #loading>
          <TableLoadingSkeleton />
        </template>
        <template #body="{ data }">
          <div class="flex flex-col gap-4">
            <div
              v-for="sub in data?.subscriptions ?? []"
              class=""
              :key="sub.id"
            >
              {{ getFormattedDate(sub.expiresOn) }}
            </div>
          </div>
        </template>
      </Column>
      <!-- <Column
            field="subscriptions"
            :header="$t('סניף')"
            bodyClass="!text-body-1-semi"
            >
            <template #loading>
              <TableLoadingSkeleton />
            </template>
            <template #body="{ data }">
              <div v-for="sub in data.subscriptions" class="" :key="sub.id">
                {{ sub.car }}
                </div>
            </template>
          </Column> -->

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
import { computed, nextTick, onMounted, ref } from 'vue'
import { getFormattedDate } from '@/composables/useDate'
// import type { PropType } from 'vue'
import Bucket from '@/assets/bucket.svg?component'
import TableLoadingSkeleton from '@/pages/Home/components/TableLoadingSkeleton.vue'
import { useElementBounding } from '@vueuse/core'
import Star from '@/assets/star.svg?component'
import { ShoppingBag } from 'lucide-vue-next'

const props = defineProps({
  clients: {
    type: Array as any,
    // type: Array as PropType<IWash[]>,
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

const emit = defineEmits(['onLoadMoreClients'])

// const SubscriptionStatus = {
//   ACTIVE: 'ACTIVE',
//   UNPAID: 'UNPAID',
//   PAUSED: 'PAUSED',
//   CANCELED: 'CANCELED',
// }

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
    || (last >= data.value.length && data.value.length === 0)) // in case there is no data
    return;
  emit('onLoadMoreClients')
};

// const calcValueOfPercentage = (percentage: number, total: number): number => {
//   return Math.floor((percentage * total) / 100)
// }

const EMPTY_FIELD = '---------'

const data = computed(
  () =>
    props.loading && !props.clients?.length ? Array.from({ length: 10 }) : props.clients?.map(({ node: { id, profile, company, createdOn, points, totalPurchases, subscriptions, status, image, subscription } }, index) => ({
      id,
      row: `${index + 1}`,
      name: profile?.name && profile?.name !== ' ' ? profile?.name : EMPTY_FIELD,
      company: company?.name ?? EMPTY_FIELD,
      date: getFormattedDate(createdOn),
      points,
      phone: profile?.phone ?? EMPTY_FIELD,
      totalPurchases,
      source: profile?.source ?? EMPTY_FIELD,
      subscriptions,
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
