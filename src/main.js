import './assets/main.scss'
import '@fontsource/permanent-marker'      //police du titre de l'accueil, servie par le site lui-même

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
