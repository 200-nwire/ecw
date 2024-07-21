<template>
  <div class="flex flex-col gap-4">
    <label
      v-if="label"
      :for="id"
      class="text-body-1-bold text-primary"
      >{{ label }}</label
    >
    <div class="flex flex-col gap-1">
      <label
        v-if="readonly"
        class="text-body-1 text-secondary"
        >{{ value || EMPTY }}</label
      >
      <InputText
        v-else-if="type === 'text'"
        v-bind="$attrs"
        :invalid="invalid"
        :id="id"
        :type="type"
      />
      <Password
        v-else
        toggleMask
        class="w-full"
        v-bind="$attrs"
        :feedback="false"
      />
      <small
        v-if="invalidMessage && invalid"
        class="text-body-2 text-error"
        >{{ invalidMessage }}</small
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  invalidMessage: String,
  invalid: Boolean,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  readonly: Boolean,
  value: String,
})

const EMPTY = '----'
</script>
