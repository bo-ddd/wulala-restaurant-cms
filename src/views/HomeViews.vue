<template>
  <div class="box">
    <h3 class="title">首页</h3>
    <div class="box-content">
      <div class="flex-sp">
        <el-calendar v-model="value"></el-calendar>
        <div id="main" class="main_container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core"
import { TitleComponent, GridComponent } from "echarts/components"
import { BarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
echarts.use([TitleComponent, GridComponent, BarChart, CanvasRenderer])
export default {
  data() {
    return {
      value: new Date(),
    }
  },
  created() {


  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      // 初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"))
      // 绘制图表
      myChart.setOption({
        title: {
          text: "菜肴销量",
        },
        tooltip: {},
        xAxis: {
          data: ["小麦果汁", "大闸蟹", "小米粥", "鱼香肉丝", "大盘鸡", "印度飞饼",'大葱'],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20,100,130],
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
::v-deep .el-calendar {
  /* background: #ec4a0c; */
  width: 30%;
  display: inline-block;
}

::v-deep .el-calendar-table .el-calendar-day {
  height: 50px;
}

.main_container {
  width: 600px;
  height:300px;
  overflow: hidden;
}
</style>