<template>
  <div class="flex justify-between items-center px-11 py-4 shadow-sm bg-white mb-1">
    <div class="flex items-center gap-15">
      <AvatarButton />
      <nav class="flex gap-8">
        <NavBarButton
          :label="$t('headbar.navagation.clients')"
          to="/clients"
        />
        <NavBarButton
          :label="$t('headbar.navagation.stations')"
          to="/stations"
        />
      </nav>
    </div>
    <div class="flex items-center gap-6">
      <SearchInput
        :placeholder="$t('headbar.search')"
        rounded
        @onSearch="() => {}"
      />
      <Button
        :label="$t('headbar.new-customer')"
        rounded
        size="small"
        @click="() => {}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarButton from '@/pages/Home/components/AvatarButton.vue'
import NavBarButton from '@/pages/Home/components/NavBarButton.vue'
import SearchInput from '@/components/SearchInput.vue'
</script>
