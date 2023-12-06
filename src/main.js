/* Configuración básico de una app de vue */
/* Importamos componentes y como estos componentes se llamran 
    en nuetra app. */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { Icon } from '@iconify/vue';

const app = createApp(App)
/* Vamos a hacer uso de estos pluggins denrtro de esta app. */
app.use(router)
app.use(store)
app.component("Icon", Icon)

app.mount('#app')
