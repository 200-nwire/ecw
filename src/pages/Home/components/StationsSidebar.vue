<template>
  <div class="flex flex-col flex-1 py-8 px-7">
    <Menu :model="stationsStatsItems" />
    <Divider class="!my-0" />
    <div class="flex flex-col flex-1 py-2 my-4">
      <div class="flex justify-between items-center">
        <label class="px-4 text-body-1-bold">{{ $t('stations.stations-sidebar.stations', {
        count:
          stationStore.stations.length
      }) }}</label>
        <Button
          @click="() => { }"
          text
          severity="neutral"
          size="small"
        >
          <Ellipsis />
        </Button>
      </div>
      <SearchInput
        v-model="search"
        id="search"
        class="py-2"
        full
        autocomplete="off"
        :placeholder="$t('stations.stations-sidebar.search-station')"
        @reset-search="search = ''"
      />
      <div class="flex flex-col flex-1">
        <ScrollableContainer>
          <Menu
            v-if="!stationStore.isLoadingStations"
            :model="items"
          />
          <Menu
            v-else
            :model="items"
          >
            <template #item>
              <Skeleton class="w-full !h-10 py-3 my-4" />
            </template>
          </Menu>
        </ScrollableContainer>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import ScrollableContainer from '@/components/ScrollableContainer.vue'
import SearchInput from '@/components/Input/SearchInput.vue'
import { useStationStore } from '@/store/stations'
import { computed, onMounted, ref } from 'vue'
import { Ellipsis } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { filter } from 'lodash'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const view = defineModel<String>()

const stationStore = useStationStore()
const { getStations } = stationStore
const router = useRouter()

const search = ref('')

const currStation = computed(() => stationStore.currStation)

const items = computed(() =>
  stationStore.isLoadingStations ?
    (new Array(10)).fill({ label: '' }) :
    filter(stationStore.stations, ({ name }) => name.toLowerCase().includes(search.value.toLowerCase()))?.map(station => ({
      label: station.name,
      class: currStation.value?.id === station.id ? 'bg-primary-level-2 rounded-xxs' : '',
      command: () => {
        router.push(`/stations?stationId=${station.id}`)
      },
    })),
)

const stationsStatsItems = computed(() =>
    [{
      label: t('stations.stations-sidebar.stations-stats'),
      class: view.value === 'stats' ? 'bg-primary-level-2 rounded-xxs' : '',
      command: () => {
        router.push('/stations')
      },
    }],
)

onMounted(() => {
  getStations()
});
</script>

<!-- FIXME -->

<!-- handle the use case where there is no sidebar  -->
<!-- handle the use case where they entered the /stations page without a stationId for admin user -->
<!-- handle the use case where they entered the /stations page without a stationId for station manager -->
