<template>
  <div>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
         name:'App'
  }
</script>

<style>
html,body{
  margin:0;
  padding:0;
}
/* 去除掉App的默认样式 */
#app{
  height:100vh;
}
</style>