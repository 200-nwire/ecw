<script
  lang="ts"
  setup
>
import VueDatePicker from '@vuepic/vue-datepicker';
import BaseInput from '@/components/Input/BaseInput.vue';
import { computed, ref } from 'vue';
import { he } from 'date-fns/locale';
import { convertToTimestamp, getRangeDatesString, parseString, useDate } from '@/composables/useDate';
import { isEqual } from 'lodash'

const { dateOptions } = useDate();

const dateInputRef = ref<HTMLElement | undefined>();
const screenWidth = ref(document.documentElement.clientWidth);

const dates = defineModel<number[] | undefined>();
const op = ref();

const togglePopup = (event) => {
  op.value.toggle(event);
}

const preDefinedRangeOption = computed(() =>
  dateOptions.find(({ getDates }) => isEqual(getDates(), dates.value))
)

const rangeDates = computed<number[] | undefined>({
  get() {
    return dates.value || [];
  },
  set(newValue) {
    const [since, until] = newValue ?? [];
    dates.value = [convertToTimestamp(since), convertToTimestamp(until)];
  }
});

const dateForInputText = computed({
  get() {
    return preDefinedRangeOption.value ? preDefinedRangeOption.value.label : getRangeDatesString(rangeDates.value)
  },
  set(newValue) {
    const [since, until] = newValue.split(' - ') ?? []
    dates.value = [convertToTimestamp(parseString(since)), convertToTimestamp(parseString(until))];
  }
});

const items = computed(() =>
  dateOptions.map(({ label, getDates }) => ({
    label,
    command: () => {
      dates.value = getDates();
    },
  })),
)

const preset = {
  action: {
    class: [
      // Spacing
      '!py-2 !px-3',

      // Color
      'text-secondary'
    ]
  },
  content: {
    class: [
      // Color
      'text-secondary'
    ]
  },
  menu: {
    class: [
      'flex flex-col gap-4'
    ]
  }
};

</script>
<template>
  <div ref="dateInputRef">
    <BaseInput
      id="date"
      :placeholder="$t('filters.filter-by-date')"
      v-model="dateForInputText"
      :style="'neutral'"
      class="w-[12em]"
      autocomplete="off"
      @focus="togglePopup"
    />
    <OverlayPanel
      ref="op"
      class="!left-[unset]"
      :style="{ right: `${screenWidth - (dateInputRef?.getBoundingClientRect()?.right ?? 0)}px` }"
    >
      <div
        ref="contentRef"
        class="flex"
      >
        <Menu
          :model="items"
          class="px-6 py-7 border-l border-light rounded-r-md"
          :pt="preset"
          :ptOptions="{ mergeSections: false, mergeProps: true }"
        />
        <VueDatePicker
          v-model="rangeDates"
          class="transition transform ease-in-out delay-150 w-full focus:ring-0 focus:outline-none rounded-md pt-3"
          :class="{}"
          multi-calendars
          auto-apply
          inline
          month-name-format="long"
          :format-locale="he"
          :day-names="[`ב'`, `ג'`, `ד'`, `ה'`, `ו'`, `ש'`, `א'`]"
          :month-change-on-scroll="false"
          :enable-time-picker="false"
          :range="{}"
        />
      </div>
    </OverlayPanel>
  </div>
</template>

<style>
@import '@vuepic/vue-datepicker/dist/main.css';

.dp__main * {
  direction: rtl;
}

.dp__menu {
  @apply border-none;
}

.dp__menu_inner {
  @apply gap-none !p-0;
}

.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
  @apply bg-transparent text-center py-0 ring-0 border-none outline-none focus:ring-0 focus:outline-none;
}

.dp__disabled {
  @apply bg-transparent text-center border-none py-0;
}

.dp__input_wrap {
  @apply ring-0 outline-none focus:ring-0 focus:outline-none;
}

.dp__input_icon {
  right: 0;
  left: auto;
}

.dp__clear_icon {
  right: auto;
  left: 0;
}

.dp--header-wrap {
  @apply border-b border-light px-7 pb-3 rounded-t-md;
}

.dp__instance_calendar:first-child>.dp__calendar {
  @apply px-7 my-6 border-l border-light;
}

.dp__instance_calendar:last-child>.dp__calendar {
  @apply px-7 my-6;
}

.dp__btn,
.dp__calendar_header_item,
.dp__flex_row,
.dp__cell_inner {
  @apply font-assistant;
}

.dp__btn {
  @apply text-body-1-semi text-black;
}

.dp__calendar_header_item,
.dp__cell_inner {
  @apply w-[2.5625rem];
}

.dp__calendar_header_item {
  @apply text-body-2-semi pb-4 h-[unset] text-secondary;
}

.dp__cell_inner {
  @apply h-11;
}

.dp__calendar_next {
  margin-inline-start: 0;
}

.dp__calendar_header_separator {
  height: 0;
}

.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
  @apply font-assistant;
  @apply text-sm;
}

.dp__range_end,
.dp__range_start,
.dp__active_date,
.dp__overlay_cell_active {
  @apply bg-primary
}

.dp__range_between {
  @apply bg-primary-level-2 !text-primary border-primary-level-2;
}

/* .dp__range_end {
  @apply rounded-full;
}
.dp__range_start {
  @apply rounded-full;
} */

.dp__month_year_select:first-child {
  @apply flex justify-end px-4;
}

.dp__month_year_select:last-child {
  @apply flex justify-start px-4;
}

.dp__today {
  @apply border-primary;
}
</style>
