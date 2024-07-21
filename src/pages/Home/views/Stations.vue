<template>
  <MainLayout>
    <template #sidebar>
      <StationsSidebar v-model="view" />
    </template>
    <template #main-content>
      <div
        v-if="view === 'stats'"
        class="flex flex-col flex-1 gap-8"
      >
        <label class="flex items-center text-headline-2">
          {{ $t('stations.stations-sidebar.stations-stats') }}
        </label>
      </div>
      <div
        v-else
        class="flex flex-col flex-1 gap-8"
      >
        <!-- headers -->
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-xs">
            <label
              v-if="!currStationLoading"
              class="flex items-center text-headline-2"
            >
              {{ `${$t('general.station')} ${currStation?.name}` }}
              <StationDetailsDrawer :curr-station="currStation" />
            </label>
            <Skeleton
              v-else
              width="10em"
              height="1.5rem"
              class="py-2"
            />
            <label
              v-if="!currStationLoading"
              class="text-body-1"
              >{{ currStation?.location?.address }}</label
            >
            <Skeleton
              v-else
              width="14em"
              height="1rem"
              class="my-2"
            />
          </div>
          <div
            v-if="!currStationLoading"
            class="flex gap-4 items-center"
          >
            <div>
              <a
                :href="tvURL"
                target="_blank"
              >
                <Button
                  severity="neutral"
                  text
                  raised
                  ><template #icon>
                    <Cctv :size="20" />
                  </template>
                </Button>
              </a>
            </div>
            <div>
              <div class="flex h-12 gap-6 items-center px-7 bg-base-white rounded shadow-sm">
                <label class="text-body-1-semi">{{ $t('stations.station-details.vacuum') }}</label>
                <label class="text-headline-3-semi">{{ currStation?.cleanerCode }}</label>
              </div>
            </div>
            <WatchRanksButton />
          </div>
          <Skeleton
            v-else
            height="36px"
            width="20em"
          />
        </div>
        <!-- filters -->
        <Panel
          toggleable
          collapsed
        >
          <template #header>
            <SearchInput
              :placeholder="$t('stations.search-in-station')"
              v-model="search"
              onLoadMoreWashes
            />
          </template>
          <template #default>
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
          <template #togglericon>
            <ChevronDownCircle
              :size="24"
              class="text-secondary"
            />
          </template>
        </Panel>
        <!-- stats -->
        <div class="flex justify-between items-center">
          <label
            v-if="!stationStore.isLoadingWashes"
            class="text-body-1"
            >{{ `${totalWashesCount} שטיפות היום` }}</label
          >
          <Skeleton
            v-else
            height="1rem"
            width="10em"
          />
          <Button
            label="ייצוא"
            size="xsmall"
            raised
            outlined
            severity="neutral"
          >
            <template #icon>
              <Download :size="14" />
            </template>
          </Button>
        </div>
        <StationTable
          :stationWashes="washes"
          :curr-station="currStation"
          :loading="stationStore.isLoadingWashes"
          :hasNextPage="stationStore.hasNextPage"
          @onLoadMoreWashes="onLoadMoreWashes"
        />
      </div>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import StationsSidebar from '@/pages/Home/components/StationsSidebar.vue'
import WatchRanksButton from '@/pages/Home/components/WatchRanksButton.vue'
import StationTable from '@/pages/Home/components/StationTable.vue'
import { onMounted, ref } from 'vue'
import { useStationStore } from '@/store/stations'
import { useClientStore } from '@/store/clients'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Cctv, ChevronDownCircle, Download } from 'lucide-vue-next'
import { bgColors, textColors } from '@/theme/Colors'
import StationDetailsDrawer from '@/pages/Home/components/Stations/StationDetailsDrawer.vue'
import SearchInput from '@/components/SearchInput.vue'
import { useDebounceFn } from '@vueuse/core'

type View = 'stats' | 'station'

const route = useRoute()

const tvURL = import.meta.env.VITE_WASH_TV_URL

const stationId = computed(() => route.query.stationId as String)

const view = ref<View>(stationId.value ? 'station' : 'stats')

const search = ref('')
// const filters = ref({
//   search: '',
//   dates: { since: '', until: ''},
// // FIXME add subscription type
// });

const searchByText = useDebounceFn(() => {
  onLoadMoreWashes(true)
}, 200)

watch(search, () => {
  searchByText()
})

const stationStore = useStationStore()
const { getWashes, getStationWashesSummary, getStation, resetPreviousStationInfo } = useStationStore()

const clientStore = useClientStore()

const washes = computed(() =>
  stationStore.washes.map((wash: any) => ({
    ...(wash.node ?? {}),
    stationId: wash.node?.station?.id,
  })),
)
const currStation = computed(() => stationStore.currStation)
const currStationLoading = computed(() => stationStore.isLoadingStation)

const totalWashesCount = computed(() => stationStore.totalWashes ?? 0)

const clientsSummary = computed(() => clientStore.clientsSummary)

const subscriptionStats = computed(() => [
  {
    label: 'מנוי פעיל',
    color: bgColors.table.status.green,
    value: clientsSummary.value?.totalSubscriptions?.Active ?? 0,
  },
  {
    label: 'מנוי מבוטל',
    color: bgColors.table.status.red,
    value: clientsSummary.value?.totalSubscriptions?.OnHold ?? 0,
  },
  {
    label: 'מנוי בהשהייה',
    color: bgColors.table.status.orange,
    value: clientsSummary.value?.totalSubscriptions?.Inactive ?? 0,
  },
  {
    label: 'אין מנוי',
    color: bgColors.table.status.grey,
    value: clientsSummary.value?.totalSubscriptions?.NoSubscription ?? 0,
  }, // FIXME:
  {
    label: 'מנוי מתבטל חודש הבא',
    color: textColors.end,
    value: clientsSummary.value?.totalSubscriptions?.NoSubscription ?? 0,
  }, // FIXME:
])

const onLoadMoreWashes = async (initialLoad: boolean) => {
  await getWashes({ station: stationId.value, search: search.value }, initialLoad)
}

const getStationInfo = () => {
  getStation(stationId.value)
  getStationWashesSummary({ station: stationId.value })
  onLoadMoreWashes(true)
}

onMounted(() => {
  stationId.value && getStationInfo()
})

watch(stationId, () => {
  view.value = stationId.value ? 'station' : 'stats'
  resetPreviousStationInfo()
  getStationInfo()
})
</script>

<style>
div[data-pc-section='icons'] {
  @apply flex justify-center items-center;
}
</style>

<!-- FIXME -->

<!-- products need to get from Gefter -->
<!-- add filters UI + fix UI for the stats boxes -->
<!-- responsive -->
<!-- catch backend error and show failure toast to user -->
