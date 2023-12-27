<script lang="ts" setup>
import { useTheme } from 'vuetify'

import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

import router from '@/router'

import { useClientStore } from '@/store/clients'

import { ref } from 'vue'

const clientStore = useClientStore()
const { getClients, getClientsSummary, setSearchFromHeader } = useClientStore()

const showSerch = ref(false)

const searchString = ref('')

const clients = computed(() => clientStore.clients)

const toggleSearch = () => {
  showSerch.value = !showSerch.value
}

const serchClients = async () => {
  if (!searchString.value) return
  await getClients({ search: searchString.value.trim() })
  await getClientsSummary({ search: searchString.value.trim() })
  if (!clients.value.accounts.edges.length) {
    searchString.value = ''
    return
  }
  if (clients.value.accounts.edges.length === 1) {
    router.push({ path: `clients/${clients.value.accounts.edges[0].node.id}` })
    searchString.value = ''
    return
  }
  setSearchFromHeader(true)
  router.push({ path: 'clients' })
  searchString.value = ''
}

// Banner

const vuetifyTheme = useTheme()
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <div
          class="d-flex align-center cursor-pointer w-[80%]"
          style="user-select: none;"
        >
          <!-- 👉 Search Trigger button -->
          <!-- <IconBtn @click="toggleSearch">
            <VIcon icon="mdi-magnify" />
          </IconBtn> -->
          <!-- <VTextField
            v-if="showSerch"
            v-model="searchString"
            variant="outlined"
            clearable
            label="חפש לקוח"
            density="compact"
            class="mr-2 ml-2"
          /> -->
          <!-- <span
            class="d-none d-md-flex align-center text-disabled"
            @click="serchClients"
          >
            <span class="me-3">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span> -->
        </div>

        <VSpacer />

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
