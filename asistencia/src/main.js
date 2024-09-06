import { createApp } from 'vue'
import { Quasar, Dialog, Notify, Dark } from 'quasar'
import {createPinia} from 'pinia'
import {router} from './routes/routes.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'


const myApp = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

myApp.use(Quasar, {
  plugins: { Dialog, Notify, Dark} // Import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.use(pinia)
myApp.use(router)
myApp.mount('#app')

