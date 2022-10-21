<template>
  <el-container>
    <el-header>
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
                <el-dropdown-item>
                  <span @click="loginout">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>

    <!-- <el-header>
    <div class="wrap box-top">
      <div class="title">乌拉拉餐饮管理</div>
      <div class="box-user ">
        <div>实时数据/数据管理</div>
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
    </el-header>-->
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu router default-active="home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-menu-item index="home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据中心</span>
                </template>
                <el-menu-item-group>

                  <el-menu-item index="shuju">实时数据</el-menu-item>
                  <el-menu-item index="1-2">菜品数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>菜品管理</span>
                </template>
                <el-menu-item-group>

                  <el-menu-item index="goodsdata">菜品数据</el-menu-item>
                  <el-menu-item index="classify">菜品分类</el-menu-item>
                </el-menu-item-group>

              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  data(){
    return{}
  },
  name: 'HomeView',
  components: {
    
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout(){
      sessionStorage.setItem('token','');
      this.$router.push({
        name:'loginview'
      })
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

::v-deep .el-main {
  background-color: #0e80f3;
  border-radius: 10px;
}


::v-deep .el-header {
  /* line-height: 60px; */
  padding: 0px;
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
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center
}

::v-deep .el-main {
  min-height: 500px;
}

.title {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  min-width: 170px;
}

.box-top {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly
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
  min-width: 120px;
  display: flex;
  align-items: center;
}

.username {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
}
</style>
