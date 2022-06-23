<template>
     <div ref="echart">
          
     </div>
</template>

<script>
import * as echarts from 'echarts'
    //将公共部分抽成一个组件
    export default {
        name:'Echarts',
        props:{
            isAxisChart:{
                type:Boolean,
                default:true
            },
            chartData:{
                type:Object,
                default(){
                    return {
                        xData:[],
                        series:[]
                    }
                }
            }
        },
        computed:{
            options(){
                return this.isAxisChart ? this.axisOptions : this.normalOption
            }
        },
        data() {
            return {
                axisOptions:{
                 legend:{
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
                        data: [],
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
                        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                        series: [],
            },
                normalOption:{
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
                series: [],
            },
            echart:null
          }
        },
        watch:{
            chartData:{
                deep:true,
                handler(){
                    this.initChart()
                }
            }
        },
        methods: {
            initChart(){
               this.initCharData
               if(this.echart){
                this.echart.setOption(this.options)
               }else{
                this.echart = echarts.init(this.$refs.echart)
                this.echart.setOption(this.options)
               }
            },
            initCharData(){
                if(this.isAxisChart){
                   this.axisOptions.xAxis.data = this.chartData.xData
                   this.axisOptions.series = this.chartData.series
                }else{
                    this.normalOption.series = this.chartData.series
                }
            }
        },
}
</script>

<style>

</style>