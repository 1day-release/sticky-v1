import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'

import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
// import VueAnalytics from 'vue-analytics'

import 'reset-css'
import 'source-code-pro/source-code-pro.css'

Vue.mixin(mixin)

Vue.use(VueResource)
Vue.use(VueMoment)
// Vue.use(VueAnalytics)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
