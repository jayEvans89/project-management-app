import { createApp } from 'vue'
import { router } from '@/core/router/router'
import App from './core/App.vue'
import { store, key } from '@/core/store/store'

createApp(App).use(router).use(store, key).mount('#app')
