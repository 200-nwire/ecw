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
        class="flex flex-col flex-1 gap-5"
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
            >{{ currStation?.location?.address }}</label>
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
            <SpecialButton type="rank" />
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
            <div class="flex items-center gap-sm">
              <DatePickerInput v-model="dates" />
              <SearchInput
                :placeholder="$t('stations.search-in-station')"
                v-model="search"
                @reset-search="search = ''"
                :style="'neutral'"
              />
              <Button
                :label="$t('filters.reset-search')"
                link
                class="text-secondary !min-w-0 !px-7"
                @click="resetFilters"
              />
            </div>
          </template>
          <template #default>
            <FilterStatusInfo />
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
            v-if="!stationStore.isLoadingWashesInitial"
            class="text-body-1"
          >{{ `${totalWashesCount} שטיפות ${preDefinedRangeOption?.label ?? getRangeDatesString(dates)}` }}</label>
          <Skeleton
            v-else
            height="1rem"
            width="10em"
          />
          <ExtraSmallButton
            label="ייצוא"
            size="small"
            raised
            outlined
            severity="neutral"
          >
            <template #icon>
              <Download :size="14" />
            </template>
          </ExtraSmallButton>
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

<script
  setup
  lang="ts"
>
import MainLayout from '@/layouts/MainLayout.vue'
import StationsSidebar from '@/pages/Home/components/StationsSidebar.vue'
import SpecialButton from '@/components/Button/SpecialButton.vue'
import StationTable from '@/pages/Home/components/StationTable.vue'
import FilterStatusInfo from '@/pages/Home/components/FilterStatusInfo.vue'
import { onMounted, ref } from 'vue'
import { useStationStore } from '@/store/stations'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Cctv, ChevronDownCircle, Download } from 'lucide-vue-next'
import StationDetailsDrawer from '@/pages/Home/components/Stations/StationDetailsDrawer.vue'
import SearchInput from '@/components/Input/SearchInput.vue'
import DatePickerInput from '@/components/Input/DatePickerInput.vue'
import { useDebounceFn } from '@vueuse/core'
import ExtraSmallButton from '@/components/Button/ExtraSmallButton.vue'
import { getRangeDatesString, useDate } from '@/composables/useDate';
import { isEqual } from 'lodash'

type View = 'stats' | 'station'

const route = useRoute()

const tvURL = import.meta.env.VITE_WASH_TV_URL

const stationId = computed(() => route.query.stationId as string)

const view = ref<View>(stationId.value ? 'station' : 'stats')
console.log('view.value :>> ', view.value);

const { dateOptions } = useDate();
const preDefinedRangeOption = computed(() => 
  dateOptions.find(({ getDates }) => isEqual(getDates(), dates.value))
)

const search = ref<string>('')
const dates = ref<number[]>(dateOptions[0].getDates())

const resetFilters = () => {
  search.value = '';
  dates.value = dateOptions[0].getDates();
};

const searchByText = useDebounceFn(() => {
  onLoadMoreWashes(true)
}, 200)

watch(search, () => {
  searchByText()
})

watch(dates, () => {
  onLoadMoreWashes(true)
})

const stationStore = useStationStore()
const { getWashes, getStationWashesSummary, getStation, resetPreviousStationInfo } = useStationStore()

const washes = computed(() =>
  stationStore.washes.map((wash: any) => ({
    ...(wash.node ?? {}),
    stationId: wash.node?.station?.id,
  })),
)
const currStation = computed(() => stationStore.currStation)
const currStationLoading = computed(() => stationStore.isLoadingStation)

const totalWashesCount = computed(() => stationStore.totalWashes ?? 0)

const onLoadMoreWashes = async (initialLoad: boolean) => {
  const filters = {
    station: stationId.value,
    search: search.value,
    dates: dates.value,
  }

  await getWashes(filters, initialLoad)
  getStationWashesSummary(filters)
}

const getStationInfo = () => {
  getStation(stationId.value)
  onLoadMoreWashes(true)
}

onMounted(() => {
  stationId.value && getStationInfo()
})

watch(stationId, () => {
  view.value = stationId.value ? 'station' : 'stats'
  console.log('view.value :>> ', view.value);
  resetPreviousStationInfo()
  getStationInfo()
});
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
