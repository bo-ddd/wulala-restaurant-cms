<template>
  <div class="box">
    <h3 class="title">首页</h3>
    <div class="box-content">
      <div class="flex-sp_a">
        <el-calendar class="calendar" v-model="value"></el-calendar>
        <div>
          <div id="main" class="main_container"></div>
          <el-carousel :interval="2500" type="card" height="160px">
            <el-carousel-item v-for="item in image" :key="item.id">
              <img class="carousel" :src="item.icon" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core"
import { TitleComponent, GridComponent } from "echarts/components"
import { BarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import { showLoading,hideLoading } from "@/api/loading";
echarts.use([TitleComponent, GridComponent, BarChart, CanvasRenderer])
export default {
  data() {
    return {
      value: new Date(),
      image:[
       {
         id:1,
         icon:'http://localhost:8080/img/foodaddftq.7f24d278.png'
       },{
         id:2,
         icon:'http://localhost:8080/img/foodaddkyp.cddf1afb.png'
       },{
         id:3,
         icon:'http://localhost:8080/img/fooddzx.b3f8fa71.png'
       },{
         id:4,
         icon:'http://localhost:8080/img/foodaddyt.54b11a01.png'
       }
      ]
    }
  },
  created() {
    showLoading();
    setTimeout(function () {
      hideLoading()
    },1000)
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
          text: " 菜肴销量",
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
  border: 1px solid #eee;
  border-radius: 20px;
}

::v-deep .el-calendar-table .el-calendar-day {
  height: 50px;
}
.box-content{
  background-color: #eee;
}
.main_container {
  width: 600px;
  height:260px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 20px;
}


.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  ::v-deep .el-carousel--horizontal{
    top: 20px;
  }
  .carousel{
    width: 100%;
  }
</style>