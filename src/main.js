import './assets/main.scss'
import '@fontsource/permanent-marker'      //police du titre de l'accueil, servie par le site lui-même

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initialiserConsentement } from './lib/consentement.js'

const app = createApp(App)

app.use(router)

app.mount('#app')

//Google Analytics ne se charge que si le visiteur a déjà accepté (loi 25)
initialiserConsentement()
