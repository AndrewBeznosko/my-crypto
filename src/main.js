import '@/configuration.js'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
// 
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/scss/main.scss'
// 
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export { vm }