import App from './App'
import VueSocketio from 'vue-socket.io'
import socketio from '@hyoga/uni-socket.io'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(
  new VueSocketio({
    connection: socketio.io('ws://localhost:3000', {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling']
    }),
    debug: false
  })
)
Vue.use(ElementUi)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
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