<template>
  <div>
    <Button
      :severity="BUTTON_NAME"
      rounded
      :pt="preset"
      :ptOptions="{ mergeSections: false, mergeProps: true }"
      @click="toggle"
    >
      <Avatar
        label="CW"
        class="ml-2"
        size="large"
        shape="circle"
      />
      <ChevronDown :size="16" />
    </Button>
    <Menu
      ref="menu"
      :model="items"
      popup
    >
      <template #item="{ item, props }">
        <a
          v-ripple
          class="flex items-center"
          v-bind="props.action"
        >
          {{ item.label }}
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { logout } = useAuth()

const menu = ref()
const items = ref([
  {
    label: t('logout'),
    command: () => {
      logout()
    },
  },
])

const toggle = event => {
  menu.value.toggle(event)
}

const BUTTON_NAME = 'AvatarButton'

const preset = {
  root: ({ props, context, parent }) => ({
    class: [
      '!p-2',
      '!min-w-[unset]',

      {
        'bg-neutral-level-1': props.severity === BUTTON_NAME,
        'hover:text-on-action focus:text-on-action focus:ring-0': props.severity === BUTTON_NAME,
      },
    ],
  }),
}
</script>
