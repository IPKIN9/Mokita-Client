import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js'
import './assets/css/bootstrap.css'
import './assets/vendors/perfect-scrollbar/perfect-scrollbar.css'
import './assets/vendors/bootstrap-icons/bootstrap-icons.css'
import './assets/css/app.css'

const app = createApp(App)
app.use(router)
app.mount('#app')