<template>
  <div class="flex flex-col flex-1 gap-sm py-8 px-7">
    <Button
      :label="$t('stations.stations-sidebar.stations-stats')"
      @click="
        () => {
          view = 'stats'
          router.push('/stations')
        }
      "
      text
      severity="neutral"
      :selected="view === 'stats'"
      class="!text-start !px-4"
    />
    <Divider />
    <div class="flex flex-col flex-1 gap-md px-4 py-2">
      <div class="flex justify-between items-center">
        <label>{{ $t('stations.stations-sidebar.stations', { count: stationStore.stations.length }) }}</label>
        <Button
          @click="() => {}"
          text
          severity="neutral"
          size="small"
        >
          <Ellipsis />
        </Button>
      </div>
      <IconField iconPosition="right">
        <InputIcon>
          <Search
            :color="colors.base.black"
            :size="16"
          />
        </InputIcon>
        <InputText
          v-model="search"
          id="search"
          class="w-full"
        />
      </IconField>
      <div class="flex flex-col flex-1">
        <ScrollableContainer>
          <Menu :model="items" />
        </ScrollableContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollableContainer from '@/components/ScrollableContainer.vue'
import { useStationStore } from '@/store/stations'
import { computed, onMounted, ref } from 'vue'
import { Ellipsis, Search } from 'lucide-vue-next'
import { colors } from '@/theme/Colors'
import { useRouter } from 'vue-router'

const view = defineModel<String>('stats')

const stationStore = useStationStore()
const { getStations } = stationStore
const router = useRouter()

const search = ref('')

const items = computed(() =>
  stationStore.stations.map(station => ({
    label: station.name,
    command: () => {
      view.value = 'station'
      router.push(`/stations?stationId=${station.id}`)
    },
  })),
)

onMounted(() => {
  getStations()
})
</script>

<!-- FIXME -->

<!-- add loading skeleton - use stationStore.isLoadingStations -->
<!-- handle the use case where there is no sidebar  -->
<!-- handle the use case where they entered the /stations page without a stationId for admin user -->
<!-- handle the use case where they entered the /stations page without a stationId for station manager -->
<!-- work on ui for side menu -->
