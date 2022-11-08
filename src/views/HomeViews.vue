<template>
  <div class="box">
    <div class="box-content">
      <div class="content">
        <div class="flex-sp_a">
          <el-calendar class="calendar" v-model="value"></el-calendar>
          <div>
            <div id="main" class="main_container"></div>
            <el-carousel :interval="2500" type="card" height="160px">
              <el-carousel-item v-for="item in image" :key="item.id">
                <img class="carousel" :src="item.img" alt="">
                <!-- <img src="@/assets/images/foodaddftq.png" alt=""> -->
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" />
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
        //  icon:'http://localhost:8080/img/foodaddftq.7f24d278.png',
         img:require('@/assets/images/foodaddftq.png')
       },{
         id:2,
        //  icon:'http://localhost:8080/img/foodaddkyp.cddf1afb.png',
         img:require('/src/assets/images/foodaddkyp.png')
       },{
         id:3,
        //  icon:'http://localhost:8080/img/fooddzx.b3f8fa71.png',
         img:require("/src/assets/images/fooddzx.png")
       },{
         id:4,
        //  icon:'http://localhost:8080/img/foodaddyt.54b11a01.png',
         img:require('/src/assets/images/foodaddyt.png')
       }
      ],
      center: { lng: 0, lat: 0 },
			zoom: 0
    }
  },
  created() {
    showLoading();
    setTimeout(function () {
      hideLoading()
    },1000)
  },
  mounted() {
    this.initCharts();
    // window.addEventListener("handler", this.handler, { passive: false });
  },
  methods: {
    handler({ BMap, map }) {
			console.log(BMap, map)
			this.center.lng = 121.487899486
			this.center.lat = 31.24916171
			this.zoom = 15
		},
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
  height: 3rem;
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

  .map{
	width: 100%;
	height: 50rem;
}
.content{
  overflow-y: scroll;
  height: calc(100vh - 9rem);
}
</style>