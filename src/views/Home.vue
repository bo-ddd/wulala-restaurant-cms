<template>
  <!-- <el-container>
    <el-aside width="230px">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu background-color="#7b40f2" text-color="#fff" active-text-color="#2fd2d9" router default-active="home"
          class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <img class="logo" src="../assets/images/icon-wll_logo.png" alt="">
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
            <img class="icon-xiaoxi" src="@/assets/images/消息中心.png" alt="">
            <img class="icon-avater" :src=this.avatar alt="">
            <span class="username">{{this.avatarName}}</span>
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

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container> -->
  <div>
    <el-container>
  <el-aside width="200px">
    <el-row class="tac">
        <el-col :span="12">
          <el-menu background-color="#7b40f2" text-color="#fff" active-text-color="#2fd2d9" router default-active="home"
          class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <img class="logo" src="../assets/images/icon-wll_logo.png" alt="">
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
           <img class="icon-xiaoxi" src="@/assets/images/消息中心.png" alt="">
           <img class="icon-avater" :src=this.avatar alt="">
           <span class="username">{{this.avatarName}}</span>
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
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</el-container>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { userInfoApi } from '@/api/api'
export default {
  data() {
    return {
      avatarName: "昵称",
      avatar: ''
    }
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
    loginout() {
      sessionStorage.setItem('token', '');
      this.$router.push({
        name: 'loginview'
      })
    },
    async render() {
      let res = await userInfoApi({

      })
      this.avatarName = res.data.data.avatarName
      this.avatar = res.data.data.avatarImg
      // console.log(res.data.data.avatarImg);
    }
  },
  created() {
    this.render();
  }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #7b40f2;
    color: #333;
  }

  .el-main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0;
  }
</style>

<style scoped>
::v-deep .el-col-12 {
  width: 100%;
}
.logo{
  width: 100px;
  height: 100px;
  filter: invert(100%);
  margin: 25px 65px;
}

::v-deep .el-aside {
  overflow: hidden;
}
::v-deep .el-menu-vertical-demo{
  height: 100vh;
}
::v-deep .el-submenu{
  padding-left: 20px;
}
::v-deep .el-submenu__icon-arrow{
  position: absolute;
      top: 50%;
      right: 50px;
      margin-top: -7px;
      transition: transform .3s;
      font-size: 12px;
}
.el-icon-s-home{
  padding-left: 22px;
}

.box-top {
 /* margin: 15px 0; */
}

/* .el-col {
  border-radius: 4px;
} */

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
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin: 0 5px 0 15px;
}

.icon-xiaoxi {
  width: 15px;
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

