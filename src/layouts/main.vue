<script lang="ts" setup>
import { useAccountStore } from '@/store/account';
import MainNavBar from './components/MainNavBar.vue';

const { setAuthState } = useAccountStore();

// const drawer = ref(false);
// const group = ref(null);

// watch(group, () => {
//   drawer.value = false
// })

</script>

<template>
  <v-app>
    <v-locale-provider rtl>
      <v-layout>
        <MainNavBar />
        <!-- <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list :items="items"></v-list>
      </v-navigation-drawer> -->

        <v-main>
          <v-container fluid class="fill-height flex-column">
            <v-btn color="secondary" class="search-btn" variant="text">חיפוש מהיר</v-btn>
            <router-view v-slot="{ Component, route }">
              <component :is="Component" :key="route.path" />
            </router-view>
          </v-container>
        </v-main>
      </v-layout>
    </v-locale-provider>
  </v-app>
</template>

<style lang="scss">
.v-application {
  .v-container {
    position: relative;
    padding-top: 3em;
  }

  .search-btn {
    position: absolute;
    top: 0px;
    left: 1em;
    width: 10em;
    background-color: #6E758A;
    border-radius: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    z-index: 9999;
  }
}
</style>
