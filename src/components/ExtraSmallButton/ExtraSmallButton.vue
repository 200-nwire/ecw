<template>
  <div>
    <Button
      v-bind="$attrs"
      :pt="preset"
      :ptOptions="{ mergeSections: false, mergeProps: true }"
      size="small"
    >
      <template #icon>
        <slot name="icon" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
const preset = {
  root: ({ props, context, parent }) => ({
    class: [
      {
        '!px-7 !py-2 !min-w-[5.4rem]': props.size === 'small' && props.label != null,
        '!p-2': props.size === 'small' && props.label == null,
      },

      {
        '!rounded-xs': !props.rounded && props.size === 'small',
      },
    ],
  }),
  label: ({ props }) => ({
    class: ['text-body-1'],
  }),
}
</script>
