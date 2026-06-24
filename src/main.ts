import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(Particles, {
  init: async (engine: any) => {
    await loadSlim(engine)
  },
})

app.mount('#app')
