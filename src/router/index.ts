import Vue from 'vue'
import routes from './map'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	base: '/',
	mode: 'hash',
	routes: Object.keys(routes).reduce((previous: any[], current: string) => {
		return (previous.push({ path: current, ...routes[current] }), previous)
	}, []),
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

export default router