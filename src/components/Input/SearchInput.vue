<template>
  <div class="flex items-center relative">
    <IconField iconPosition="right" :class="{ 'w-full': full }">
      <InputIcon>
        <Search :size="16" />
      </InputIcon>
      <InputText
        v-bind="$attrs"
        class="pl-10"
        :class="{ '!rounded-full': rounded, '!w-full': full, '!w-[13rem]': !full }"
        :pt="preset(style)"
        :ptOptions="{ mergeSections: false, mergeProps: true }"
      />
    </IconField>
    <Button
      v-if="$attrs.modelValue"
      text
      rounded
      :pt="presetXButton"
      :ptOptions="{ mergeSections: false, mergeProps: true }"
      @click="$emit('resetSearch')"
    >
      <template #icon>
        <X :size="14" />
      </template>
    </Button>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { Search } from 'lucide-vue-next'
import { preset } from './InputPreset'
import type { InputStyle } from './InputPreset'
import type { PropType } from 'vue'
import { X } from 'lucide-vue-next'

defineEmits(['resetSearch'])
const props = defineProps({
  rounded: Boolean,
  full: {
    type: Boolean,
    default: false,
  },
  style: {
    type: String as PropType<InputStyle>,
    default: 'white',
  },
})

const presetXButton = {
  root: ({ }) => ({
    class: [
      '!absolute flex items-center',
      'left-4',
      'text-secondary',

      {
        'bg-neutral-level-2': props.style === 'white' || props.style == null || props.style === 'offwhite',
        'bg-neutral-level-4': props.style === 'neutral',
      },

      '!h-7 !w-7 !p-[1.5px]'

    ]
  })
}
</script>
