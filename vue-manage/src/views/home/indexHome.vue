<template>
    <!-- 栅格化布局 -->
    <el-row class="home"  :gutter="20">
    <!-- span它所占用的当前行的栅格数 -->
        <el-col :span="8" style="margin-top:10px" >
        <!-- 用户区域 -->
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                     <p>上次登录时间:<span>2022-6-16</span></p>
                     <p>上次登录地点:<span>南宁</span></p>
                </div>
            </el-card>
            <!-- 表格区域 label当前列所对应的名称-->
            <el-card style="margin-top:10px;height:475px">
                 <el-table :data="tableData">
                      <el-table-column 
                      v-for="(val,key) in tableLbel" 
                      :key="key"
                      :prop="key"
                      :label="val"
                      >
                      </el-table-column>
                 </el-table>
            </el-card>
        </el-col>
        <!-- 右侧订单 -->
        <el-col :span="16" style="margin-top:20px">
             <div class="num">
                <el-card style="margin-top:-10px" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail" >
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
             </div>
             <!-- 折线图 -->
             <el-card style="height:280px;margin-top:-10px" >
                 <div style="height:280px" ref="echarts"></div>
                 <!-- <Echarts :chartData="echartData.order" style="height:280px"></Echarts> -->
             </el-card> 
             <!-- 柱状图和饼状图-->
             <div class="graph">
                <el-card style="height:260px;margin-top:-10px">
                    <div style="height:240px" ref="userEcharts"></div>
                    <!-- <Echarts :chartData="echartData.user" style="height:260px"></Echarts> -->
                </el-card> 
                <el-card style="height:260px;margin-top:-10px">
                    <div style="height:240px" ref="videoEcharts"></div>
                    <!-- <Echarts :chartData="echartData.video" :isAxisChart="false" style="height:260px"></Echarts> -->
                </el-card> 
             </div> 
        </el-col>
    </el-row>
</template>

<script> 
import head from '../../assets/images/1.jpeg'
    //引入axios
import { getData } from '../../../api/data'
import * as echarts from 'echarts'
import Echarts from '../../components/Echarts.vue'
    export default {
        name:'indexHome',
        components:{
          Echarts
        },
        data() {
            return {
                userImg:head,
                tableData: [],
                tableLbel:{
                    name:'手机品牌',
                    todayBuy:'今日购买',
                    monthBuy:'本月购买',
                    totalBuy:'总购买'
                },
                countData: [
                        {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                    },
                    {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                    },
                    {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                    },
                    {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                    },
                    {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                    },
                    {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                ],
                echartData:{
                  order:{
                     xData:[],
                     series:[]
                  },
                  user:{
                    xData:[],
                     series:[]
                  },
                  video:{
                     series:[]
                  }
                }

            }
        },
        mounted() {
          getData().then(res=>{
            const {code,data} = res
            if(code === 20000){
              this.tableData = data.tableData
              const order = data.orderData
              const xData = order.date
              //Object.keys返回的是对象的键名
              const keyArray =  Object.keys(order.data[0])
              const series = []
              keyArray.forEach(key =>{
                series.push({
                  name:key,
                  data:order.data.map(item=> item[key]),
                  type:'line'
                })
              })
              //折线图
               const option = {
                xAxis:{
                  data:xData
                },
                yAxis:{},
                legend:{
                  data:keyArray
                },
                series
              } 
              /* this.echartData.order.xData = xData
              this.echartData.order.series = series */
               const E = echarts.init(this.$refs.echarts)
              //绘图
              E.setOption(option) 

              //柱状图
               const userOption = {
                  legend: {
                    // 图例文字颜色
                    textStyle: {
                      color: "#333",
                    },
                  },
                  grid: {
                    left: "20%",
                  },
                  // 提示框
                  tooltip: {
                    trigger: "axis",
                  },
                  xAxis: {
                    type: "category", // 类目轴
                    data: data.userData.map(item => item.date),
                    axisLine: {
                      lineStyle: {
                        color: "#17b3a3",
                      },
                    },
                    axisLabel: {
                      interval: 0,
                      color: "#333",
                    },
                  },
                  yAxis: [
                    {
                      type: "value",
                      axisLine: {
                        lineStyle: {
                          color: "#17b3a3",
                        },
                      },
                    },
                  ],
                  color: ["#2ec7c9", "#b6a2de"],
                  series: [
                    {
                      name:'新增用户',
                      data:data.userData.map(item => item.new),
                      type:'bar'
                    },
                    {
                      name:'活跃用户',
                      data:data.userData.map(item => item.active),
                      type:'bar'
                    }
                  ],
                      }  
                const U =   echarts.init(this.$refs.userEcharts)
                U.setOption(userOption)
             /*  this.echartData.user.xData =  data.userData.map(item => item.date)
              this.echartData.user.series = [
                    {
                      name:'新增用户',
                      data:data.userData.map(item => item.new),
                      type:'bar'
                    },
                    {
                      name:'活跃用户',
                      data:data.userData.map(item => item.active),
                      type:'bar'
                    }
                  ] */
                      
              //饼状图
               const videoOption ={
                 tooltip: {
                    trigger: "item",
                  },
                  color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                  ],
                  series: [
                    {
                      type:'pie',
                      data:data.videoData,                     
                    }
                  ],
              } 
              /* this.echartData.order.series =[
                    {
                      type:'pie',
                      data:data.videoData,                     
                    }
                  ] */
              const V =  echarts.init(this.$refs.videoEcharts)
              V.setOption(videoOption)
 
                    }
                  })
                },
    } 
</script>

<style scoped>
.home .user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.home .user img {
  width:110px;
  height:110px;
  border-radius: 50%;
  margin-right: 40px;
}
.home .userInfo .name {
  font-size: 32px;
  margin-bottom: 10px;
}
.home .userInfo .access {
  color: #999999;
}
.home .login-info p {
  line-height: 28px;
  font-size: 14px;
  color: #999999;
}
.home .login-info p span {
  color: #666666;
  margin-left: 60px;
}
.home .num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home .num .el-card {
  width: 32%;
  margin-bottom: 20px;
}
.home .num .icon {
  font-size: 30px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}
.home .num .detail {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home .num .detail .num {
  font-size: 30px;
  margin-bottom: 10px;
}
.home .num .detail .txt {
  font-size: 14px;
  text-align: center;
  color: #999999;
}
.home .graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.home .graph .el-card {
  width: 48%;
}

</style>