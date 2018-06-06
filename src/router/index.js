import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'

import BootstrapVue from 'bootstrap-vue'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    }
  ]
})
