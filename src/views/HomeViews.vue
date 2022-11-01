<template>
    <div class="box">
        <!-- <h3 class="title">首页</h3> -->
      <div class="box-content">
        <el-calendar v-model="value">
        </el-calendar>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      value: new Date(),
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style scoped>
::v-deep .el-calendar{
  /* background: #ec4a0c; */
  width: 30%;
}
::v-deep .el-calendar-table .el-calendar-day{
  height: 50px;
}
</style>