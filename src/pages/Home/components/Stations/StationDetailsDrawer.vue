<template>
  <Sidebar
    v-model:visible="visible"
    position="left"
  >
    <template #closeicon>
      <div>
        <Button
          size="small"
          severity="neutral"
          text
          ><template #icon> <X :size="20" /> </template
        ></Button>
      </div>
    </template>
    <template #header>
      <div class="flex flex-1 justify-between items-center">
        <div class="flex gap-7 items-center">
          <label class="flex text-headline-2">
            {{ `${$t('general.station')} ${currStation?.name}` }}
          </label>
          <label class="text-headline-3-semi text-secondary">{{ currStation?.terminal }}</label>
        </div>
        <div class="flex gap-10 items-center">
          <label class="text-body-1-semi text-secondary">{{
            `${$t('stations.station-details.created-on')}
            ${getFormattedDate(currStation?.createdOn)}`
          }}</label>
          <Divider
            layout="vertical"
            class="h-[2.125rem]"
          />
          <span />
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12 h-full px-11 py-9">
      <div class="flex flex-col flex-1 gap-4 overflow-y-auto col-span-11">
        <div class="flex flex-col gap-9">
          <BaseInput
            :label="$t('stations.station-details.description')"
            readonly
            :value="currStation?.location?.address"
          />
          <BaseInput
            :label="$t('stations.station-details.manager')"
            readonly
            :value="currStation?.managers?.map(({ profile }) => profile?.name)?.join(', ')"
          />
          <div class="flex gap-7">
            <BaseInput
              class="w-[8.9rem]"
              :label="$t('stations.station-details.latitude')"
              readonly
              :value="currStation?.location?.lat"
            />
            <BaseInput
              class="w-[8.9rem]"
              :label="$t('stations.station-details.longtitude')"
              readonly
              :value="currStation?.location?.long"
            />
          </div>
          <div class="flex flex-col gap-6">
            <label class="text-body-1-bold text-primary">{{ $t('stations.station-details.open-hours') }}</label>
            <div class="flex flex-col gap-4">
              <div
                v-for="({ order, hours }, index) in openingHours"
                :key="index"
                class="flex gap-8"
              >
                <label class="text-body-1-semi w-12">{{ $t(`general.days-of-week.${order}`) }}</label>
                <p class="text-body-1 text-secondary">{{ hours }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
  <Button
    @click="visible = true"
    text
    severity="neutral"
    class="my-2 mx-2 bg-transparent"
    size="small"
  >
    <Info :size="16" />
  </Button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Info } from 'lucide-vue-next'
import { X } from 'lucide-vue-next'
import { getFormattedDate } from '@/composables/useDate'
import BaseInput from '@/components/Input/BaseInput.vue'
import { orderBy } from 'lodash'

const props = defineProps({
  currStation: {
    type: Object,
    required: true,
  },
})

const visible = ref(false)

const openingHours = computed(() => orderBy(props.currStation?.openingHours, 'order'))
</script>

<!-- FIXME: use the grid on the header as well -->
