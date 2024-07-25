<template>
  <div>
    <RouterLink :to="to">
      <Button
        :label="label"
        severity="nav"
        :pt="preset"
        :ptOptions="{ mergeSections: false, mergeProps: true }"
      />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const props = defineProps({
  label: String,
  to: {
    type: String,
    default: '/',
  },
})

const route = useRoute()

const isCurrRoute = computed(() => route.name === props.to.replace('/', ''))

const preset = {
  root: ({ props, context, parent }) => ({
    class: [
      '!p-0',
      '!min-w-[unset]',

      {
        'text-on-action': props.severity === 'nav' && isCurrRoute.value,
        'text-primary': props.severity === 'nav' && !isCurrRoute.value,
        'bg-base-white': props.severity === 'nav',
        'hover:text-on-action hover:text-body-1-bold focus:text-on-action focus:ring-transparent': props.severity === 'nav',
      },
    ],
  }),
  label: ({ props }) => ({
    class: [{ '!text-body-1 hover:!text-body-1-semi': props.severity === 'nav' && !isCurrRoute.value }],
  }),
}
</script>
