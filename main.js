import App from './App'
import uView from '@/uni_modules/uview-ui'

import api from '@/api/index.js'
import moment from 'moment';
import common from '@/common/index.js'
import store from '@/store/index.js'
import './uview-config.js'

// import VConsole from 'vconsole'
// if(process.env.NODE_ENV === 'development') new VConsole()

Vue.prototype.$fetch = api
Vue.prototype.$moment = moment;

Vue.use(uView).use(common)
Vue.prototype.$api = "/api/"


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif