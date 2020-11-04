import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false

interface Bar {
  a: string
  b: number
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
