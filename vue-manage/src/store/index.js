import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
import Cookie from 'js-cookie'

Vue.use(Vuex)
//创建store并导出
 export default new Vuex.Store({
        namespaced:true,
        state:{
            isCollapse:false,
            //控制面包屑上的跳转至各个页面的标签的显示
            tabsList:[
                {
                    path:'/',
                    name:'home',
                    label:'首页',
                    icon:'home'
                }
            ],
            currentMenu:null,
            token:'',
            menu:[]
        },
        actions:{

        },
        mutations:{
            //菜单折叠变化
            setToken(state,val){
                state.token = val
                Cookie.set('token',val)
            },
            clearToken(state){
                state.token = ''
                Cookie.remove('token')
            },
            getToken(state){
                state.token =state.token || Cookie.get('token')
            },
            CollapseMenu(state){
               state.isCollapse =! state.isCollapse
            },
            selectMenu(state,value){
                if(value.name !== 'home'){
                    state.currentMenu = value
                 const result =  state.tabsList.findIndex(item => item.name === value.name)
                    if(result === -1){
                        state.tabsList.push(value)
                    }
                }else{
                    state.currentMenu = null
                }
            },
            closeTag(state,value){
             const result =  state.tabsList.findIndex(item =>item.name === value.name)
             state.tabsList.splice(result,1)
            },
            setMenu(state,val) {
              state.menu = val
              Cookie.set('menu',JSON.stringify(val))
            },
            clearMenu(state) {
              state.menu = []
              Cookie.remove('menu')
            },
            addMenu(state,router) {
              if(!Cookie.get('menu')){
                return
              }
              const menu = JSON.parse(Cookie.get('menu'))
              state.menu = menu
              const menuArray = []
              menu.forEach(item => {
                console.log("item",item)
                if (item.children) {
                  item.children = item.children.map(item=>{
                    item.component = () => import(`../views/${item.url}`)
                    return item
                  })
                  menuArray.push(...item.children)
                } else {
                  item.component = () => import(`../views/${item.url}`)
                  menuArray.push(item)
                }
              });
              //路由的动态添加
              menuArray.forEach(item => {
                router.addRoute('Main',item)
              })
            }       
        }
    
})