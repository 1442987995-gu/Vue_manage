import Vue from 'vue'
import App from './App.vue'
//按需引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入路由
import VueRouter from 'vue-router'
import router from './router/index'
import './assets/less/index.less'
import store from './store/index' 
import '../api/mock'
import http from 'axios'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$http = http

// router.beforeEach((to,from,next)=>{
//     store.commit('getToken')
//     const token = store.token
//     if(!token && to.name !=='login'){
//       next({name:'login'})
//     }else if(token && to.name ==='login'){
//        next({name:'home'})
//     }else{
//       next()
//     }
// })
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  let token = store.state.token
  if(!token && to.name !== 'login') {
    console.log("123+token",token)
    next({name:'login'})
  } 
  else if (token&&to.name === 'login') {
    console.log("456+token",token)
    next({name:'home'})
  } 
  else {
    next()
  }
})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
//   created() {
//     store.commit('addMenu',VueRouter)
//  },
created() {
  store.commit('addMenu', router)
}
}).$mount('#app')
