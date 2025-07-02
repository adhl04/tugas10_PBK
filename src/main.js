import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Import createPinia
import App from './App.vue'
import router from './router/index.js'

// Buat instance aplikasi Vue
const app = createApp(App)

// 2. Gunakan Pinia pada aplikasi Anda (sebelum router)
app.use(createPinia())
app.use(router)

// Mount aplikasi ke elemen #app di HTML
app.mount('#app')
