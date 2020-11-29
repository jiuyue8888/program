import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index.vue'
import login from '@/pages/login/index.vue'
import xy from '@/pages/xieyi/index.vue'
import ht from '@/pages/xieyi/ht.vue'
import vts from '@/pages/xieyi/vts.vue'
import myOrder from '@/pages/myOrder/index.vue'
import stages from '@/pages/stages/index.vue'
import steps from '@/pages/steps/index.vue'
import adminLogin from '@/admin/login/index.vue'
import adminIndex from '@/admin/index/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      meta: {
        title: '必过分期'
      },
      component: index
    },
    {
      path: '/xy',
      name: 'xy',
      meta: {
        title: '用户注册协议'
      },
      component: xy
    },
    {
      path: '/vts',
      name: 'vts',
      meta: {
        title: '代扣委托书'
      },
      component: vts
    },
    {
      path: '/ht',
      name: 'ht',
      meta: {
        title: '保理付款服务合同'
      },
      component: ht
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      meta: {
        title: '我的订单'
      },
      component: myOrder
    },
    {
      path: '/stages',
      name: 'stages',
      meta: {
        title: '我要分期'
      },
      component: stages
    },
    {
      path: '/steps',
      name: 'steps',
      meta: {
        title: '我要分期'
      },
      component: steps
    },
    {
      path: '/admin',
      name: 'adminLogin',
      meta: {
        title: '后台登录页'
      },
      component: adminLogin
    },
    {
      path: '/admin/index',
      name: 'adminIndex',
      meta: {
        title: '后台管理页'
      },
      component: adminIndex
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录/注册'
      },
      component: login
    }
  ]
})
