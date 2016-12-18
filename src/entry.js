import Vue from 'vue'
import App from './App'
import router from './router'
import Layout from 'components/layout'

Vue.component('Layout', Layout)

new Vue({
    router,
    ...App
}).$mount('#app')
