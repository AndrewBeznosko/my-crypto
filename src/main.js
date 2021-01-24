import '@/configuration.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import '@fortawesome/fontawesome-free/js/all'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export { vm }