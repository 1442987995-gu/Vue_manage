<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
     background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" 
      @open="handleOpen" @close="handleClose" :collapse="isCollapse">
       <h3>{{isCollapse?'后台':'通用后台管理系统'}}</h3>
       <!-- 用了v-for循环遍历，并且用item.path作为唯一标识 -->
        <el-menu-item  @click="clickMenu(item)" v-for="item in noChildren" :key="item.path"  :index="item.path+''">
            <!-- 用了拼接字符串的方法显示图标 -->
            <i :class="'el-icon-'+ item.icon" ></i>
            <!-- 获取菜单下的标签名字 -->
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        
        <el-submenu v-for="item in hasChildren" :key="item.path"  :index="item.path+''">
            <template slot="title">
                <i :class="'el-icon-'+ item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
                <el-menu-item  @click="clickMenu(subItem)" :index="subIndex+''">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>

</template>

<script>
import { mapState } from 'vuex';
    export default {
        name:'Aside',
        data() {
          return {
            menu:[]
        };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item){
                this.$router.push({
                    name:item.name
                })
                this.$store.commit('selectMenu',item)
            },
                
              
            
        },
        computed:{
            //item是数组中的每一项
            noChildren(){
               return this.asyncMenu.filter(item=> ! item.children)
            },
            hasChildren(){
               return this.asyncMenu.filter(item=> item.children)
            },
            isCollapse(){
              return  this.$store.state.isCollapse
            },
            asyncMenu(){
               return this.$store.state.menu
            }
            
        }
    }
</script>

<style lang="less" scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 830px;
  }
  .el-menu{
    // 100vh是窗口高度
    height: 830px;
    border:none;
    h3{
        color:#fff;
        text-align:center;
        line-height:48px;
    }
  }
</style>