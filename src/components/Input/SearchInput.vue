<template>
  <div class="w-[13rem]">
    <IconField iconPosition="right">
      <InputIcon>
        <Search :size="16" />
      </InputIcon>
      <InputText
        v-model="value"
        v-bind="$attrs"
        class="!w-[13rem]"
        :class="{ '!rounded-full': rounded }"
        :pt="preset(style)"
        :ptOptions="{ mergeSections: false, mergeProps: true }"
      />
    </IconField>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'
import { preset } from './InputPreset'
import type { InputStyle } from './InputPreset'
import type { PropType } from 'vue'

defineProps({
  rounded: Boolean,
  style: {
    type: String as PropType<InputStyle>,
    default: 'white',
  },
})

const value = ref(null)
</script>
