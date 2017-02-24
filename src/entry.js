import Vue from 'vue'
import App from './App'
import router from './router'
import title from 'plugins/title'
import Layout from 'components/layout'

Vue.use(title)
Vue.component('Layout', Layout)

new Vue({
    router,
    ...App
}).$mount('#app')
