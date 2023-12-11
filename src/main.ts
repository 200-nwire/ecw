/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { client } from '@/services/GraphQlClient'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

loadFonts()

// Create vue app
const app = createApp(App)

app.runWithContext(() => {
    app.provide(client, 'apollo')

    // Use plugins
    app.use(vuetify)
    app.use(createPinia())
    app.use(router)
    app.use(LoadingPlugin)
    app.component('VueDatePicker', VueDatePicker)

    // Mount vue app
    app.mount('#app')
})
