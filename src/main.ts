import { createSSRApp } from 'vue'
import App from './App.vue'

// vite-plugin-svg-icons
import 'virtual:svg-icons-register'
// unocss
import 'virtual:uno.css'

import store from './store'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
