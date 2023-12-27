<script lang="ts" setup>
import { auth } from '@/Firebase';
import { useAccountStore } from '@/store/account';
import { computed, ref } from 'vue';

const { setAuthState } = useAccountStore();

const logout = () => {
  localStorage.removeItem('token')
  setAuthState(false)
}

const user = computed(() => auth.currentUser);

const loggedInUserMenu = [{
  id: 'logout',
  title: 'התנתק',
  icon: 'mdi-logout',
  to: '/login',
  onClick: logout
}];

const visitorUserMenu = [{
  id: 'login',
  title: 'התחבר',
  icon: 'mdi-login',
  to: '/login',
  // onClick: login
}];

const rightSideNavbaritems = ref([
  // {
  //   id: 'notifications',
  //   title: '',
  //   icon: 'mdi-bell-outline',
  //   href: '',
  // },
  {
    id: 'user',
    title: `שלום ${user?.value?.email?.split('@')[0] ?? 'אורח'}!`,
    icon: '',
    submenu: user?.value ? loggedInUserMenu : visitorUserMenu,
  },
  // {
  //   id: 'actions',
  //   title: 'פעולות',
  //   href: '',
  // },
  {
    id: 'clients',
    title: 'מחלקת לקוחות',
    icon: '',
    href: '/clients',
  },
  {
    id: 'stations',
    title: 'ניהול סניפים',
    icon: '',
    href: '/stations',
  },
  // {
  //   id: 'sales',
  //   title: 'מחלקת מכירות',
  //   icon: '',
  //   href: '/',
  // },
  // {
  //   id: 'membership',
  //   title: 'חברות',
  //   icon: '',
  //   href: '/',
  // },
]);

</script>

<template>
  <v-app-bar color="primary" absolute>
    <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

    <v-btn v-for="item in rightSideNavbaritems" :key="item.id" color="secondary" variant="text" :to="item.href"
      :href="item.href">
      {{ item.title ?? '' }}
      <v-icon v-if="item.icon" :icon="item.icon" />
      <v-menu v-if="item.submenu" activator="parent">
        <v-list>
          <VListItem v-for="submenuItem in item.submenu" :key="submenuItem.id" :to="submenuItem.to">
            <template #prepend v-if="submenuItem.icon">
              <VIcon class="me-2" :icon="submenuItem.icon" size="22" />
            </template>

            <VListItemTitle @click="submenuItem.onClick">{{ submenuItem.title }}</VListItemTitle>
          </VListItem>
        </v-list>
      </v-menu>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- <v-btn color="secondary" variant="text">
      ריענון עמוד
      <v-icon icon="mdi-refresh" class="ml-1" />
    </v-btn>
    <v-btn color="secondary" variant="text">ניהול עובדים</v-btn> -->


  </v-app-bar>
</template>


<style scoped lang="scss"></style>
