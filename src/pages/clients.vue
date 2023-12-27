<script setup lang="ts">
import ClientsFilter from '@/components/clients/ClientsFilter.vue';
import SummaryRow from '@/components/clients/SummaryRow.vue';
import List from '@/components/shared/List.vue';
import Title from '@/components/shared/Title.vue';
import { getFormattedDate } from '@/composables/useDate';
import { IClient } from '@/interfaces/client';
import router from '@/router';
import { useClientStore } from '@/store/clients';
import { computed, ref } from 'vue';

import { useDisplay } from 'vuetify';
const { smAndDown, lgAndUp, md, lg } = useDisplay()

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const clientStore = useClientStore()
const { getClients, getClientsSummary, setSearchFromHeader } = useClientStore()

const showClients = ref(false)

const isLoading = ref(false)

const showFilters = ref(false)

const isFromHeader = computed(() => clientStore.searchFromHeader)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token && !isFromHeader.value) {
    isLoading.value = true
    await getClients()
    await getClientsSummary()
    isLoading.value = false
  }
  showClients.value = true
  setSearchFromHeader(false)
})

const clients = computed(() => clientStore.clients.accounts?.edges)
const clientsSummary = computed(() => clientStore.clientsSummary)

const carStatusColorOptions = {
  CANCELED: 'red',
  UNPAID: 'red',
  PENDING: 'yellow',
  ACTIVE: 'green'
}

const data = computed(() => {
  const d = clients?.value?.map((clientNode: IClient) => ({
    ...(clientNode.node ?? {}),
    name: clientNode.node.profile?.name ?? 'פלוני אלמוני',
    createdOn: getFormattedDate(clientNode.node.createdOn) ?? ' ',
    phone: clientNode.node.profile?.phone ?? '',
    source: clientNode.node.profile?.source ?? 'אחר',
    points: clientNode.node.points ?? 0,
    totalPurchases: clientNode.node.totalPurchases ?? 0,
    subscriptionStationNames: clientNode.node.subscriptions?.map((subscription) => subscription.station?.name ?? '')?.join('|'),
    subscriptionCars: clientNode.node.subscriptions?.map((subscription) => subscription.car ?? '')?.join('|'),
    subscriptionExpiresOn: clientNode.node.subscriptions?.map((subscription) => getFormattedDate(subscription.expiresOn) ?? '')?.join('|'),
    subscriptionPlanDescriptions: clientNode.node.subscriptions?.map((subscription) => subscription.plan?.description ?? '')?.join('|'),
    subscriptionCarsStatus: clientNode.node.subscriptions?.map((subscription) => carStatusColorOptions[subscription.status] ?? '')?.join('|'),
  }))
  return d;
});

const textColor = '[#616A82]'
const payButtonWidth = lgAndUp ? 7 : 2;
const payButtonClass = `w-[${payButtonWidth}em] max-w-[${payButtonWidth}em]`;

const gotToClientPage = (clientId: string) => {
  router.push({ path: `/clients/${clientId}` })
}

const listDefinition = ref([{
  id: 'group1',
  flex: '1',
  items: [{
    id: 'name',
    title: 'שם לקוח',
    class: `text-${textColor}`,
    flex: '1'
  }, {
    id: 'createdOn',
    title: 'הרשמה',
    class: `text-${textColor}`,
    flex: '1'
  }, {
    id: 'phone',
    title: 'טלפון',
    class: `text-${textColor}`,
    flex: '1'
  }]
}
  , {
  id: 'group2',
  flex: '0',
  items: [{
    id: 'source',
    title: 'מקור',
    classTitle: `w-[3em] max-w-[3em]`,
    class: `text-${textColor} w-[3em] max-w-[3em]`,
    flex: '1'
  }, {
    id: 'points',
    title: 'ווש בק',
    classTitle: `w-[3em] max-w-[3em]`,
    class: `text-[#4A74EB] w-[3em] max-w-[3em]`,
    flex: '1'
  }, {
    id: 'totalPurchases',
    title: 'מוצרים',
    classTitle: `w-[4em] max-w-[4em]`,
    class: `text-${textColor} w-[4em] max-w-[4em]`,
    flex: '1',
    icon: 'mdi-shopping-outline',
    iconColor: 'primary'
  }]
},
{
  id: 'group3',
  flex: '1',
  class: 'border-[#616A82] border rounded-md p-2',
  items: [{
    isArray: true,
    id: 'subscriptionCarsStatus',
    isIcon: true,
    icon: 'mdi-circle-medium',
    flex: '0.2'
  }, {
    isArray: true,
    id: 'subscriptionCars',
    title: `מס' רכב`,
    class: `text-${textColor}`,
    flex: '1'
  }, {
    isArray: true,
    id: 'subscriptionPlanDescriptions',
    title: 'מסלול',
    class: `text-${textColor}`,
    flex: '1'
  }, {
    isArray: true,
    id: 'subscriptionStationNames',
    title: 'סניף',
    classTitle: 'w-[5em] max-w-[5em]',
    class: `text-${textColor} text-truncate inline w-[5em] max-w-[5em]`,
    flex: '1'
  }, {
    isArray: true,
    id: 'subscriptionExpiresOn',
    title: 'חיוב קרוב',
    class: `text-${textColor}`,
    flex: '1'
  }]
  // },
  // {
  //   id: 'group4',
  //   flex: '0',
  //   class: '',
  //   items: [{
  //     id: 'pay',
  //     title: 'חיוב',
  //     button: {
  //       label: 'חיוב תשלום',
  //       onClick: ''
  //     },
  //     classTitle: payButtonClass,
  //     class: payButtonClass,
  //     flex: '1'
  //   }]
}])

const rightBorder = {
  dataId: 'status',
  colorOptions: {
    INACTIVE: '#FF3150',
    ACTIVE: '#12AAA3'
  }
}

</script>

<template>
  <loading v-model:active="isLoading" :is-full-page="true" />

  <div class="flex flex-col w-full h-full gap-2">
    <Title text="רשימת לקוחות" />

    <div class="flex w-full flex-wrap items-center justify-between gap-4 py-2">
      <div class="flex flex-wrap items-center gap-2">
        <!-- <div class="actions flex py-4"> -->
        <v-btn color="primary" class="">
          לקוח חדש
          <v-icon icon="mdi-plus" class="ml-1"></v-icon>
        </v-btn>
        <!-- </div> -->
        <!-- <div class="actions flex py-4"> -->
        <v-btn color="primary" class="" @click="showFilters = !showFilters">
          <v-icon icon="mdi-filter-menu-outline" class="ml-1"></v-icon>
        </v-btn>
        <!-- </div> -->
      </div>

      <SummaryRow v-if="clientsSummary.totalAccounts" :clients-summary="clientsSummary" />
    </div>
    <ClientsFilter v-if="showFilters" />
    <List :listDefinition="listDefinition" :data="data" :rightBorder="rightBorder"
      @card-clicked="client => gotToClientPage(client)" />
  </div>
</template>
