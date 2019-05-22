const maps: {
	[key: string]: {}
} = {
  '/hello': {
    meta: {
      title: '自定义头像'
    },
    component: () => import('@/pages/hello/index.vue')
  }
}

export default maps