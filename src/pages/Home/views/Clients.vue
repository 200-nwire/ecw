<template>
  <MainLayout>
    <template #main-content>
      <div class="flex flex-col flex-1 gap-5">
        <!-- headers -->
        <div class="flex justify-between items-center">
          <label class="flex text-headline-2">
            {{ $t('clients.clients-title') }}
          </label>
          <div>
            <SpecialButton type="recharge" />
          </div>
        </div>
        <Panel
          toggleable
          collapsed
        >
          <template #header>
            <div class="flex items-center gap-sm">
              <DatePickerInput v-model="dates" />
              
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
            v-if="!clientStore.isLoadingClientsInitial"
            class="text-body-1"
          >{{ $t('clients.clients-total', { total: clientStore.totalAccounts }) }}</label>
          <Skeleton
            v-else
            height="1rem"
            width="10em"
          />
          <div class="flex gap-4">
            <ExtraSmallButton
              label="ייבוא מקובץ"
              size="small"
              raised
              outlined
              severity="neutral"
            >
              <template #icon>
                <Import :size="14" />
              </template>
            </ExtraSmallButton>
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
        </div>
        <ClientsTable
          :clients="clientStore.clients"
          :loading="clientStore.isLoadingClients"
          :hasNextPage="clientStore.hasNextPage"
          @onLoadMoreClients="onLoadMoreClients"
        />
      </div>
    </template>
  </MainLayout>
</template>

<script
  setup
  lang="ts"
>
import SpecialButton from '@/components/Button/SpecialButton.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import DatePickerInput from '@/components/Input/DatePickerInput.vue'
import ClientsTable from '@/pages/Home/components/ClientsTable.vue'
import { watch, onMounted, ref } from 'vue'
import { useClientStore } from '@/store/clients'
import { ChevronDownCircle, Download, Import } from 'lucide-vue-next'
import FilterStatusInfo from '@/pages/Home/components/FilterStatusInfo.vue'
import ExtraSmallButton from '@/components/Button/ExtraSmallButton.vue'
import { useDate } from '@/composables/useDate';
import { useDebounceFn } from '@vueuse/core'

const clientStore = useClientStore()

const { dateOptions } = useDate();

const search = ref<string>('')
const dates = ref<number[]>(dateOptions[0].getDates())

const resetFilters = () => {
  search.value = '';
  dates.value = dateOptions[0].getDates();
};

const searchByText = useDebounceFn(() => {
  onLoadMoreClients(true)
}, 200)

watch(search, () => {
  searchByText()
})

watch(dates, () => {
  onLoadMoreClients(true)
});

const onLoadMoreClients = async (reset = false) => {
  const filters = {
    search: search.value,
    dates: dates.value,
  }

  await clientStore.getClients(filters, reset)
};

onMounted(() => {
  onLoadMoreClients(true)
});
</script>
