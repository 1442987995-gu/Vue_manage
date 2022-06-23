<template>
    <div class="tabs">
        <el-tag 
            size="small" 
            v-for="(item,index) in tabsList"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain' "
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
        >
          {{item.label}}
        </el-tag>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
          name:'CommonTag',
          data() {
            return {
                
            }
          },
          methods: {
            changeMenu(item){
                this.$router.push({
                    name:item.name
                })
            },
             ...mapMutations(['closeTag']),
            handleClose(item,index){
                const length = this.tabsList.length-1
                this.closeTag(item)
                if(item.name !== this.$route.name){
                    return;
                }
                //如果点击的是最后一个，那么焦点就会往左移动
                if(index === length ){
                    this.$router.push({
                        name:this.tabsList[index-1].name
                    })
                }else{
                     this.$router.push({
                        name:this.tabsList[index].name
                    })
                }
            },
            
          },
          computed:{
              ...mapState(['tabsList']),
             
          }
    }
</script>

<style lang="less" scoped>
.tabs{
    padding:20px;
    .el-tag{
        margin-right:15px;
        cursor:pointer;
    }
}
</style>