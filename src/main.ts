import { createApp } from 'vue'
import '@/style.css'
import '@/index.css'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Calendar from 'primevue/calendar'
import ScrollPanel from 'primevue/scrollpanel'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Card from 'primevue/card'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import ProgressSpinner from 'primevue/progressspinner'
import Avatar from 'primevue/avatar'
import OverlayPanel from 'primevue/overlaypanel'
import Menu from 'primevue/menu'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import Skeleton from 'primevue/skeleton'
import Image from 'primevue/image'
import Sidebar from 'primevue/sidebar'

import { client } from '@/services/GraphQlClient'
import messages from '@intlify/unplugin-vue-i18n/messages'

import Lara from './presets/aura'

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'he',
  fallbackLocale: 'en',
  messages,
})

const pinia = createPinia()

const app = createApp(App)

app.provide(client, 'apollo')

// PRIME VUE
app.component('Panel', Panel)
app.component('DataTable', DataTable)
app.component('Button', Button)
app.component('Column', Column)
app.component('Calendar', Calendar)
app.component('ScrollPanel', ScrollPanel)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Card', Card)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Avatar', Avatar)
app.component('OverlayPanel', OverlayPanel)
app.component('Menu', Menu)
app.component('Password', Password)
app.component('Divider', Divider)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Skeleton', Skeleton)
app.component('Image', Image)
app.component('Sidebar', Sidebar)

app.use(PrimeVue, { unstyled: true, pt: Lara })

app.use(pinia)
app.use(router)
app.use(i18n)

router
  .isReady()
  .then(() => {
    app.mount('#app')
  })
  .catch(e => console.error(e))
