import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from 'colorui/components/cu-custom.vue'

Vue.config.productionTip = false
Vue.config.$store = store
Vue.component('cu-custom',cuCustom)
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
