<template>
    <el-container>
      <el-aside width="230px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu :default-active="routers" background-color="#342c2a" text-color="#fff" active-text-color="#ed4b0b" router
              class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
             <div class="box-logo"> <img class="logo" src="../assets/images/icon-wll_logo.png" alt="" /></div>
              <el-menu-item index="home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
  
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>菜品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="goodsdata">菜品数据</el-menu-item>
                  <el-menu-item index="classify">菜品分类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="rolemg">角色管理</el-menu-item>
                  <el-menu-item index="usermg">用户管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>属性规格</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="addattribute">新增属性规格</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="attributelist">属性规格列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class=" box-top">
  
            <div class="box-user ">
              <div class="box-userinfo">
                <div class="nav">菜品</div>
                <img class="icon-xiaoxi" src="@/assets/images/消息中心.png" alt="">
                <img class="icon-avater" :src=this.avatar alt="">
                <span class="username">{{ this.avatarName }}</span>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> <span @click="toHomePage">个人主页</span> </el-dropdown-item>
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
  
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  import { userInfoApi } from '@/api/api'
  export default {
    data() {
      return {
        avatarName: "昵称",
        avatar: '',
        router: '',
        flag: true
      }
    },
    name: 'HomeView',
    computed: {
      routers() {
        return this.$route.name
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loginout() {
        sessionStorage.setItem('token', '');
        this.$router.push({
          name: 'loginview'
        })
      },
      async render() {
        let res = await userInfoApi({
        })
        // console.log(res);
        this.avatarName = res.data.data.avatarName
        this.avatar = res.data.data.avatarImg
      },
      toHomePage() {
        if (this.flag) {
          this.$router.push({
            name: 'homePage'
          })
        }
      }
  
    },
  
    created() {
      // this.userId = this.$route
      //   console.log(this.$route);
    }
  }
  </script>
  
  <style scoped>
  .el-header {
    background-color: #342c2a;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  
  /* .el-aside {
    background-color: #7b40f2;
    color: #ffffff;
  } */
  ::v-deep .el-dropdown{
    color: #ffffff;
  }
  .el-main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0;
  }
  
  ::v-deep .el-col-12 {
    width: 100%;
  }
  .box-logo{
    background-color: #ec4a0c;
  }
  .logo {
    width: 80px;
    height: 80px;
    filter: invert(100%);
    margin: 25px 65px;
  }
  
  ::v-deep .el-aside {
    overflow: hidden;
  }
  
  ::v-deep .el-menu-vertical-demo {
    height: 100vh;
  }
  
  ::v-deep .el-submenu {
    padding-left: 20px;
  }
  
  ::v-deep .el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 50px;
    margin-top: -7px;
    transition: transform .3s;
    font-size: 12px;
  }
  
  .el-icon-s-home {
    padding-left: 22px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  
  .row-bg {
    padding: 10px 0;
  }
  
  .title {
    display: inline-block;
    font-size: 24px;
    font-weight: 600;
    min-width: 170px;
  }
  
  .icon-avater {
    width: 38px;
    height: 38px;
    border-radius: 19px;
    margin: 0 5px 0 15px;
  }
  
  .icon-xiaoxi {
    width: 24px;
   
  }
  
  .box-userinfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 50px;
  }
  
  .username {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  </style>
  
  