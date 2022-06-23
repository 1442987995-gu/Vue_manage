<template>
    <header>
        <div class="l-content">
            <!-- 菜单按钮 -->
            <el-button style="color:white" plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <!-- <h3 style="color:white">首页</h3> -->
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tabsList" :key="item.path" :to="{ path:item.path}">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <!-- 下拉菜单按钮 -->
             <el-dropdown trigger="click" size="mini">
                <span>
                    <img class="user" :src="userImg" >
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
             </el-dropdown>
        </div >
    </header>
</template>

<script>
    import { mapState } from 'vuex'
    import head from '../assets/images/1.jpeg'
    export default {
        name:'Header',
        data() {
            return {
                //引入图片
                userImg:head
            }
        },
        methods:{
            //点击菜单折叠效果
            handleMenu(){
                this.$store.commit('CollapseMenu')
            },
            logOut(){
                this.$store.commit('clearToken')
                 this.$store.commit('clearMenu')
                 this.$router.push('/login')
            }
            
        },
        computed:{
            ...mapState(['tabsList'])        
        }
        
    }
</script>

<style lang="less" scoped>

header{
    display: flex;
    height: 100%;
    //两端对齐
    justify-content: space-between;
    //开启了flex后垂直居中
    align-items: center;
}
.l-content{
    display: flex;
    //开启了flex后垂直居中，有多行时会集中在一起
    align-content: center;
    line-height: 30px;
    .el-button{
        margin-right:20px;
    }
}
.r-content{
    .user{
        width:40px;
        height:40px;
        border-radius: 50%;
    }
}
::v-deep .el-breadcrumb__inner.is-link {
      color: gray;
    }
    ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
      color: #fff;
    }
</style>