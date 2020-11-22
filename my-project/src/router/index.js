import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index.vue'
import login from '@/pages/login/index.vue'
import xy from '@/pages/xieyi/index.vue'
import myOrder from '@/pages/myOrder/index.vue'
import stages from '@/pages/stages/index.vue'
import steps from '@/pages/steps/index.vue'
import adminLogin from '@/admin/login/index.vue'
import adminIndex from '@/admin/index/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'index',component: index},
    {path: '/xy',name: 'xy',component: xy},
    {path: '/myOrder',name: 'myOrder',component: myOrder},
    {path: '/stages',name: 'stages',component: stages},
    {path: '/steps',name: 'steps',component: steps},
    {path: '/admin',name: 'adminLogin',component: adminLogin},
    {path: '/admin/index',name: 'adminIndex',component: adminIndex},
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
