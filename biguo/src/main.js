// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import SIdentify from './admin/login/identify'
Vue.use(SIdentify)
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(ElementUI);
/* eslint-disable no-new */
Vue.prototype.$info = function(text,time) {
  const div = document.createElement('div');
  const t = time*1000 || 1000;
  div.className = 'info';
  div.innerHTML = text;
  document.body.appendChild(div);
  setTimeout(()=>{
    div.remove();
  },t)
}
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
