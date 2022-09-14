import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import 'ant-design-vue/lib/message/style/index.less'
import 'ant-design-vue/lib/modal/style/index.less'
// import * as buffer from 'buffer'

// if (typeof (window as any).global === 'undefined') {
//   ;(window as any).global = window
// }

// if (typeof (window as any).Buffer === 'undefined') {
//   ;(window as any).Buffer = buffer.Buffer
// }
const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')
