import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// 引入全局vuex管理
import store from './store/sotre.js'
Vue.prototype.$store = store
const app = new Vue({
    ...App
})
app.$mount()
