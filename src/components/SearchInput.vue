<template>
  <div class="w-[13rem]">
    <IconField iconPosition="right">
      <InputIcon>
        <Search :size="16" />
      </InputIcon>
      <InputText
        v-model="value"
        v-bind="$attrs"
        :class="{ '!rounded-full': rounded }"
      />
    </IconField>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'

import { ref } from 'vue'

defineProps({
  rounded: Boolean,
})

const value = ref(null)
</script>
