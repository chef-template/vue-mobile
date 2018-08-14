import Vue from 'vue'
import App from './App'
import http from 'vue-http'
import router from './router'
import title from 'plugins/title'
import Layout from 'components/layout'

Vue.use(http)
Vue.use(title)
Vue.component('Layout', Layout)

Vue.config.productionTip = false

new Vue({
    router,
    ...App
}).$mount('#app')