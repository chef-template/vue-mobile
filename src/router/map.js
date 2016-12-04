export default {
	'/hello': {
		meta: { title: 'Hello World' },
		component: (resolve) => {
			require(['pages/hello'], resolve)
		}
	}
}
