<template>
  <div class="home">
    <div class="wrap box-top">
      <div class="title">乌拉拉餐饮管理</div>
      <div class="box-user ">
        <span>实时数据/数据管理</span>
        <div class="box-userinfo">
          <img class="icon-xiaoxi" src="@/assets/images/消息中心.png" alt="">
          <img class="icon-avater" src="@/assets/images/avater.png" alt="">
          <span class="username">峰将军飞拳</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人主页</el-dropdown-item>
              <el-dropdown-item>账户设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

    </div>
    <el-row class="wrap">
      <el-col :span="4">

        <!-- <div> -->
        <el-row class="tac">
          <el-col :span="12">
            <el-menu router default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据中心</span>
                </template>
                <el-menu-item-group>

                  <el-menu-item index="shuju">实时数据</el-menu-item>
                  <el-menu-item index="1-2">菜品数据</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>


              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>菜品管理</span>
                </template>
                <el-menu-item-group>

                  <el-menu-item index="goodsdata">菜品数据</el-menu-item>
                  <el-menu-item index="1-2">菜品分类</el-menu-item>
                </el-menu-item-group>

              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
        <!-- </div> -->
      </el-col>


      <el-col :span="20">

        <router-view />
      </el-col>

    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>
h3 {
  text-align: center;
}
.el-icon-arrow-down {
    font-size: 12px;
  }
::v-deep .el-col-12 {
  width: 100%;
}

::v-deep .el-col {
  background-color: #ccc;
}

.el-row {
  /* margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    } */
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.box-user {
  /* background: red; */
  width: 80%;
  /* display: inline-block; */
  display: flex;
  justify-content: space-between;
}

.title {
  display: inline-block;
  margin-right: 46px;
  font-size: 24px;
  font-weight: 600;
}

.box-top {
  display: flex;
  justify-content: space-evenly;
}

.content {
  background-color: #ccc;
}

.icon-avater {
  width: 30px;
  border-radius: 15px;
  margin: 0 5px 0 15px;
}

.icon-xiaoxi {
  width: 15px;
}

.box-userinfo {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
}
</style>
