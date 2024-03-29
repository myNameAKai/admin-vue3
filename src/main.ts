import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './modules/i18n'
import App from './App.vue'
import router from './router'

// import 'reset-css'
// import '@unocss/reset/normalize.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import 'virtual:svg-icons-register'

import 'element-plus/theme-chalk/dark/css-vars.css'

import './assets/main.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
