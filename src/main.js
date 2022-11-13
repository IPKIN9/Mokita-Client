import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import 'bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)
app.use(router)
app.mount('#app')